import CreateEstablishment from "./AddEstablishment";
import Container from "react-bootstrap/Container";
import AdminNav from "../AdminNav";
import Heading from "../../../components/layout/Heading";


export default function CreateEstablishmentPage(){


    
    return(
        <>
        <AdminNav/>
        <Container>
            <section className="admin-section">
                <Heading size="1" content="Create an Establishment"/>
            </section>
            <CreateEstablishment/>
        </Container>
        </>
    )
}