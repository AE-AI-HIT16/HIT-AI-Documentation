import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import CommentSystem from '@site/src/components/Comments/CommentSystem';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function LayoutWrapper(props) {
  const { metadata } = useDoc();
  // Generate a unique ID for the page based on the permalink or id
  const pageId = metadata.id;

  return (
    <>
      <Layout {...props} />
      <div className="row">
        <div className="col col--9 col--offset-1">
          <CommentSystem pageId={pageId} />
        </div>
      </div>
    </>
  );
}
