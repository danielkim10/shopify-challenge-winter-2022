import React, { useState, useEffect } from 'react';
import ImageCard from './image-card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import AndroidIcon from '@material-ui/icons/Android';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';

import './main.css';

const Main = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        
        const fetchData = async () => {
            try {
                let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${process.env.REACT_APP_NASA_KEY}`);
                let data = await response.json();
                setImages(data.photos.slice(0, 10));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [props])

    const createImageCards = () => {
        let imageCards = [];
        for (let i of images) {
            imageCards.push(<ImageCard key={i.id} id={i.id} earth_date={i.earth_date} image={i.img_src} rover={i.rover.name} camera={i.camera.full_name}/>);
        }

        return imageCards;
        // {"id":102693,
        // "sol":1000,
        // "camera":{
        //     "id":20,
        //     "name":"FHAZ",
        //     "rover_id":5,
        //     "full_name":"Front Hazard Avoidance Camera"
        // },
        // "img_src":"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
        // "earth_date":"2015-05-30",
        // "rover":{
        //     "id":5,
        //     "name":"Curiosity",
        //     "landing_date":"2012-08-06",
        //     "launch_date":"2011-11-26",
        //     "status":"active"
        // }}
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return(
        <div>
            <Navbar fixed="top">
                <Container>
                    <Navbar.Brand href="/" className='left'>
                        <AndroidIcon className='navbar-icons'/>
                        SPACESTAGRAM
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <GitHubIcon className='navbar-icons right github' onClick={() => window.open("https://github.com/danielkim10", '_blank')}/>
                        <HelpOutlineIcon className='navbar-icons right' onClick={() => setShowModal(true)}/>
                        <SearchIcon className='navbar-icons right'/>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className='page-grid'>
                <div></div>
                <div className='grid'>
                    <Modal show={showModal} onHide={handleClose} className='help' dialogClassName='modal-90w'>
                        <Modal.Header closeButton>
                            <Modal.Title>About SPACESTAGRAM</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            SPACESTAGRAM may look like an image sharing application, but in reality it stands for Save People from Alien Colonies Everywhere, Stop The Alien Governance, Rebel Against Martians.
                            The images are from NASA's Mars Rover Photos API. Your task is to inspect the photos provided and if the photo shows evidence of alien existence, click on the Android icon to mark (like) it.                            
                            You can click on the Android icon again to unmark (unlike) a photo if you think there is no alien evidence.
                            You can also customize the photos that show in the feed based on the rover and the Earth date. Scroll down continuously to view more photos.
                            Finally, the share button will copy the respective photo's URL to your clipboard.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>Sounds Good</Button>
                        </Modal.Footer>
                    </Modal>
                    {createImageCards()}
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Main;