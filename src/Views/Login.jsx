import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {sendRequest} from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';
import axios from 'axios';


const Login = () => {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const go = useNavigate();
  const csrf = async()=>{ // si no es de larabel se omite esta funcion
    await axios.get('/sanctum/csrf-cookie/');
  }
  const login = async(e) =>{
    e.preventDefault();
    // await csrf();
    const form = {email:email,password:password};
    const res = await sendRequest('POST', "",'/signin',form ,"/");
    // if(res.status == true){
    if(res.rol){
      storage.set('authToken',res.credentials.token);
      storage.set('authUser',res.rol);
      go('/');
    }
    // go('/');
  }
  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-success'>
            <div className='card-header bg-success border border-success text-white'>
              LOGIN
            </div>
            <div className='card-body'>
              <form onSubmit={login}>
                <DivInput type='email' icon='fa-at' value={email}
                  className='form-control' placeholder='Email' required='required'
                  handleChange={(e)=> setEmail(e.target.value)}/>
                <DivInput type='password' icon='fa-key' value={password}
                  className='form-control' placeholder='Password' required='required'
                  handleChange={(e)=> setPassword(e.target.value)}/>
                  <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-success'>
                    <i className='fa-solid fa-door-open'></i>Login
                  </button>
                  </div>
              </form>
              <Link to='/register'>
                  <i className='fa-solid fa-user-plus'></i>Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login