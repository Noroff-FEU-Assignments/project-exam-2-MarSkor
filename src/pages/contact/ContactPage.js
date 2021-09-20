import React from "react";
import Container from "react-bootstrap/Container";
import ContactForm from "./ContactForm";
import Heading from "../../components/layout/Heading";

function ContactPage(){
    return(
        <div className=" contactPage__bg">
            <Container>
            {/* <Container className="pb"> */}
                <section className="contactPage">
                    <div className="contactPage__topContent">
                        <Heading size="1" content="Contact us"/>
                        <p>If you have any questions don't hesitate to let us know!</p>
                        <p>Fill out this form and we'll be in touch within 24 hours.</p>
                    </div>
                        
                    <ContactForm />
                </section>
           
            </Container>    

        </div>
     
    )
}

export default ContactPage