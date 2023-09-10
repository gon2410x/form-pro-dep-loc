import Swal from "sweetalert2";
import storage from "./Storage/storage";
import axios from "axios";

export const show_alert = (msj,icon) =>{
    Swal.fire({title:msj,icon:icon, buttonsStyling: true});
}
export const sendRequest = async(method, params ,url, body ,redir='' ,token=true)=>{
    // if(token){
    if(false){
        const authToken = storage.get('authToken');
        axios.defaults.headers.common['Authorizaion']='Beare'+authToken;
    }
    let res; 
        // body = null;
        // await axios({ method:method, url:url, data: a , }).then(

        let consulta = { method:method, url:url, data: body  };

        if( method == "DELETE")[
            consulta = { method:method, url:url  }
        ]
        console.log(consulta)

        await axios(consulta).then(
        // await axios({ method:method, url:url }).then(
        response=>{
            res = response.data,
            (method != 'POST' && url != '/provinces' ) ? show_alert(response.data.message,'success'):'',            
            setTimeout(()=>
                (redir !== '') ? window.location.href = redir : '',2000)
        }).catch( (errors) => {
            let desc = '';
            res = errors.response.data,
            console.log("bbbb ERROR bbbbb", res)
            errors.response.data.errors.map((e)=>{desc= desc + '' +e})
            show_alert(desc,'error')
        })

        
    
        return res;
}

export const confirmation = async(url, redir)=>{
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Are you sure delete '+'?',
        icon:'question', showCancelButton:true,
        confirmButtonText:'<i class= "fa-solid fa-check"></i> Yes, delete',
        cancelButtonText:'<i class= "fa-solid fa-ban"></i> Cancel',
    }).then((result)=>{
        if (result.isConfirmed) {
            sendRequest('DELETE',{},url,redir);
        }
    });
}

export default show_alert;