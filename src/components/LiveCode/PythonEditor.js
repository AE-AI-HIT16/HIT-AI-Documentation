import React, { useState, useEffect } from 'react';
import { usePython } from 'react-py';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import clsx from 'clsx';
import styles from './styles.module.css';

// Ensure Prism loads python syntax (basic check)
if (!languages.python) {
    require('prismjs/components/prism-python');
}

const PythonEditor = ({ code: initialCode, height = "200px" }) => {
    const [code, setCode] = useState(initialCode || "print('Hello World')");
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

    // If initialCode provided via props changes, update state
    useEffect(() => {
        if (initialCode) setCode(initialCode);
    }, [initialCode]);

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
                <span className={styles.label}>
                    🐍 Python Live Editor
                </span>
                <button
                    className={styles.runBtn}
                    onClick={() => runPython(code)}
                    disabled={isLoading || isRunning}
                >
                    {isLoading ? (
                        <>Initializing...</>
                    ) : isRunning ? (
                        <>
                            <span className={styles.loader}></span> Running
                        </>
                    ) : (
                        '▶ Run'
                    )}
                </button>
            </div>

            <div className={styles.editorArea} style={{ minHeight: height }}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.python || languages.js, 'python')}
                    padding={16}
                    style={{
                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                        fontSize: 14,
                    }}
                />
            </div>

            {(stdout || stderr) && (
                <div className={styles.outputArea}>
                    <div className={styles.outputLabel}>Output:</div>
                    {stdout && <div>{stdout}</div>}
                    {stderr && <div style={{ color: '#ff5555' }}>{stderr}</div>}
                </div>
            )}
        </div>
    );
};

export default PythonEditor;
