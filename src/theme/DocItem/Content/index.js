import React from 'react';
import Content from '@theme-original/DocItem/Content';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import authors from '@site/blog/authors.yml';
import clsx from 'clsx';
import styles from './styles.module.css';

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
      <span className={styles.authorsLabel}>Written by:</span>
      <div className={styles.authorsList}>
        {authors.map((author, idx) => (
          <Author key={idx} author={author} />
        ))}
      </div>
    </div>
  );
}

export default function ContentWrapper(props) {
  const { frontMatter } = useDoc();

  // Resolve authors from frontmatter using the authors.yml data
  const docAuthors = (frontMatter.authors || []).map(authorId => {
    // If authors.yml is an object (map), access by key
    // If it's a list, filter (but usually it's a map for ID lookups)
    return authors[authorId] || null;
  }).filter(Boolean);

  return (
    <>
      <AuthorsList authors={docAuthors} />
      <Content {...props} />
    </>
  );
}
