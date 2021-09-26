import {useState} from "react";
import Collapse from 'react-bootstrap/Collapse'
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Heading from "../../../components/layout/Heading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {FaTrash} from "react-icons/fa";

function EnquiriesBox({id, arrival, departure, email, first_name, last_name, name_of_establishment, number_of_guests, phone_number, additional_comment, onRemove}){
    const [open, setOpen] = useState(false);



    return(
       
         <Col  md={12} className="enquiry__wrapper"> 

            <div className="enquiry__content box" key={id}>
                <section className="enquiry__top-content flex-wrap">
                    <div>
                        <Heading size="4" content={first_name}/>
                        <p>{email}</p>
                    </div>

                    <div className="enquiry__delete delete-icon-wrap"  title="delete item">
                        <FaTrash onClick={() => onRemove(id)} className="delete-icon"/>
                    </div>
                </section>
                
                <div className="alignRight">
                    <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="enquiry-details"
                    aria-expanded={open} className="enquiry__button"
                    >
                    Show All Details
                    </Button>
                </div>
                

                <Collapse in={open} >
                <div id="enquiry-details">
                    <Heading size="5" content="Accommodation details" />
                    <Row>
                        <Col sm={4}>
                            <p><strong>Arrival:</strong> {arrival}</p>
                            <p><strong>Departure:</strong> {departure}</p>
                        </Col>
                        <Col sm={8}>
                            <p><strong>Number of guests: </strong> {number_of_guests}</p> 
                            <p><strong>Accommodation:</strong> {name_of_establishment}</p>
                        </Col>
                    </Row>

                    <Heading size="5" content="Guest details" />
                    <Row >
                        <Col  sm={4}>
                            <p><strong>Full Name:</strong>{first_name} {last_name}</p>
                            <p><strong>Phone: </strong> {phone_number}</p> 
                        </Col >
                        <Col  sm={8}>
                            <p><strong>Email: </strong> {email}</p> 
                            <p><strong>Comment:</strong> {additional_comment || "Input was left empty" } </p>
                        </Col>
                    </Row>
                </div>
                </Collapse>
            </div>
        </Col>


    )
}

export default EnquiriesBox

EnquiriesBox.propTypes = {
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    name_of_establishment:PropTypes.string.isRequired,
    departure:PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
}