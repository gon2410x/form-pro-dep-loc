import React from 'react'
import { useParams } from 'react-router-dom';
import FormContainer from '../../Components/FormContainer';


const Edit = () => {
  const {id} = useParams();
  return (
    <FormContainer id={id} title='Edit Container'></FormContainer>
  )
}

export default Edit;