import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Quiz from '@site/src/components/Quiz';
import PythonEditor from '@site/src/components/LiveCode/PythonEditor';

export default {
    // Re-use the default mapping
    ...MDXComponents,
    // Add the "Quiz" tag to the global scope
    Quiz,
    PythonEditor,
};
