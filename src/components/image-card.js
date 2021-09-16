import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AndroidIcon from '@material-ui/icons/Android';
import ShareIcon from '@material-ui/icons/Share';

import './image-card.css';

const ImageCard = (props) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {

    }, [props])
    
    const changeLike = () => {
        setLiked(!liked)
    }

    return (
        <div className='card-alignment'>
            <Card>
                <Card.Title><strong>{props.rover} Rover {props.id}</strong></Card.Title>
                <Card.Img variant="top" src={props.image}/>
                <Card.Body>
                    <Card.Text>
                        {props.camera}
                        <br/>
                        Earth Date: {props.earth_date}
                    </Card.Text>
                    <div title={liked ? "I Do Not Spy an Alien" : "I Spy an Alien"}>
                        <AndroidIcon className={liked ? "like-button liked": "like-button not-liked"} onClick={changeLike}/>
                        <ShareIcon className='share-button'/>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ImageCard;