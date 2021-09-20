import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EstablishmentCard({id, name, image, price_per_night}){

    return(
            <div className="estaCard__wrap">
              
                <Card className=" mb-3 estaCard__bg" >
                    <Row className=" g-0" >

                        <Col md={4} className="estaCard__col">
                            <Card.Img src={image} className="estaCard__image" alt={name}/>
                        </Col>

                        <Col md={8} className="estaCard__col">
                            <Card.Body className="card-body">
                                <Card.Title className="estaCard__title fontDark">{name}</Card.Title>
                                <Card.Text className="estaCard__price alignRight ">{price_per_night}NOK</Card.Text>
                                <Card.Text className="estaCard__small-text alignRight">per night</Card.Text>
                                <div className="alignRight estaCard__button-container ">
                                    <Link to={`details/${id}`}>
                                        <Button variant="secondary" >More info</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>

   
    )

}

EstablishmentCard.propTypes = {
    id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
    price_per_night: PropTypes.string.isRequired,

}

export default EstablishmentCard;

