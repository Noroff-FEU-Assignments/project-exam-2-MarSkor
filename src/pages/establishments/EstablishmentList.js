import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { BASE_URL } from "../../constants/apiUrl";
import EstablishmentCard from "./EstablishmentCard";
import ImageNotFound from "../../assets/image-not-found.jpg"
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/Error";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Heading from "../../components/layout/Heading";
import Container from "react-bootstrap/Container";
import ListGroup  from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";


function EstablishmentList(){
    const [establishments, setEstablishments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            try{
                const response = await fetch(BASE_URL + "establishments")
                if(response.ok){
                    const json = await response.json();
                    // console.log(json);
                    setEstablishments(json)
                } else{
                    setError("An error occured");
                }
            } catch(error){
                setError(error.toString());
            } finally{
                setLoading(false);
            }
        }
        fetchData();

    }, [])

    if(loading){
        return <Container><div>Loading establishments. This could take a while... <Loading/></div></Container>
    }

     if(error){
        return <ErrorMessage message={`The Error: ${error}`}/>
    }

    if(!establishments.length){
        return <div className="empty-array">No establishments to display</div>
    };

    //filtering establishments 
    //- help from https://www.youtube.com/watch?v=Q2aky3eeO40
    const onChangeSearchHandler = (searchInput) =>{
        let matches = []
        if(searchInput.length > 0){
            matches = establishments.filter(establishment => {
                const regex = new RegExp(`${searchInput}`, "gi");
                return establishment.name.match(regex)
            })
        }
        
        // console.log("matches", matches)
        setSuggestions(matches)
        setSearchInput(searchInput)
    }

    return(
        <>
        <div className="estaTopPage">
            <Container>
                <Row>
                    <Col>
                        <section className="estaTopPage__wrap" >
                            <Heading size="1" content="Explore establishments"/>
                            <p>Explore different establishments in Bergen like hotels, b&b and guesthouses</p>
                        </section>
                    </Col>

                    <Col className="estaTopPage__col">
                        <section className="estaTopPage__searchbar">
                            <Form.Group className="estaTopPage__form-group">
                                <Form.Control className="estaTopPage__searchInput" type="text" placeholder="Search establishments..." onChange={e => onChangeSearchHandler(e.target.value)} value={searchInput} 
                                onBlur={() =>{
                                    setTimeout(()=> {
                                        setSuggestions([])
                                    }, 100)
                                }}/>

                                {suggestions && suggestions.map((suggestion, i) =>
                                    <ListGroup className="estaTopPage__list-group" key={i}>
                                        <ListGroup.Item className="estaTopPage__list-group-item" >
                                            <Link to={`details/${suggestion.id}`}>
                                                {suggestion.name}
                                            </Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                )}
                            </Form.Group>
                        </section> 
                    </Col>

                </Row>
            </Container>
        </div>
        
        <Container className="estaTopPageList container-fluid">
            <section className="estaCard-container">
                {establishments.map(function(establishment){
                    const {id, name, image, price_per_night} = establishment;
                    return <EstablishmentCard 
                    key={id} 
                    id={id} 
                    name={name} 
                    image={image?.url || ImageNotFound}
                    price_per_night={price_per_night} /> 
                })}
                    
            </section>
        </Container>
        </>
    )
}

export default EstablishmentList


