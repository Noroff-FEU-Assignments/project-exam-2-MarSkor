import React from "react";
import Container from "react-bootstrap/Container";
import Heading from "../../components/layout/Heading";
import {Link} from "react-router-dom"
function HomePage(){
    return(
        <>
            <div className="hero__landingpage hero__home">
              
                <Container className="landingpage-home">
                    <section className="landingpage-home__wrap ">
                        <div className="hero-content">
                            <Heading size="1" content="Book your holidays with Holidaze"/>
                            <p>Hotels, B&Bs and guesthouses in Bergen</p>
                            <Link className="landingpage-home__btn primary-btn btn-book-now" to="/booking">Book now</Link>
                        </div>
                    </section>
                </Container>  
            </div> 
        </>
    )
}

export default HomePage