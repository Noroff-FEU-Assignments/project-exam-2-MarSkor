import React from "react";
import Container from "react-bootstrap/Container";
import Heading from "../../components/layout/Heading";
import LoginForm from "./LoginForm";

function LoginPage(){
    return(
        <div className="hero__landingpage hero__login ">
            <Container className="landingpage content-center">
                <div className="loginForm__wrap form-center">
                    <Heading size="2" content="Login Admin"/>
                    <LoginForm/>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage