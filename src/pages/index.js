import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  CommandLineIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  CheckIcon,
  BookOpenIcon,
  ServerIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Tech Insights',
    icon: <CommandLineIcon aria-hidden="true" />,
    description: (
      <>
        Deep dives into software engineering, architecture, and best practices.
        I share what I learn as I build software.
      </>
    ),
  },
  {
    title: 'Tutorials',
    icon: <BookOpenIcon aria-hidden="true" />,
    description: (
      <>
        Step-by-step guides on modern web development, DevOps, and cloud infrastructure.
        Practical and hands-on.
      </>
    ),
  },
  {
    title: 'AI & Future',
    icon: <CpuChipIcon aria-hidden="true" />,
    description: (
      <>
        Exploring the latest in Artificial Intelligence, LLMs, and how they reshape
        our world and work.
      </>
    ),
  },
];

const CourseList = [
  {
    title: 'Course 1: AI Fundamentals',
    duration: '3-4 weeks',
    topics: 12,
    description: 'Master the foundations of Retrieval Augmented Generation with LangChain',
    highlights: [
      'LLM Limitations & RAG Theory',
      'RAG Architecture & Components',
      'LangChain Framework & Ecosystem',
      'Vector Databases & Embeddings',
      'Build & Deploy RAG Applications',
    ],
    link: '/blog/ai-fundamental/introduction-to-ai',
  },
  {
    title: 'Course 2: AI Advanced',
    duration: '4-5 weeks',
    topics: 16,
    description: 'Advanced techniques, Graph RAG, and Multi-agent systems with LangGraph',
    highlights: [
      'Advanced Indexing (Semantic Chunking, HNSW)',
      'Hybrid Search & Query Transformation',
      'Knowledge Graphs & Neo4j',
      'LangGraph & Agentic Patterns',
      'RAGAS Evaluation & Observability',
    ],
    link: '/blog/ai-advanced/introduction',
  },
  {
    title: 'Course 3: Software Engineering for AI',
    duration: '8-10 weeks',
    topics: 11,
    description: 'Production-ready development practices for AI applications',
    highlights: [
      'Git Workflows & Database Design',
      'REST APIs, JWT & Redis Caching',
      'Testing (TDD) & Docker',
      'Clean Architecture & Design Patterns',
      'CI/CD Pipelines & Deployment',
    ],
    link: '/blog/software-engineer/git-collaboration-workflow/documentation',
  },
];

const CourseTableData = {
  course1: {
    title: 'Course 1: AI Fundamentals',
    sections: [
      { num: '01', section: 'Introduction to RAG', subsections: 'LLM Limitations • RAG Concept & Benefits • Real-world Applications', requirements: 'Basic LLM understanding', outputs: 'Understand RAG necessity' },
      { num: '02', section: 'RAG Theory', subsections: 'Fine-tuning vs In-Context Learning • Core RAG Components • Processing Flow', requirements: 'LLM fundamentals', outputs: 'Compare RAG approaches' },
      { num: '03', section: 'RAG Architecture', subsections: 'System Architecture • Document Loader & Text Chunker • Vector Database', requirements: 'System design basics', outputs: 'Design RAG architecture' },
      { num: '04', section: 'LangChain Introduction', subsections: 'Framework Overview • Ecosystem • Core Concepts • Installation', requirements: 'Python proficiency', outputs: 'Install LangChain environment' },
      { num: '05', section: 'LangChain Components', subsections: 'Document Loaders • Text Splitters • Embeddings • Vector Stores', requirements: 'LangChain basics', outputs: 'Implement document processing' },
      { num: '06', section: 'Practice: Setup', subsections: 'Environment Configuration • API Keys • Dependencies • Project Structure', requirements: 'Python environment setup', outputs: 'Working development environment' },
      { num: '07', section: 'Practice: Data Preparation', subsections: 'Document Collection • Preprocessing • Text Splitting Strategies', requirements: 'Data handling skills', outputs: 'Cleaned document corpus' },
      { num: '08', section: 'Practice: Vector Database', subsections: 'Vector DB Setup • Embedding Generation • Index Creation • Search Testing', requirements: 'Vector concepts', outputs: 'Operational vector database' },
      { num: '09', section: 'Practice: RAG Chain', subsections: 'Chain Construction • Retriever Configuration • Prompt Engineering', requirements: 'LangChain chains', outputs: 'Functional RAG pipeline' },
      { num: '10', section: 'Practice: UI & Deployment', subsections: 'Streamlit/Gradio UI • Deployment Options • Error Handling', requirements: 'Web framework basics', outputs: 'Deployed application' },
      { num: '11', section: 'Quiz & Summary', subsections: 'Knowledge Assessment • Key Concepts Review • Best Practices', requirements: 'Complete course material', outputs: 'Pass assessment' },
      { num: '12', section: 'Appendix', subsections: 'Additional Resources • Troubleshooting Guide • API References', requirements: 'Reference navigation', outputs: 'Resource library' },
    ],
  },
  course2: {
    title: 'Course 2: AI Advanced',
    sections: [
      { num: '01', section: 'Introduction', subsections: 'Advanced RAG Overview • Limitations of Basic RAG • Prerequisites Review', requirements: 'Complete Course 1', outputs: 'Understand advanced concepts' },
      { num: '1.1', section: 'Advanced Indexing', subsections: 'Semantic Chunking • HNSW Indexing • Multi-Vector Retrieval', requirements: 'Vector similarity concepts', outputs: 'Semantic chunking implementation' },
      { num: '1.2', section: 'Hybrid Search', subsections: 'BM25 • Dense Vector Search • Reciprocal Rank Fusion (RRF)', requirements: 'Information retrieval theory', outputs: 'Hybrid search system' },
      { num: '1.3', section: 'Query Transformation', subsections: 'HyDE • Query Decomposition • Multi-Query Retrieval', requirements: 'Query analysis skills', outputs: 'Query transformation pipeline' },
      { num: '1.4', section: 'Post-Retrieval', subsections: 'Reranking • Maximal Marginal Relevance (MMR) • Contextual Compression', requirements: 'Ranking models', outputs: 'Reranking implementation' },
      { num: '2.1', section: 'Graph Database Intro', subsections: 'Graph DB Concepts • Neo4j Introduction • Cypher Query Language', requirements: 'Database fundamentals', outputs: 'Neo4j setup' },
      { num: '2.2', section: 'Graph RAG Implementation', subsections: 'Knowledge Graph Construction • Entity Extraction • Graph-based Retrieval', requirements: 'NLP for entity extraction', outputs: 'Graph RAG system' },
      { num: '3.1', section: 'LangGraph Foundations', subsections: 'Graph API & Architecture • State Management • Nodes & Edges', requirements: 'State management concepts', outputs: 'LangGraph workflow' },
      { num: '3.2', section: 'Agentic Patterns', subsections: 'Reflection Pattern • Planning & Re-planning • Self-Critique', requirements: 'Agent concepts', outputs: 'Reflection agent' },
      { num: '3.3', section: 'Tool Calling', subsections: 'Function Calling • Tavily Search Integration • Tool Binding', requirements: 'API integration', outputs: 'Tool-calling agent' },
      { num: '3.4', section: 'Multi-Agent Collaboration', subsections: 'Agent Communication • Supervisor Pattern • Parallel Execution', requirements: 'Multi-agent systems', outputs: 'Multi-agent system' },
      { num: '3.5', section: 'Human-in-the-Loop', subsections: 'Breakpoints • Persistence (Checkpointer) • State Recovery', requirements: 'Interactive system design', outputs: 'HITL system' },
      { num: '4.1', section: 'RAGAS Evaluation', subsections: 'Evaluation Metrics • RAGAS Framework • Automated Testing', requirements: 'Evaluation methodology', outputs: 'RAGAS evaluation pipeline' },
      { num: '4.2', section: 'Observability', subsections: 'LangFuse Integration • LangSmith Tracing • Performance Analysis', requirements: 'Observability tools', outputs: 'LangFuse/LangSmith setup' },
      { num: '4.3', section: 'Experiment Comparison', subsections: 'Naive RAG Baseline • Graph RAG Evaluation • A/B Testing', requirements: 'Experimental design', outputs: 'Comparison report' },
      { num: '4.4', section: 'Quiz & Appendix', subsections: 'Advanced Assessment • Complete Project Review • Troubleshooting', requirements: 'Complete course material', outputs: 'Production-ready RAG system' },
    ],
  },
  course3: {
    title: 'Course 3: Software Engineering for AI',
    sections: [
      { num: '01', section: 'Git Collaboration Workflow', subsections: 'Git Fundamentals • Branching Strategies • Pull Requests', requirements: 'Git CLI proficiency', outputs: 'Implement Gitflow workflow' },
      { num: '02', section: 'Relational Database Design', subsections: 'SQL Fundamentals • Database Normalization • Indexing Strategies', requirements: 'SQL query skills', outputs: 'Design normalized database schema' },
      { num: '03', section: 'API Mastery: REST & Security', subsections: 'RESTful API Design • JWT Authentication • Rate Limiting', requirements: 'REST API design', outputs: 'Build REST API with FastAPI' },
      { num: '04', section: 'Caching Strategies with Redis', subsections: 'Redis Fundamentals • Caching Patterns • TTL Strategies', requirements: 'Redis operations', outputs: 'Implement cache-aside pattern' },
      { num: '05', section: 'Testing Methodologies & TDD', subsections: 'Unit Testing with Pytest • TDD Cycle • Mocking & Patching', requirements: 'Pytest framework', outputs: 'Write unit tests with fixtures' },
      { num: '06', section: 'Docker Fundamentals', subsections: 'Docker Basics • Dockerfile Best Practices • Multi-stage Builds', requirements: 'Docker CLI', outputs: 'Build optimized Docker image' },
      { num: '07', section: 'Container Orchestration', subsections: 'Docker Compose • Multi-service Architecture • Networking', requirements: 'Docker Compose syntax', outputs: 'Create docker-compose.yml' },
      { num: '08', section: 'Clean Architecture', subsections: 'Clean Architecture Principles • Domain-Driven Design • Layered Architecture', requirements: 'SOLID principles', outputs: 'Refactor with clean architecture' },
      { num: '09', section: 'Design Patterns for AI', subsections: 'Creational Patterns • Behavioral Patterns • Structural Patterns', requirements: 'Design pattern knowledge', outputs: 'Implement Factory for LLM providers' },
      { num: '10', section: 'Microservices vs Serverless', subsections: 'Microservices Architecture • Serverless Architecture • Cold Start', requirements: 'Microservices principles', outputs: 'Deploy microservice' },
      { num: '11', section: 'CI/CD Automation Pipelines', subsections: 'CI/CD Fundamentals • GitHub Actions • Deployment Strategies', requirements: 'GitHub Actions syntax', outputs: 'Setup CI/CD pipeline' },
    ],
  },
};

function Feature({ title, description, icon }) {
  return (
    <div className={clsx('col col--4', styles.featureItem)}>
      <div className={styles.featureIcon}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function Course({ title, duration, topics, description, highlights, link }) {
  return (
    <div className={clsx('col col--12 col--md-4', styles.courseCard)}>
      <div className={styles.courseCardInner}>
        <div className={styles.courseHeader}>
          <h3>{title}</h3>
          <div className={styles.courseMeta}>
            <span>📅 {duration}</span>
            <span>📚 {topics} topics</span>
          </div>
        </div>
        <p className={styles.courseDescription}>{description}</p>
        <div className={styles.courseHighlights}>
          <h4>What You'll Learn:</h4>
          <ul>
            {highlights.map((highlight, idx) => (
              <li key={idx}>
                <CheckIcon className="h-5 w-5" style={{ width: '18px', height: '18px', color: 'var(--ifm-color-success)', marginRight: '8px' }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <Link
          className={clsx('button button--primary button--block', styles.courseButton)}
          to={link}>
          Start Learning →
        </Link>
      </div>
    </div>
  );
}

function CourseTable({ courseKey, data }) {
  return (
    <div className={styles.courseTableWrapper}>
      <h3 className={styles.courseTableTitle}>{data.title}</h3>
      <div className={styles.tableContainer}>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Section</th>
              <th>Subsections</th>
              <th>Requirements</th>
              <th>Expected Outputs</th>
            </tr>
          </thead>
          <tbody>
            {data.sections.map((row, idx) => (
              <tr key={idx}>
                <td className={styles.numCell}>{row.num}</td>
                <td className={styles.sectionCell}>{row.section}</td>
                <td className={styles.subsectionCell}>{row.subsections}</td>
                <td>{row.requirements}</td>
                <td>{row.outputs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CourseTableSection() {
  const [activeTab, setActiveTab] = React.useState('course1');

  return (
    <section className={styles.courseTableSection}>
      <div className="container">
        <h2 className="text--center" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ifm-color-primary-darker)' }}>
          📋 Detailed Course Curriculum
        </h2>
        <p className="text--center" style={{ fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '3rem' }}>
          Explore the complete learning path with sections, requirements, and expected outputs
        </p>
        <div className={styles.tabContainer}>
          <button
            className={clsx(styles.tabButton, activeTab === 'course1' && styles.tabButtonActive)}
            onClick={() => setActiveTab('course1')}
          >
            📚 Course 1: AI Fundamentals
          </button>
          <button
            className={clsx(styles.tabButton, activeTab === 'course2' && styles.tabButtonActive)}
            onClick={() => setActiveTab('course2')}
          >
            🚀 Course 2: Advanced RAG
          </button>
          <button
            className={clsx(styles.tabButton, activeTab === 'course3' && styles.tabButtonActive)}
            onClick={() => setActiveTab('course3')}
          >
            ⚙️ Course 3: Software Engineering
          </button>
        </div>
        <CourseTable courseKey={activeTab} data={CourseTableData[activeTab]} />
      </div>
    </section>
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

function CoursesSection() {
  return (
    <section className={styles.coursesSection}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')}>
            <h2 className="text--center" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>
              🎓 AI Engineer Training Program
            </h2>
            <p className="text--center" style={{ fontSize: '1.4rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              Complete learning path from AI Fundamentals to production-ready AI applications
            </p>
          </div>
        </div>
        <div className="row">
          {CourseList.map((props, idx) => (
            <Course key={idx} {...props} />
          ))}
        </div>
        <div className="row" style={{ marginTop: '4rem' }}>
          <div className={clsx('col col--12 text--center')}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', opacity: 0.8 }}>
              <strong>📊 Complete Program:</strong> 15-19 weeks | 39 topics | Hands-on projects
            </p>
            <Link
              className="button button--secondary button--lg"
              style={{ borderRadius: '50px', padding: '1rem 2.5rem' }}
              to="/blog/ai-fundamental/introduction-to-ai">
              View Full Curriculum →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{ borderRadius: '50px', padding: '1rem 2rem', fontWeight: 'bold' }}
            to="/blog/ai-fundamental/introduction-to-ai">
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
        <CoursesSection />
        <CourseTableSection />
      </main>
    </Layout>
  );
}
