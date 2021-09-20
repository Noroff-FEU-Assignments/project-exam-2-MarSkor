import { Link } from "react-router-dom"
import  Container  from "react-bootstrap/Container";
import {FaArrowLeft, FaCheckSquare} from "react-icons/fa";
export default function Confirmation(){
    return(
        <div className="hero__landingpage confirmationpage">
             <Container >
                <section className="confirmation__wrap">
                    <div className="confirmation__text-center">
                        <h3>The form has successfully been submitted!  <FaCheckSquare className="confirmation__iconCheck iconConfirmation"/> </h3>
                        <p>We'll be in touch as soon as possible!</p>
                        <Link className="link-secondary"  to="/"><FaArrowLeft className="confirmation__iconArrow iconConfirmation" />Return home</Link>
                    </div>
                </section>
            </Container>
        </div>
       
    )
}