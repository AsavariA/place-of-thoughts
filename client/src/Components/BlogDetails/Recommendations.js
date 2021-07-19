import React from 'react'
import RecommendationCard from './RecommendationCard'

const Recommendations = ({ blogs }) => {

    return (
        <div className="recmain">
            <h3 style={{ textAlign: 'center', margin: '1rem 0' }}>YOU MIGHT ALSO LIKE - </h3>
            <div className='recs'>
                {
                    blogs.length > 0
                        ? blogs.slice(0, 3).map((blog) => {
                            return (
                                <div key={blog._id} style={{ margin: '1rem' }}>
                                    <RecommendationCard blog={blog} />
                                </div>
                            )
                        }).reverse()
                        : <div style={{ padding: '1rem' }}>
                            <i><h4 style={{ textAlign: 'center', color: 'grey' }}>Looks like there aren't many blogs in this category :( </h4></i>
                        </div>
                }
            </div>

        </div>
    )
}

export default Recommendations
