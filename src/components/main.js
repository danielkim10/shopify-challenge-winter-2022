import React, { useState, useEffect } from 'react';
import ImageCard from './image-card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Filters from './filters';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';

import AndroidIcon from '@material-ui/icons/Android';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';

import './main.css';
import 'react-datepicker/dist/react-datepicker.css';

const Main = (props) => {
    const [loading, setLoading] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [images, setImages] = useState([]);
    const [showHelp, setShowHelp] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [rover, setRover] = useState('curiosity');
    const [totalLikes, setTotalLikes] = useState(0);
    const [page, setPage] = useState(1);
    const [earthDate, setEarthDate] = useState(new Date());

    useEffect(() => {
        setLoading(true);
        let today = new Date()
        let dateParse = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()-1}`;
        fetchData(rover, dateParse, page);
    }, [props, page, rover])

    const fetchData = async (rov, dateParse, p) => {
        try {
            let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?earth_date=${dateParse}&page=${p}&api_key=${process.env.REACT_APP_NASA_KEY}`);
            let data = await response.json();
            setImages(data.photos);
            setAllImages(data.photos);
            setEarthDate(new Date(dateParse));
            setPage(p);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getNextPage = async (rov, dateParse, p) => {
        try {
            let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?earth_date=${dateParse}&page=${p}&api_key=${process.env.REACT_APP_NASA_KEY}`);
            let data = await response.json();
            if (data.photos) {
                setImages(data.photos);
                setAllImages(allImages.concat(data.photos));
                setPage(p);
            }
            else {

            }
        } catch (error) {
            console.log(error);
        }
    }

    const date_parse = (date) => {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    const createImageCards = () => {
        let imageCards = [];
        if (!allImages.length) {
            return (
                <></>
            );
        }
        for (let i of allImages) {
            imageCards.push(<ImageCard key={i.id} id={i.id} earth_date={i.earth_date} image={i.img_src} rover={i.rover.name} camera={i.camera.full_name} setTotalLikes={changeTotalLikes}/>);
        }
        imageCards.push(
            <div className='card-alignment'>
                <Button variant="primary load-next-card" onClick={() => getNextPage(rover, date_parse(earthDate), page+1)} disabled={!images.length}>{images.length ? 'Load next page' : 'No more pictures'}</Button>
            </div>
        );
        return imageCards;
    }

    const handleClose = () => {
        setShowHelp(false);
        setShowFilter(false);
    }

    const filter = async (rov, date) => {
        let dateParse = date_parse(date);
        setShowFilter(false);
        setLoading(true);
        setRover(rov);
        setPage(1);
        fetchData(rov, dateParse, 1)
    }

    const changeTotalLikes = (count) => {
        setTotalLikes(totalLikes + count);
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
                        <div title="View this app on GitHub">
                            <GitHubIcon className='navbar-icons right github' onClick={() => window.open("https://github.com/danielkim10/shopify-challenge-winter-2022", '_blank')}/>
                        </div>
                        <div title="Help">
                            <HelpOutlineIcon className='navbar-icons right' onClick={() => setShowHelp(true)}/>
                        </div>
                        <div title="Filter">
                            <SearchIcon className='navbar-icons right' onClick={() => setShowFilter(true)}/>
                        </div>
                        <div title="Total Likes">
                            <AndroidIcon className='navbar-icons right like-count'/>
                            <p className='right like-count'>{totalLikes}</p>
                        </div>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className='page-grid'>
                <div></div>
                {!allImages.length && !loading && <Alert key='no-photos' variant='warning'>{`Could not find more photos from rover ${rover.toUpperCase()} on ${date_parse(earthDate)}`}</Alert>}
                {loading && <Alert key='loading' variant='primary'>Loading...</Alert>}
                <div className='grid'>
                    <Modal show={showHelp} onHide={handleClose} className='help' dialogClassName='modal-size'>
                        <Modal.Header closeButton>
                            <Modal.Title>About SPACESTAGRAM</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='help-text'>SPACESTAGRAM may look like an image sharing application but in reality, it stands for Save People from Alien Colonies Everywhere, Stop The Alien Governance, Rebel Against Martians.
                                <br/><br/>The images are from NASA's Mars Rover Photos API. 
                                <br/><br/>Your task is to inspect the photos provided and if the photo shows evidence of alien existence, click on the Android icon to mark (like) it. 
                                <br/><br/>You can click on the Android icon again to unmark (unlike) a photo if you think there is no alien evidence. 
                                <br/><br/>You can also customize the photos that show in the feed based on the rover and the Earth date. 
                                <br/><br/>Up to 25 photos are loaded at a time. Scroll down to load and view more photos. 
                                <br/><br/>The share button will copy the respective photo's URL to your clipboard.
                                <br/><br/>Finally, despite the alien theme, this is a serious application. This is my approach to distinguishing myself from other candidates.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>Sounds Good</Button>
                        </Modal.Footer>
                    </Modal>
                    {showFilter && <Filters showFilter={showFilter} rover={rover} earthDate={earthDate} handleClose={handleClose} filter={filter}/>}
                    {!loading && createImageCards()}
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Main;