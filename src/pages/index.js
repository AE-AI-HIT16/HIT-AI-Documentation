import React from 'react';
import Layout from '@theme/Layout';
import {Redirect} from '@docusaurus/router';

export default function Home() {
  // Redirect to /blog which should show blogs/index.mdx
  // Since routeBasePath is "/blog", index.mdx should be accessible at /blog
  return <Redirect to="/blog" />;
}
