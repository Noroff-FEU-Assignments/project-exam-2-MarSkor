import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { ErrorMessage } from '@hookform/error-message';
import {BASE_URL, TOKEN_PATH} from "../../constants/apiUrl";
import AuthContext from "../../contexts/AuthContext";
import FormError from "../../components/common/FormError";
import {FaExclamationTriangle, FaEye} from "react-icons/fa";


const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
    identifier: yup.string().required("Please enter your email or username"),
	password: yup.string().required("Please enter your password"),
});



function LoginForm(){
    const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [auth, setAuth] = useContext(AuthContext);

    async function onSubmit(data){
        setSubmitting(true);
        setLoginError(null);
    
        try{
            const response = await axios.post(url, data);
            setAuth(response.data);
            history.push("/admin");
        }catch(error){
            setLoginError("Login failed, please try again");
        }finally{
            setSubmitting(false)
        }
    }

    const showPassword = () => {
        setPasswordVisible(passwordVisible ? false : true);
    };


    return(
        
        <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset  disabled={submitting}>
                <Form.Group>
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control {...register("identifier")} />
                    <ErrorMessage errors={errors} name="identifier" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" />{message}</p>}  />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <div className="wrapper-pass">
                    <Form.Control {...register("password")} type={passwordVisible ? "text" : "password"}  /><FaEye className="show-password" onClick={showPassword} />{""}
                    </div>
                    <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="errormsg"><FaExclamationTriangle className="exclamationTriangle" />{message}</p>}  />
                </Form.Group>

                <div className="btn-center">
                    <button type="submit" variant="primary" className="loginBtn">{submitting ? 'Logging in...' : 'Login'}</button>
                </div>
            </fieldset>
            {loginError && <FormError>{loginError}</FormError>}
 		</Form>
    )
}

export default LoginForm;