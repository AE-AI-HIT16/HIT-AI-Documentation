import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Tech Insights',
    description: (
      <>
        Deep dives into software engineering, architecture, and best practices.
        I share what I learn as I build software.
      </>
    ),
  },
  {
    title: 'Tutorials',
    description: (
      <>
        Step-by-step guides on modern web development, DevOps, and cloud infrastructure.
        Practical and hands-on.
      </>
    ),
  },
  {
    title: 'AI & Future',
    description: (
      <>
        Exploring the latest in Artificial Intelligence, LLMs, and how they reshape
        our world and work.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog/ai/introduction">
            Read the Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Tech, Code, and Everything In Between">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.aboutSection}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--8 col--offset-2')}>
                <h2 className="text--center">About Me</h2>
                <p className="text--center">
                  Hi, I'm Henry. I'm a software engineer passionate about building great products.
                  This blog is my digital garden where I document my journey, share knowledge, and
                  explore new technologies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
