import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="AE-AI-HIT16/HIT-AI-Documentation" // TODO: Replace with your repo
            repoId="R_kgDOREh75w"          // TODO: Replace with your repoId
            category="General"   // TODO: Replace with your category
            categoryId="DIC_kwDOREh7584C1n94"      // TODO: Replace with your categoryId
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
