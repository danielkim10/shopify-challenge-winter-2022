import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import AndroidIcon from '@material-ui/icons/Android';
import ShareIcon from '@material-ui/icons/Share';

import './image-card.css';

const ImageCard = (props) => {
    const [liked, setLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    useEffect(() => {

    }, [props])
    
    const changeLike = () => {
        if (liked) {
            setLiked(false);
            props.setTotalLikes(-1);
        }
        else {
            setLiked(true);
            props.setTotalLikes(1);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.image);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    return (
        <div className='card-alignment'>
            <Card>
                <Card.Title><strong>{props.rover} Rover {props.id}</strong></Card.Title>
                <Card.Img variant="top" src={props.image} loading="lazy"/>
                <Card.Body>
                    <Card.Text>
                        {props.camera}
                        <br/>
                        Earth Date: {props.earth_date}
                    </Card.Text>
                    <div title={liked ? "I Do Not Spy an Alien" : "I Spy an Alien"}>
                        <AndroidIcon className={liked ? "like-button liked": "like-button not-liked"} onClick={changeLike}/>
                    </div>
                    
                    <div title="Share">
                        <ShareIcon className='share-button' onClick={copyToClipboard}/>
                        {copied && 'URL Copied!'}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ImageCard;