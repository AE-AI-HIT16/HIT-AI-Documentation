import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function LayoutWrapper(props) {
  const { metadata } = useDoc();


  return (
    <>
      <Layout {...props} />

    </>
  );
}
