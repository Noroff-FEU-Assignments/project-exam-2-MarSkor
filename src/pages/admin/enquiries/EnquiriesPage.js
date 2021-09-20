import AdminNav from "../AdminNav";
import EnquiriesList from "./Enquiries";
import Heading from "../../../components/layout/Heading";
import Container from "react-bootstrap/Container";

function EnquiriesPage(){
    return(
        <>
            <AdminNav/>
            <Container className="enquiry__full-container">
                <section className="admin-section">
                    <Heading size="1" content="Enquiries" />
                </section>
                <EnquiriesList/>
            </Container>
        </>

    )
}
export default EnquiriesPage;