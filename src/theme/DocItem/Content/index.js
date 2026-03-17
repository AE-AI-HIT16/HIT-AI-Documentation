import React from 'react';
import Content from '@theme-original/DocItem/Content';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import authors from '@site/resources/authors.yml';
import clsx from 'clsx';
import CommentSystem from '@site/src/components/Comments/CommentSystem';
import LockScreen from '@site/src/components/LockScreen';
import styles from './styles.module.css';

// Merge authors for easy lookup
const allAuthors = { ...authors };

function Author({ author }) {
  const { name, title, url, image_url } = author;
  return (
    <div className={clsx('avatar', styles.author)}>
      {image_url && (
        <a className="avatar__photo-link avatar__photo avatar__photo--lg" href={url}>
          <img className="avatar__photo" src={image_url} alt={name} />
        </a>
      )}
      <div className="avatar__intro">
        <div className="avatar__name">
          <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
        </div>
        <small className="avatar__subtitle">{title}</small>
      </div>
    </div>
  );
}

function AuthorsList({ authors }) {
  if (!authors || authors.length === 0) {
    return null;
  }
  return (
    <div className={clsx('margin-bottom--lg', styles.authorsContainer)}>
      <span className={styles.authorsLabel}>WRITTEN BY:</span>
      <div className={styles.authorsList}>
        {authors.map((author, idx) => (
          <Author key={idx} author={author} />
        ))}
      </div>
    </div>
  );
}

import DocStats from '@site/src/components/DocStats';

// ... (existing imports)

export default function ContentWrapper(props) {
  const { frontMatter, metadata } = useDoc();

  // Resolve authors from frontmatter using the merged authors data
  const docAuthors = (frontMatter.authors || []).map(authorId => {
    return allAuthors[authorId] || null;
  }).filter(Boolean);



  // Check for release_date
  if (frontMatter.release_date) {
    const releaseDate = new Date(frontMatter.release_date);
    const now = new Date();
    // Reset time to start of day for fair comparison or keep precise?
    // User input is likely YYYY-MM-DD, which defaults to UTC 00:00 usually or local.
    // Let's stick to simple comparison.
    if (now < releaseDate) {
      return (
        <>
          <LockScreen releaseDate={frontMatter.release_date} />
          {/* Optionally show authors or nothing else */}
        </>
      );
    }
  }

  const pageId = metadata?.slug || metadata?.id || 'unknown';

  return (
    <>
      <DocStats />
      <AuthorsList authors={docAuthors} />
      <Content {...props} />
      <div style={{ marginTop: '2rem' }}>
        <CommentSystem pageId={pageId} />
      </div>
    </>
  );
}
