import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../constants/apiUrl";
import { ErrorMessage } from '@hookform/error-message';
import {FaExclamationTriangle} from "react-icons/fa";
import Heading from "../../components/layout/Heading";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schemaValidation = yup.object().shape({
    name_of_establishment:yup.string()
        .required("Please select an accommodation"),
    first_name: yup.string()
        .required("Please enter a name").min(1, "Name must be at least 3 characters"),
    last_name: yup.string()
        .required("Please enter a name").min(1, "Name must be at least 3 characters"),
    phone_number: yup.string()
        .required("Please enter your phone number")
        .matches(phoneRegExp, "Invalid phone number")
        .max(8, "Phone number can't be longer than 8 digit "),
    email: yup.string().email("Please enter a valid email address")
        .required("Need a valid email address. Example 'name@hotmail.com"),
    additional_comment: yup.string(),
    number_of_guests: yup.number()
        .typeError("Please select a number of guests")
        .min(0, 'Min value 0.'),
    arrival: yup.date()
        .nullable().transform((curr, orig) => orig === '' ? null : curr)
        .required('Please select the date of your arrival'),
    departure: yup.date()
        .nullable().transform((curr, orig) => orig === '' ? null : curr)
        .required("Please select the date of your departure")
        .min(yup.ref('arrival'),
        "Departure can't be before arrival date"
    )
});


function BookingForm(){
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [accommodation, setAccommodation] = useState([]);
    const [accommodationError, setAccommodationError]  = useState(null);
    const [loading, setLoading] = useState(true);


    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schemaValidation),
    });

    const history = useHistory();

    //fetching accommodation list for the select options
    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch(BASE_URL + "establishments");
                if(response.ok){
                    const json = await response.json();
                    setAccommodation(json)
                }else{
                    setAccommodationError("An error occured");
                }
            }catch(error){
                setAccommodationError(error.toString());
            }finally{
                setLoading(false);
            }
        }
        getData();
    }, []);

    if(loading){
        return <Loading/>
    }

     if(error){
        return <ErrorMessage message={`The Error: ${accommodationError}`}/>
    }

    const enquiriesUrl = BASE_URL + "enquiries";
  

    //post request to the strapi and pushing to confirmation page
    async function onSubmit(data){
        setSubmitting(true);
        setError(null);
        // console.log(data)

        try{
            const response = await axios.post(enquiriesUrl, data)
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
        <section className="bookingForm__wrap form-center">

        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {error && <ErrorMessage>Failed to send form: {error}</ErrorMessage>}
            <fieldset disabled={submitting}>

             <Heading size="3" content="Accommodations Details"/>
             <Row>
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Arrival date</Form.Label>
                            <Form.Control type="date" {...register("arrival")} placeholder=""/>
                            <ErrorMessage errors={errors} name="arrival" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Departure date</Form.Label>
                            <Form.Control type="date" {...register("departure")} placeholder=""/>
                            <ErrorMessage errors={errors} name="departure" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col> 
                </Row>

                <Row className="pd-bottom">
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Accommodation</Form.Label>
                            <Form.Control as="select" {...register("name_of_establishment")} name="name_of_establishment"  defaultValue="Select accommodation">
                                <option value={""}>Select accommodation</option>
                                    {accommodation.map((accommodation)=>{
                                        return(
                                            <option className="option-color" key={accommodation.id} value={accommodation.name}>
                                                {accommodation.name}
                                            </option>
                                        )
                                    })}
                            </Form.Control>
                            <ErrorMessage errors={errors} name="name_of_establishment" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                            
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Number of guests</Form.Label>
                            <Form.Control as="select" {...register("number_of_guests")} name="number_of_guests" >
									<option value="default">Select number of guests</option>
									<option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
							</Form.Control>
                         
                            <ErrorMessage errors={errors} name="number_of_guests" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col>
                </Row>

                
                <Heading size="3" content="Guest Details" />
                <Row>
                    
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">First Name</Form.Label>
                            <Form.Control {...register("first_name")} placeholder="First name..."/>
                            <ErrorMessage errors={errors} name="first_name" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Last Name</Form.Label>
                            <Form.Control {...register("last_name")} placeholder="Last name..."/>
                            <ErrorMessage errors={errors} name="last_name" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col> 
                </Row>

                <Row>
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Email Address</Form.Label>
                            <Form.Control {...register("email")} type="email" placeholder="name@hotmail.com" />
                            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group>
                            <Form.Label className="bookingForm__label-dark">Phone</Form.Label>
                                <Form.Control {...register("phone_number")}  placeholder="e.g. 12345678" />
                                <ErrorMessage errors={errors} name="phone_number" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </Form.Group>
                    </Col>

                </Row>

                <Form.Group>
                    <Form.Label className="bookingForm__label-dark">Message (optional)</Form.Label>
                        <div label="message">
                            <Form.Control  {...register("additional_comment")}
                            as="textarea"
                            placeholder="Leave a message here"
                            style={{ height: '100px' }}/>
                            <ErrorMessage errors={errors} name="additional_comment" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" /> {message}</p>}  />
                        </div>
                </Form.Group>
                
                <div className="bookingForm__btnBookNowContainer">
                    <p>*Payment happens on arrival</p>
                    <button type="submit" className="bookingForm__bookBtn" >
                        {submitting ? "Booking" : "Book Now"}
                    </button>
                </div>
           

            </fieldset>
           
        </Form>

    </section>
    )
}

export default BookingForm;


BookingForm.propTypes = {
    register: PropTypes.func,
}
BookingForm.defaultProps = {
    register: () => {},
}