import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Editor/tools'
import Comments from './Comments';

const BlogDetails = ({ blogs }) => {
    const instanceRef = useRef(null);
    const blogId = useParams();
    const blog = blogs.find(x => x._id === blogId.id);
    console.log(blog)

    return (
        <div className="blogDetails">
            {
                blog
                    ? <div className="blogDetailsMain">
                        <div style={{ margin: 'auto', width: 'fit-content' }}>
                            <img className="blog-detail-image" src={blog.category} alt="blogimage"></img>
                        </div>
                        <EditorJs
                            readOnly={true}
                            data={blog.content}
                            tools={EDITOR_JS_TOOLS}
                            placeholder="Start your story here!"
                            instanceRef={(instance) => (instanceRef.current = instance)}
                        />
                        <Comments />
                    </div>
                    : null
            }
        </div>
    )
}

export default BlogDetails
