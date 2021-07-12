import React, { useRef, useState } from 'react'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';
// import editorjsHTML from "editorjs-html";

const Editor = () => {
    const instanceRef = useRef(null)
    // const edjsParser = editorjsHTML();
    const [jsonData, setJsonData] = useState({ blocks: [] })
    const [formData, setFormData] = useState({ name: '', 'title': '', content: {} })
    const [submitText, setSubmitText] = useState('Save')

    const handleSave = async (e) => {
        e.preventDefault();
        const savedData = await instanceRef.current.save()
        if (submitText === 'Save') {
            setJsonData(savedData)
            // const html = edjsParser.parse(savedData);
            setFormData({ ...formData, content: savedData })
            console.log(formData);
            setSubmitText('Submit');
        } else {
            setJsonData(savedData)
            // const html = edjsParser.parse(savedData);
            setFormData({ ...formData, content: savedData })
            console.log(formData);
        }
    }
    return (
        <>
            <EditorJs
                inlineToolbar={true}
                readOnly={false}
                data={jsonData}
                tools={EDITOR_JS_TOOLS}
                placeholder="Start your story here!"
                instanceRef={(instance) => (instanceRef.current = instance)}
            />
            <form className="form" onSubmit={handleSave}>
                <label>Name:</label>
                <input required type="text" id="nname" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <br></br>
                <label>Blog Title:</label>
                <input required type="text" id="title" name="title" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <br></br>
                {/* <button onClick={handleSave}>click</button> */}
                <input type="submit" value={submitText} />
            </form>
        </>
    )
}

export default Editor
