import React, { useRef, useState } from 'react'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';
// import editorjsHTML from "editorjs-html";

const Editor = () => {
    const instanceRef = useRef(null)
    // const edjsParser = editorjsHTML();
    const [formData, setFormData] = useState({ description: '', title: '' })
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSave = async (e) => {
        e.preventDefault();
        const savedData = await instanceRef.current.save()
        if (savedData.blocks.length !== 0) {
            const data = {
                description: formData.description,
                tilte: formData.title,
                content: savedData
            }
            console.log(data)
        } else {
            alert('Your blog cannot be empty!')
        }
    }

    if (!user?.result?.name) {
        return (
            <div className="editor-signup">
                <h2>Sign up to write a story!</h2>
                <h4 className="auth-buttons"><a style={{ color: 'black' }} href="/auth">Sign Up</a></h4>
            </div>
        );
    }

    return (
        <>
            <EditorJs
                readOnly={false}
                data={{ blocks: [] }}
                tools={EDITOR_JS_TOOLS}
                placeholder="Start your story here!"
                instanceRef={(instance) => (instanceRef.current = instance)}
            />
            <form className="form" onSubmit={handleSave}>
                <label>Blog Title:</label>
                <input required type="text" id="title" name="title" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <br></br>
                <label>Short Description:</label>
                <input required type="text" id="description" name="description" placeholder="Short Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <br></br>
                {/* <button onClick={handleSave}>click</button> */}
                <input type="submit" value="Publish" />
            </form>
        </>
    )
}

export default Editor
