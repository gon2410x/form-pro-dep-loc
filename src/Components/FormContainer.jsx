import React, { useEffect, useState, useRef } from "react";
import { sendRequest } from "../functions";
import DivInput from "./DivInput";
import DivSelect from "./DivSelect";
import Swal from "sweetalert2";


const FormContainer = (params) => {
  const [name, setName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [street_description, setStreet_description] = useState("");
  const [options, setOptions] = useState([]);

  const [ province, setProvince] = useState("");
  const [ department, setDepartment ] = useState("");
  const [ location, setLocation ] = useState("");
  
  /* arreglos para almacenar listas */
  const [ provinces, setProvinces] = useState([]);
  const [ departments, setDepartments ] = useState([]);
  const [ locations, setLocations ] = useState([]);

  const NameInput = useRef();
  let method = "POST";
  let url = "/containers/";
  let redirect = "/";
  

  /* traigo la lista de todas las provincias de la BD y lo almaceno en el arreglo provinces */
  const getProvinces = async (e) => {
    try {

      const response = await sendRequest("GET", "", "/provinces");
      
      setProvinces( response.map( x => x.province_name ) );
      setDepartments([]);
      console.log("la localizacion ---> ", locations)
      setLocations([]);
      console.log("la localizacion ---> ", locations)
      console.log("---------  "+e.target.value+ "   --  "+province+department+location)

    } catch (error) {
      console.error("Error al obtener las opciones desde la API - Provinces", error);
    }
  };

  /* traingo la lista de todos lo departamentos de una determinada provincia y lo almaceno en el arreglo departments*/
  const getDepartments = async (e) => {
    try {
      const response = await sendRequest("POST", "", "/departments",{"province":province});

      // console.log(response)
      setDepartments( response.map( x => x.department_name ) );
      setLocations([]);
      console.log("-----depa----"+e.target.value+ "   --  "+province+department+location)
    } catch (error) {
      console.error("Error al obtener las opciones desde la API - Department", error);
    }
  };

  /* traigo la lista de todas las localidades de un determinado departamento y lo guardo en el arreglo locations*/
  const getLocations = async (e) => {
    try {
      const response = await sendRequest("POST", "", "/locations",{"department":department});

      // console.log(response)
      setLocations( response.map( x => x.location_name ) );
      console.log("-----location----   "+ e.target.value + "   --  "+province+department+location)
    } catch (error) {
      console.error("Error al obtener las opciones desde la API - Locations", error);
    }
  };

  useEffect(() => {
    NameInput.current.focus();
    // getProvinces;
    // getDepartment();
  }, []);

  const getDepartment = async () => {
    if (params.id != null) {
      const res = await sendRequest("GET", "", url + "/"   + params.id);
      setName(res.data.name);
    }
  };

   // Función para obtener las opciones desde la API
   const getOptionsType = async () => {
    try {
      console.log("options")
      const response = await sendRequest("GET", "", "/api/provinces"); // Reemplaza "/api/options" con la ruta de tu API
      setOptions(response.data); // Establece las opciones en el estado
    } catch (error) {
      console.error("Error al obtener las opciones desde la API", error);
    }
  };

  const save = async (e) => {
    let json2;
    e.preventDefault();
    if (params.id !== null) {
      method = "PUT";
      url = "/containers/" + params.id;
      redirect = "/";
    }
    json2 = {
      longitude: longitude,
      latitude: latitude,
      street_description: street_description,
      province: province,
      department: department,
      location: location,
      organization_name: "Eco Norte Reciclaje",
      container_type: "envases de plasticos, metalicos",
    };

    // const res = await sendRequest( method, params.id ,  url, {
    //      longitude:longitude, latitude: latitude, street_description: street_description } , redirect);
    const res = await sendRequest(method, params.id, url, json2, redirect);
  
    if (method == "POST" && res.status == true) {
      setName("");
    }
  };

  const getProvince = async () => {
    if (params.id != null) {
      const res = await sendRequest("GET", "", url + "/"   + params.id);
      setName(res.data.name);
    }
  };

  return (
    <div className="continer-fluid">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <div className="card border border-success">
            <div className="card-header bg-success border border-success text-white">
              {params.title}
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                <DivInput
                  type="text"
                  icon="fa-sharp fa-solid fa-map-location-dot"
                  value={longitude}
                  className="form-control"
                  placeholder="longitude"
                  required=""
                  ref={NameInput}
                  handleChange={(e) => setLongitude(e.target.value)}
                />

                <DivInput
                  type="text"
                  icon="fa-sharp fa-solid fa-map-location-dot"
                  value={latitude}
                  className="form-control"
                  placeholder="latitude"
                  required=""
                  ref={NameInput}
                  handleChange={(e) => setLatitude(e.target.value)}
                />

                <DivInput
                  type="text"
                  icon="fa-sharp fa-solid fa-road"
                  value={street_description}
                  className="form-control"
                  placeholder="Direccion"
                  required=""
                  ref={NameInput}
                  handleChange={(e) => setStreet_description(e.target.value)}
                />

                {/*                provinces               */}
                <DivSelect
                  icon="fa-sharp fa-solid fa-map-location-dot"
                  name="province"
                  id="province"
                  value={ province }
                  className="form-control"
                  required=""
                  ref={NameInput}
                  load = { getProvinces  }
                  handleChange = { (e) => e.target.value !== "seleccione una opcion" ? setProvince(e.target.value) :"" }

                  options= { provinces }
                />

                {/*                departments               */}
                <DivSelect
                  icon="fa-sharp fa-solid fa-map-location-dot"
                  name="department"
                  id="department"
                  value={ department }
                  className="form-control"
                  required=""
                  ref={NameInput}
                  load = { getDepartments }
                  handleChange = { (e) => e.target.value !== "seleccione una opcion" ? setDepartment(e.target.value) :"" }
                  options= { departments }
                />

                {/*                locations               */}
                <DivSelect
                  icon="fa-sharp fa-solid fa-map-location-dot"
                  name="location"
                  id="location"
                  value={ location }
                  className="form-control"
                  required=""
                  ref={NameInput}
                  load = { getLocations }
                  // handleChange = { (e) => setLocation(e.target.value) }
                  handleChange = { (e) => e.target.value !== "seleccione una opcion" ? setLocation(e.target.value) :"" }
                  options= { locations }
                />

                <div className="d-grid col-10 mx-auto">
                  <button className="btn btn-success">
                    <i className="fa-solid fa-save"></i>
                    GUARDAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
