import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import InfoPosts from './Pages/InfoPosts'
import Posts from './Pages/Posts'
import Todos from './Pages/Todos'
import Users from './Pages/Users'
function App() {
  return (
    <div>
      <div className="container">
          <Link to={'/posts'}> <button className="btn btn-dark">posts</button> </Link>
          <Link to={'/todos'}> <button className="btn btn-dark">todos</button> </Link>
          <Link to={'/users'}> <button className="btn btn-dark">users</button> </Link>
          <Switch>
            <Route path={'/posts/:id'} component={InfoPosts}></Route>
            <Route path={'/posts'} component={Posts}></Route>
            <Route path={'/todos'} component={Todos}></Route>
            <Route path={'/users'} component={Users}></Route>
          </Switch>
      </div>
    </div>
  )
}

export default App
