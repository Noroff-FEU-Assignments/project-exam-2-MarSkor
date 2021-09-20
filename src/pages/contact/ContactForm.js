import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../constants/apiUrl";
import { useHistory } from "react-router";
import { ErrorMessage } from '@hookform/error-message';
import {FaExclamationTriangle} from "react-icons/fa";

const schemaValidation = yup.object().shape({
    first_name: yup.string().required("Please enter a name").min(1, "Name must be at least 3 characters"),
    last_name: yup.string().required("Please enter a name").min(1, "Name must be at least 3 characters"),
    email_address: yup.string().email("Please enter a valid email address").required("Need a valid email address. Example 'name@hotmail.com"),
    message: yup.string().required("Please enter a message").min(1),
});

function ContactForm(){

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schemaValidation),
    });


    const contactUsUrl = BASE_URL + "contactuses";

    const history = useHistory();

    
    async function onSubmit(data){
        setSubmitting(true);
        setError(null);
        console.log(data)

        try{
            const response = await axios.post(contactUsUrl, data)
            console.log("response", response.data);
            history.push("/confirmation")
        }catch(error){
            console.log("error", error);
            setError(error.toString());
        }finally{
            setSubmitting(false);
        }
    }

    return(
        <section className="contactForm form-center">

            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {error && <ErrorMessage>Failed to send form: {error}</ErrorMessage>}
                <fieldset disabled={submitting}>
                    <Row>
                        <Col md>
                            <Form.Group>
                                <Form.Label className="label-light">First Name</Form.Label>
                                <Form.Control {...register("first_name")} placeholder="First name..." className="contactForm__inputtext"/>
                                <ErrorMessage errors={errors} name="first_name" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                            </Form.Group>
                        </Col>

                        <Col md>
                            <Form.Group>
                                <Form.Label className="label-light">Last Name</Form.Label>
                                <Form.Control {...register("last_name")} placeholder="Last name..." className="contactForm__inputtext"/>
                                <ErrorMessage errors={errors} name="last_name" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label className="label-light">Email Address</Form.Label>
                        <Form.Control {...register("email_address")} type="email" className="contactForm__inputtext" placeholder="name@hotmail.com" />
                        <ErrorMessage errors={errors} name="email_address" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="label-light">Message</Form.Label>
                            <div label="message">
                                <Form.Control  {...register("message")}
                                as="textarea" className="contactForm__inputtext"
                                placeholder="Leave your message here"
                                style={{ height: '100px' }}/>
                                <ErrorMessage errors={errors} name="message" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                            </div>
                    </Form.Group>
                    
                    <div className="btn-center">
                        <button type="submit" className="contactForm__submitBtn">
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
               

                </fieldset>
               
            </Form>

        </section>
    )
}
export default ContactForm