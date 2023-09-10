import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './Components/Nav';
import Contenedor from "./Views/Contenedor/Index";
import CreateContenedor from "./Views/Contenedor/Create";
import EditContenedor from "./Views/Contenedor/Edit";
import Organizacion from "./Views/Organizacion/Index";
import Login from "./Views/Login";
import Register from "./Views/Register";
import ProtectedRoutes from "./Components/ProtectedRoutes";


function App() {

  return (
   <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>      
      <Route element={<ProtectedRoutes/>}>
      </Route>
        <Route path="/" element={<Contenedor/>}/>
        <Route path="/create" element={<CreateContenedor/>}/>
        <Route path="/edit/:id" element={<EditContenedor/>}/>
        <Route path="/organizacion" element={<Organizacion/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
