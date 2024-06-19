import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 

const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
                setUser(result.data.user);
                setLoading(false);
                setShow(true); // Show modal after data is fetched
            } catch (error) {
                console.error("Something went wrong fetching the user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleClose = () => setShow(false);
    const handleBack = () => {
        handleClose();
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return <div className="error">User not found</div>;
    }

    return (
        <>
            <Modal show={show} onHide={handleBack}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Full Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBack}>
                        Close
                    </Button>
                  
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default View;
