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
                <Heading size="1" content="Welcome back Admin" />
            </section>
            <Heading size="3" content="As an admin you can do the following" />
            <ul className="admin-list">
                <li>Check & delete messages</li>
                <li>Check & delete enquiries</li>
                <li>Create a new establishment </li>
                    <ol className="admin-list__ol">
                        <li>And if you wish to delete an establishment, head to the specific one (details page) and delete there. </li>
                    </ol>
            </ul>
        </Container>
        </>
    )
}

export default AdminPage