import AdminNav from "../AdminNav";
import ContactMessages from "./ContactMessages";
import Heading from "../../../components/layout/Heading";
import Container from "react-bootstrap/Container";

function ContactMessagesPage(){
    return(
        <>
        <AdminNav/>
            <Container className="messages__full-container">
                <section className="admin-section">
                    <Heading size="1" content="Messages" />
                </section>
                
                <ContactMessages/>
            </Container>
        </>

    )
}
export default ContactMessagesPage;