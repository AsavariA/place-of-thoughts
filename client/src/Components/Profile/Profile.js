import React from 'react'
import Blogcard from '../Home/Blogcard';

const Profile = ({ blogs, timeConverter }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const myblogs = blogs.filter(blog => blog.ownerName === user?.result?.name);

    if (!user?.result?.name) {
        return (
            <div className="editor-signup">
                <h2>Sign up to view your profile!</h2>
                <h4 className="auth-buttons"><a style={{ color: 'black' }} href="/auth">Sign Up</a></h4>
            </div>
        );
    }

    return (
        <div>
            <div className="main-heading">
                <h2>{user?.result?.name} &#9889;</h2>
            </div>
            {/* <div className="main-heading">
                <h4>Your blogs:</h4>
            </div> */}
            <div className="profile-grid">
                <div className="filled-profile1">
                    <h3 className="small-title">Authored Blogs :</h3>
                    {
                        myblogs.length > 0
                            // eslint-disable-next-line
                            ? myblogs.map((myblog) => {
                                return (
                                    <div key={myblog._id} style={{ padding: '1rem 1.5rem' }}>
                                        <Blogcard blog={myblog} timeConverter={timeConverter} />
                                    </div>
                                )
                            }).reverse()
                            : <div className="empty-profile1" style={{}}>
                                <h3 style={{ textAlign: 'center' }}>Looks like you haven't authored any blogs. Write one now!</h3>
                            </div>
                    }
                </div>
                <div className="filled-profile2">
                    <h3 className="small-title">Saved blogs :</h3>
                    {
                        myblogs.length > 0
                            // eslint-disable-next-line
                            ? myblogs.map((myblog) => {
                                return (
                                    <div key={myblog._id} style={{ padding: '1rem 1.5rem' }}>
                                        <Blogcard blog={myblog} timeConverter={timeConverter} />
                                    </div>
                                )
                            }).reverse()
                            : <div className="empty-profile2" style={{}}>
                                <h3 style={{ textAlign: 'center' }}>Your saved blogs appear here!</h3>
                            </div>
                    }
                </div>
                {/* <div className="empty-profile1">
                    <h3 style={{ textAlign: 'center' }}>Your saved blogs appear here.</h3>
                </div> */}
            </div>
        </div>
    )
}

export default Profile
