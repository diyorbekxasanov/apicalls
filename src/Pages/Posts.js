import { React, useEffect, useState } from 'react'
import PostModal from '../Component/PostModal'
import SelectUser from '../Component/SelectUser'
import { getDo, getPost } from '../servises'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Posts({ history }) {
    const [posts, getPosts] = useState([])
    const [dataPosts, getDataPosts] = useState([])
    const [modalvisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    console.log(user);
    async function PostsDo() {
        const a = await getDo("/posts")
        getPosts(a)
        getDataPosts(a)
    }

    useEffect(() => {
        PostsDo()
    }, [])
    function OnePost(id) {
        history.push("/posts/" + id)
    }
    function filter(userId) {
        return dataPosts.filter(item => (item.userId == userId) || userId == '')
    }
    function onChangeSelect(userId) {
        const a = filter(userId)
        getPosts(a)
    }

    function ModalToggle() {
        setModalVisible(prev=>!prev)
    }

    async function saveData(data) {
        const res = await getPost("/posts", data)
        setLoading(prev=>!prev)  
        toast("Ma'lumot saqlandi")
        getDataPosts(prev=>{
            prev.unshift(res)
            getPosts([...prev])
            return prev

        })
    }

    function onSubmit(data) {     
        setLoading(prev=>!prev)  
        saveData(data)
        setModalVisible(prev=>!prev)
    }

    function changeUser(id) {
        console.log(id);
        setUser(id)
    }


    return (
        <div>
            <h1 className="text-center">posts</h1>
            <br />
            <div className="row d-flex justify-content-between">
                <div className="col-md-3">
                    <SelectUser onChangeSelect={onChangeSelect} />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark float-end" onClick={ModalToggle}>Add</button>
                    <ToastContainer/>
                    <PostModal loading={loading} changeUser={changeUser}  toggle={ModalToggle} isOpen={modalvisible} onSubmit={onSubmit} />
                </div>
            </div>
            <br />
            <div className="row">
                {
                    posts.map((item, index) =>
                        <div className="col-3 post-pages" key={index}>
                            <div className="card my-2 post-card" onClick={() => OnePost(item.id)}>
                                <div className="card-header bg-dark text-white">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    {item.body}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Posts
