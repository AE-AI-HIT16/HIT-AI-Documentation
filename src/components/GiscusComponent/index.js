import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="ghUsername/repoName" // TODO: Replace with your repo
            repoId="someHash"          // TODO: Replace with your repoId
            category="Announcements"   // TODO: Replace with your category
            categoryId="someHash"      // TODO: Replace with your categoryId
            mapping="title"
            term="Welcome to my blog!"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme={colorMode}
            lang="en"
            loading="lazy"
            crossorigin="anonymous"
            async
        />
    );
}
