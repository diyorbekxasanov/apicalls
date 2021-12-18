import { useEffect, useState } from 'react'
import { getDo } from '../servises'
function SelectUser({ onChangeSelect, name }) {
    const [users, setUsers] = useState([])
    const [currentUsers, setCurrentUsers] = useState('')
    async function getPosts() {
        const res = await getDo("/users")
        setUsers(res)
    }
    function onChangeSelectUser(event) {
        let id = event.target.value
        let id1 = id === '' ? '' : parseInt(id)
        setCurrentUsers(id1)
        if(onChangeSelect)
        onChangeSelect(id1)
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <select className="form-control" name={name} onChange={onChangeSelectUser} value={currentUsers} >
            <option value=''>All</option>
            {
                users.map(item => <option value={item.id} key={item.id} >{item.name} </option>)
            }
        </select>
    )
}

export default SelectUser
