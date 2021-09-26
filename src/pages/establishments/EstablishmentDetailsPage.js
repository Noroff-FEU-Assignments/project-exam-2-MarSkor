import {useState, useEffect, useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import {BASE_URL} from "../../constants/apiUrl"
import { Link } from "react-router-dom";
import  Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Heading from "../../components/layout/Heading";
import {ImLocation} from "react-icons/im";
import {FaArrowLeft, FaInfo, FaPen} from "react-icons/fa";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/Error";
import ImageNotFound from "../../assets/image-not-found.jpg"
import DeleteEstablishment from "./DeleteEstablishment";
import AuthContext from "../../contexts/AuthContext";

function EstablishmentDetails(){

    const [establishment, setEstablishment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [auth, setAuth] = useContext(AuthContext);

    let history = useHistory();
    const {id} = useParams();
    if(!id){
        history.push("/");
    }
    const apiUrl = BASE_URL + "establishments"

    const url = apiUrl + "/" + id;

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch(url);
                if(response.ok){
                    const json = await response.json();
                    console.log(json)
                    setEstablishment(json);
                    
                } else{
                    setError("An error occured");
                }
            }catch(error){
                setError(error.toString());

            }finally{
                setLoading(false);
            }
        }fetchData();
    }, [url]
    );

    document.title = establishment?.name || "Holidaze" ;
    

    if(loading){
        return <Loading/>
    }

    if(error){
        return <ErrorMessage message={`The Error: ${error}`}/>
    }
   
    return(
        
        <Container className="detail__container">
            <div className="padding-bottom link-primary">
                <Link to="/establishments" ><FaArrowLeft className="icon-arrow"/>Return</Link>
            </div>

            <div className="headingDark detail__h1">
                <Heading size="1" content={establishment.name} />
            </div>
            
            
            
                <Row className="detail__content-wrap">
                    
                    <Col md={7} className="detail__image-container">
                        <Image className="detail__image" src={establishment.image?.url || ImageNotFound} alt={establishment.name} />
                    </Col>
                    
                    <Col md={5}  className="detail__content">
                        <div className="detail__wrapper">
                            <div className="detail__price">
                                <h2>{establishment.price_per_night} NOK </h2>
                                <p>price per night</p>
                            </div>

                            <div className="detail__iconContainer">
                                <FaInfo className="icon iconInfo detail__iconInfo "/>
                                <p className="detail__description">{establishment.description}</p>
                            </div>

                            <div className="detail__iconContainer">
                                <ImLocation className=" icon iconLocation  detail__iconLocation " /> {establishment.location || "Location unknown" }
                            </div>
                               
                        </div>

                        
                        
                    </Col>
                    
                    {auth && <div className="delete-btn__container">
                                    <DeleteEstablishment id={id}/> 
                            </div>
                    }
                    
                    
                </Row> 
            
        
        
           

        </Container>
    )
}
export default EstablishmentDetails