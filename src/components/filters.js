import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';

import './filters.css';

const Filters = (props) => {
    const [rover, setRover] = useState(props.rover);
    const [earthDate, setEarthDate] = useState(props.earthDate);

    const handleClose = () => {
        props.handleClose();
    }

    const filter = () => {
        props.filter(rover, new Date(earthDate));
    }

    return (
        <>
            <Modal show={props.showFilter} onHide={handleClose} className='help' dialogClassName='modal-size'>
                    <Modal.Header closeButton>
                        <Modal.Title>Filters</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <strong>Rover</strong>
                        <Form>
                            <div key="inline-radio">
                                <Form.Check inline label="Curiosity" type="radio" className="inline" id="inline-radio-1" name="group1" defaultChecked={rover === 'curiosity'} onClick={() => setRover('curiosity')}/>
                                <Form.Check inline label="Opportunity" type="radio" className="inline" id="inline-radio-2" name="group1" defaultChecked={rover === 'opportunity'} onClick={() => setRover('opportunity')}/>
                                <Form.Check inline label="Spirit" type="radio" className="inline" id="inline-radio-3" name="group1" defaultChecked={rover === 'spirit'} onClick={() => setRover('spirit')}/>
                            </div>
                        </Form>
                        <strong>Date</strong>
                        <DatePicker selected={earthDate} onChange={(date) => setEarthDate(date)}></DatePicker>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={filter}>Filter</Button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}

export default Filters;