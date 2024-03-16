import './App.css'
import Home from './components/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SingleBlog from './components/SingleBlog'
import CreateBlog from './components/CreateBlog'
import UpdateBlog from './components/UpdateBlog'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/createBlog' element={<CreateBlog/>}/>
      <Route path='/blogs/:id' element={<SingleBlog/>}/>
      <Route path='/update/:id' element={<UpdateBlog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
