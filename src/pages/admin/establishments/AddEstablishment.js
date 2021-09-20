
import React from "react";
import { BASE_URL } from "../../../constants/apiUrl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import {Link} from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaExclamationTriangle, FaCheck} from "react-icons/fa";
import FormError from "../../../components/common/FormError";

// const FILE_SIZE = 200000;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const schemaValidation = yup.object().shape({
    description: yup.string()
        .required("Description is required"),
    image: yup.mixed().required("A file is required"),
    name:yup.string()
        .required("Establishment name is required"),
    price_per_night: yup.number()
        .typeError("Price is required")
        .required("Price is required"),
    location: yup.string()
        .required("Location is required")
});


export default function AddEstablishment(){
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [files,setFiles] = useState();
    const [success, setSuccess] = useState(false);


    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schemaValidation),
    });

    const http = useAxios();


    const handleFileInputChange = (event) =>{
        setFiles(event.target.files);  
    }

    async function onSubmit(data) {
		setSubmitting(true);
		setError(null);
        

        let formDataToSend= {
            name: data.name,
            price_per_night: data.price_per_night,
            description: data.description,
            location: data.location,
        }

        http.post(BASE_URL + "establishments", formDataToSend)
        .then(res =>{
            console.log(res.data)
            return res.data.id
        })
        .then(refId =>{
            const formData = new FormData();
            formData.append("files", files[0]);
            formData.append("refId", refId);
            formData.append("ref", "establishment");
            formData.append("field", "image");
            return http.post(BASE_URL + "upload", formData)
        })
        .then(res =>{
            console.log("success", res.data);
            setSuccess(true)
        })
        .catch(error =>{
            console.log(error)
            setError(error.toString());
        })
        .finally(()=>{
            setSubmitting(false);
        }) 
	}


    return(
        <section className="createestablishment__container">
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                
                    {error && 
                        <FormError>
                            <div className="error form-submit">
                                <p className="error__text"><FaExclamationTriangle className="error__icon"/> The form could not be sent - {error}</p>    
                            </div>
                        </FormError>
                    }
                
        
                    {success &&  
                        <div className="success form-submit">
                            <p className="success__text">Establishment was successfully created! 
                            View it at  <Link className="success__link" to="/establishments"> establishments</Link> <FaCheck className="success__icon"/> </p>
                        </div>  
                    }
           
                <fieldset disabled={submitting}>
                    <Row>
                        <Col md className="createestablishment__col">
                            <Form.Group>
                                <Form.Label className="createestablishment__label">Name of Establishment</Form.Label>
                                <Form.Control placeholder="Name..." {...register("name")} name="name"/>
                                <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  /> 
                            </Form.Group>
                        </Col>
                        <Col md className="createestablishment__col">
                            <Form.Group>
                                <Form.Label className="createestablishment__label">Price per night</Form.Label>
                                <Form.Control placeholder="1234" type="number" name="price_per_night" {...register("price_per_night")}/>
                                <ErrorMessage errors={errors} name="price_per_night" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  /> 
                            </Form.Group>
                        </Col>
                    </Row>
                
                    <Form.Group>
                        <Form.Label className="createestablishment__label">Location</Form.Label>
                        <Form.Control type="text" {...register("location")} />
                        <ErrorMessage errors={errors} name="location" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label className="createestablishment__label">Description</Form.Label>
                        <div label="message">
                            <Form.Control  {...register("description")}
                            name="description"
                            as="textarea"
                            placeholder="Accommodation description"
                            style={{ height: '150px' }}/>
                            <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formFile">
                        <Form.Label className="createestablishment__label">Image</Form.Label>
                        <Form.Control type="file" {...register("image")}  name="image" onChange={handleFileInputChange} size="lg"/>
                        <ErrorMessage errors={errors} name="image" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                    </Form.Group>

                    <div className="btn-center">
                        <button type="submit" className="contactForm__submitBtn">
                            {submitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                  
                </fieldset>
            </Form>

        </section>
    )
}