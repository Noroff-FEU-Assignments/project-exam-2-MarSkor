import React from "react";
import Container from "react-bootstrap/Container";
import AdminNav from "./AdminNav";
import Heading from "../../components/layout/Heading";


function AdminPage(){
    return(
        <>
        <AdminNav/>
            <Container>
                <section className="admin-section">
                    <div className="admin-section__mainpage">
                        <Heading size="1" content="Welcome back Admin" />
                    </div>   
                </section>
            </Container>
        </>
    )
}

export default AdminPage