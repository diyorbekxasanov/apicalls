import { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { useForm } from "react-hook-form"
import { getDo } from "../servises"
function PostModal({ toggle, isOpen, onSubmit, loading }) {
    const [user, setUser] = useState([])
    const { register, handleSubmit } = useForm()
    async function getUsers() {
        const users = await getDo("/users")
        setUser(users)
    }
    useEffect(()=>{
        getUsers()
    },[])
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    Add Post
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} id='form'  >
                        <input type="text" className="form-control mb-3" placeholder="Title..." {...register('title')} />
                        <select  {...register('user')} className="form-control">
                            <option value="">All</option>
                            {
                                user.map(item=><option value={item.id} key={item.id}>
                                    {item.name}
                                </option> )
                            }
                        </select>
                        <textarea  type="textarea" className="form-control mt-3" placeholder="Body..." {...register('body')} style={{ resize: 'none' }} />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type='submit' className="btn btn-success" form='form' disabled={loading}>save</button>
                    <button type='button' className="btn btn-danger" onClick={toggle}>cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default PostModal
