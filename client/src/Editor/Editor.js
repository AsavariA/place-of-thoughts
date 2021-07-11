import React, { useRef } from 'react'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools'
import editorjsHTML from "editorjs-html";

const Editor = () => {
    const instanceRef = useRef(null)
    const edjsParser = editorjsHTML();

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        console.log(savedData)
        const html = edjsParser.parse(savedData);
        console.log(html);
    }
    return (
        <div>
            <EditorJs data={{ blocks: [] }} tools={EDITOR_JS_TOOLS} instanceRef={(instance) => (instanceRef.current = instance)} />
            <button onClick={handleSave}>click</button>
        </div>
    )
}

export default Editor
