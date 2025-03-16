import './App.css'
import { useRoutes } from 'react-router-dom';
import List from './conponents/ListStuden';
import Add from './conponents/AddStuden';
import Edit from './conponents/EditStuden';
import Register from './conponents/RegisterStudent';
import Login from './conponents/LoginStuden';
function App() {
  const routes = useRoutes([
    {path:'/student',element:<List/>},
    {path:'/student/add',element:<Add/>},
    {path:'/edit/:id',element:<Edit/>},
    {path:'/register',element:<Register/>},
    {path:'/login',element:<Login/>},
  ])
  return routes      
}

export default App
