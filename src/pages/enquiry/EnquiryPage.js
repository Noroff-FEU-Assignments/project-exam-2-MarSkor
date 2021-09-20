import React from "react";
import Heading from "../../components/layout/Heading";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import BookingForm from "./BookingForm";

function EnquiryPage(){
    return(
        <>
        <div className="bookingTopPage topPage">
            <Container >
                <section className="bookingTopPage__wrap" >
                    <Heading size="1" content="Book a place to stay"/>
                    <p>Accommodations are found <Link className="link-secondary booking-link" to="/establishments" target="_blank" rel="noopener noreferrer">here</Link></p>
                </section>
            </Container>
        </div>

        <Container className="bookingForm">
            <BookingForm/>
        </Container>
       </> 
    )
}

export default EnquiryPage