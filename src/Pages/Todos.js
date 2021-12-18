import { React, useEffect, useState } from 'react'
import SelectUser from '../Component/SelectUser'
import { getDo } from '../servises'
const CheckStyle = {
    transform: 'scale(1.5)'
}
function Todos() {
    const [todos, getTodos] = useState([])
    const [dataTodos, getDataTodos] = useState([])
    const [select, setSelect] = useState('')
    const [bool, setBool] = useState(false)
    const [isFalse, setFalse] = useState(false)
    const [page, setPages] = useState(1)


    function filter(userId, completed, page) {
        return dataTodos.filter(item => (item.userId == userId || !userId) && (item.completed === completed || !isFalse))
            .filter((item, index) => index >= (page - 1) * 10 && index < page * 10)
    }

    useEffect(() => {
        TodosGet()
    }, [])

    async function TodosGet() {
        const a = await getDo("/todos")
        getTodos(a.filter((item, index) => index >= 0 && index < 10))
        getDataTodos(a)
    }

    function onChangeSelect(userId) {
        let b = filter(userId, bool, page)
        getTodos(b)
    }
    function onChangeChecked(event) {
        let a = event.target.checked
        setBool(a)
        setFalse(true)
        getTodos(filter(select, a, page))

    }
    function resetClick() {
        let res = dataTodos.filter((item, index) => index >= 0 && index < 10)
        getTodos(res)
        setSelect('')
        setBool(false)
        setFalse(false)

    }
    function prevClick() {
        page===1?setPages(1):setPages(page-1)
    }
    function nextClick() {
        setPages(prev => prev + 1)
    }
    useEffect(() => {
        let res = filter(select, bool, page)
        getTodos(res)
    }, [page])
    return (
        <div>
            <h1 className="text-center">todos</h1>
            <div className="row my-3">
                <div className="col-md-1 offset-2">
                    <button className="btn btn-danger" onClick={resetClick}>reset</button>
                </div>
                <div className="col-md-3 ">
                    <SelectUser onChangeSelect={onChangeSelect} />
                </div>
                <div className="col-md-3">
                    <label>
                        Completed: <input type="checkbox" onChange={onChangeChecked} checked={bool} style={CheckStyle} />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <table className="table table-bordered table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>title</th>
                                <th>completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.id} </td>
                                        <td>{item.title} </td>

                                        <td> <input type="checkbox" checked={item.completed ? "checked" : ''} /> </td>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-md-2 offset-4">
                    <button className="btn btn-dark" onClick={prevClick}> {'<<'} prev </button>
                </div>
                <div className="col-md-1">
                    <h1>{page} </h1>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark" onClick={nextClick}> next {'>>'} </button>
                </div>
            </div>
        </div>
    )
}

export default Todos
