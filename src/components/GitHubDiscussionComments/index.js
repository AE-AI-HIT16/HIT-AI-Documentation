import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

const REPO_OWNER = 'AE-AI-HIT16';
const REPO_NAME = 'HIT-AI-Documentation';
const REPO_NODE_ID = 'R_kgDOREh75w';
const CATEGORY_ID = 'DIC_kwDOREh7584C1n94';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

function fetchGraphQL(token, query, variables = {}) {
  return fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => {
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    return res.json();
  });
}

function ListDiscussionsQuery() {
  return `
    query ListDiscussions($owner: String!, $name: String!, $categoryId: ID!) {
      repository(owner: $owner, name: $name) {
        id
        discussions(first: 100, categoryId: $categoryId) {
          nodes { id, number, title }
        }
      }
    }
  `;
}

function DiscussionCommentsQuery() {
  return `
    query DiscussionComments($nodeId: ID!) {
      node(id: $nodeId) {
        ... on Discussion {
          id
          comments(first: 100) {
            nodes {
              id
              body
              author { login, avatarUrl }
              createdAt
            }
          }
        }
      }
    }
  `;
}

function AddDiscussionCommentMutation() {
  return `
    mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
      addDiscussionComment(input: { discussionId: $discussionId, body: $body }) {
        comment { id }
      }
    }
  `;
}

function CreateDiscussionMutation() {
  return `
    mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: { repositoryId: $repositoryId, categoryId: $categoryId, title: $title, body: $body }) {
        discussion { id, number }
      }
    }
  `;
}

function CommentItem({ comment }) {
  const { body, author, createdAt } = comment;
  const date = new Date(createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return (
    <div style={{
      padding: '0.75rem 0',
      borderBottom: '1px solid var(--ifm-toc-border-color)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        {author?.avatarUrl && (
          <img src={author.avatarUrl} alt="" width={24} height={24} style={{ borderRadius: 12 }} />
        )}
        <strong>{author?.login ?? 'Unknown'}</strong>
        <span style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '0.875rem' }}>{date}</span>
      </div>
      <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: escapeHtmlToBr(body) }} />
    </div>
  );
}

function escapeHtmlToBr(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
}

export default function GitHubDiscussionComments() {
  const { user, githubAccessToken, loginWithGithub, clearGithubToken } = useAuth();
  const { metadata } = useDoc();
  const term = metadata?.title ?? 'General';

  const [discussionId, setDiscussionId] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [newBody, setNewBody] = useState('');
  const [error, setError] = useState(null);
  const [tokenInvalidated, setTokenInvalidated] = useState(false);

  const loadDiscussionAndComments = useCallback(async () => {
    if (!githubAccessToken) return;
    setLoading(true);
    setError(null);
    try {
      const listRes = await fetchGraphQL(githubAccessToken, ListDiscussionsQuery(), {
        owner: REPO_OWNER,
        name: REPO_NAME,
        categoryId: CATEGORY_ID,
      });
      if (listRes.errors) throw new Error(listRes.errors[0]?.message ?? 'GraphQL error');
      const repo = listRes.data?.repository;
      if (!repo) throw new Error('Repository not found');
      let discussion = repo.discussions?.nodes?.find((d) => d.title === term);
      if (!discussion) {
        const createRes = await fetchGraphQL(githubAccessToken, CreateDiscussionMutation(), {
          repositoryId: REPO_NODE_ID,
          categoryId: CATEGORY_ID,
          title: term,
          body: `Comments for: ${term}`,
        });
        if (createRes.errors) throw new Error(createRes.errors[0]?.message ?? 'Failed to create discussion');
        discussion = createRes.data?.createDiscussion?.discussion;
      }
      if (!discussion?.id) {
        setComments([]);
        setDiscussionId(null);
        return;
      }
      setDiscussionId(discussion.id);
      const commentsRes = await fetchGraphQL(githubAccessToken, DiscussionCommentsQuery(), {
        nodeId: discussion.id,
      });
      if (commentsRes.errors) throw new Error(commentsRes.errors[0]?.message ?? 'GraphQL error');
      const node = commentsRes.data?.node;
      setComments(node?.comments?.nodes ?? []);
    } catch (e) {
      if (e.message && e.message.includes('401')) {
        setTokenInvalidated(true);
        clearGithubToken();
        return;
      }
      setError(e.message);
      setComments([]);
      setDiscussionId(null);
    } finally {
      setLoading(false);
    }
  }, [githubAccessToken, term]);

  useEffect(() => {
    if (user && githubAccessToken) {
      setTokenInvalidated(false);
      loadDiscussionAndComments();
    } else {
      setComments([]);
      setDiscussionId(null);
    }
  }, [user, githubAccessToken, term, loadDiscussionAndComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBody.trim() || !discussionId || !githubAccessToken || posting) return;
    setPosting(true);
    setError(null);
    try {
      const res = await fetchGraphQL(githubAccessToken, AddDiscussionCommentMutation(), {
        discussionId,
        body: newBody.trim(),
      });
      if (res.errors) throw new Error(res.errors[0]?.message ?? 'Failed to post');
      setNewBody('');
      await loadDiscussionAndComments();
    } catch (e) {
      if (e.message && e.message.includes('401')) {
        setTokenInvalidated(true);
        clearGithubToken();
        return;
      }
      setError(e.message);
    } finally {
      setPosting(false);
    }
  };

  if (!user) {
    return (
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--ifm-toc-border-color)', borderRadius: 8 }}>
        <p style={{ marginBottom: '0.5rem' }}>Sign in to comment.</p>
        <button type="button" className="button button--primary" onClick={() => loginWithGithub()}>
          Sign in with GitHub
        </button>
      </div>
    );
  }

  if (!githubAccessToken) {
    return (
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--ifm-toc-border-color)', borderRadius: 8 }}>
        <p style={{ marginBottom: '0.5rem' }}>
          {tokenInvalidated
            ? 'Phiên GitHub hết hạn hoặc không hợp lệ. Vui lòng bấm nút bên dưới để đăng nhập lại và bình luận.'
            : 'Enable commenting with your GitHub account (one-time).'}
        </p>
        <button type="button" className="button button--primary" onClick={() => loginWithGithub()}>
          Sign in with GitHub to comment
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginBottom: '0.75rem' }}>Comments</h3>
      {error && (
        <div style={{ marginBottom: '0.5rem', color: 'var(--ifm-color-danger)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 6,
                border: '1px solid var(--ifm-toc-border-color)',
                marginBottom: '0.5rem',
                resize: 'vertical',
              }}
            />
            <button type="submit" className="button button--primary" disabled={posting || !newBody.trim()}>
              {posting ? 'Posting...' : 'Comment'}
            </button>
          </form>
          <div>
            {comments.length === 0 ? (
              <p style={{ color: 'var(--ifm-color-content-secondary)' }}>No comments yet.</p>
            ) : (
              comments.map((c) => <CommentItem key={c.id} comment={c} />)
            )}
          </div>
        </>
      )}
    </div>
  );
}
