import React,{useEffect,useState} from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import {Link} from 'react-router-dom';
import {confirmation,sendRequest} from '../../functions';


const Contenedor = () => {
  const [contenedores, setContenedores] = useState([]);
  const [classLoad,setClassLoad] = useState('');
  const [classTable,setClassTable] = useState('');

  useEffect(()=>{
    getContenedores();
  },[]);

  const getContenedores = async()=>{
    // const res = await sendRequest('GET','','api/contenedores','');
    let a = { province: 'Jujuy',department: 'Dr. Manuel Belgrano',location: 'San Salvador de Jujuy',residuo: 'envases de plasticos, metalicos' };
    const res = await sendRequest('POST','','/containers/list',a);
    // setContenedores(res);
    console.log("aaaaaaaaaa DATA aaaaaaaaaaaa", res)
    setContenedores(res);
    setClassTable(''),
    setClassLoad('d-none');
  }
  const deleteContenedor = (id) => {
    confirmation('containers/'+id,'/');
  }
  return (
    <div className='container-fluid'>
      <DivAdd>
        <Link to='create' className='btn btn-success'>
            <i className='fa-solid fa-circle-plus'></i> AGREGAR
        </Link>
      </DivAdd>
     <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
        <thead><tr><th>#</th><th>CONTENEDORES</th><th>LATITUD</th><th>LONGITUD</th><th>PROVINCIA</th><th>DIRECCION</th><th>TIPO</th></tr></thead>
        <tbody className='table-group-divider'>
          {contenedores.map((row,i)=>(
            <tr key={row.i}>
              <td>{(i+1)}</td>
              <td>{row.id_container}</td>
              <td>{row.latitude}</td>
              <td>{row.longitude}</td>
              <td>{row.location.department.province.province_name}</td>
              <td>{row.street_description}</td>
              <td>{row.container_type.residuo}</td>
              <td>

              <Link to={'/edit/'+ row.id_container} className='btn btn-warning'>
                <i className='fa-solid fa-edit'>Editar</i>
              </Link>              
              </td>
              <td>
              <button  className='btn btn-danger' onClick={()=> deleteContenedor(row.id_container)}>
              <i className='fa-solid fa-trash'>Eliminar</i>               
              </button>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
 </DivTable>
    </div>
  )
}

export default Contenedor