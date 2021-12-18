import {React, useEffect, useState} from 'react'
import { getDo } from '../servises'
function InfoPosts({history, match, location}) {
    const [post, setPost] = useState('')
    const [user, setUser] = useState('')
    useEffect(()=>{
        NewPost(match.params.id)
    },[])
    async function NewPost(id) {
        const res = await getDo("/posts/"+id)
        setPost(res)
        const res2 = await getDo("/users/"+res. userId)
        setUser(res2)
    }
    return (
        <div>
            <h1>info posts: {match.params.id} </h1>
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-header">
                            {user.name}
                        </div>
                        <div className="card-body">
                            {user.phone}
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card-header">
                            {post.id +'. ' + post.title}
                        </div>
                        <div className="card-body">
                            {post.body}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InfoPosts