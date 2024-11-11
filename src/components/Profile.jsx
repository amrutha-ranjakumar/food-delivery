import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import profilePic from '../images/profile3.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Profile() { 
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNavigation = (path) => {
        if (path === '/logout') {
            setUser(null);
            sessionStorage.removeItem("existinguser");
            sessionStorage.removeItem("token");
            navigate('/login');
        } else {
            navigate(path);
        }
        handleClose();
    };

    return (
        <div>
            <div onClick={handleShow}>
                <img src={profilePic} alt="Profile Icon" width="40px" className="ms-4" 
                     style={{ cursor: 'pointer', borderRadius: '50%' }} />
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #ff9900, #5bc0be)' }}>
                    <Modal.Title style={{ fontSize: '2.1rem', fontWeight: 'bold', color: '#333' }}>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', backgroundColor: '#f0f2f5', padding: '35px' }}>
                    <img src={profilePic} alt="Profile" width="80px" className="rounded-circle mb-3" />

                    <div 
                        style={{
                            display: 'grid',
                            gap: '15px',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto',
                            maxWidth: '450px'
                        }}
                    >
                        {[
                            { label: 'Orders', icon: 'fa-box', bgColor: '#fff4f4', color: '#ff5722', path: '/myorder' },
                            { label: 'Favorites', icon: 'fa-heart', bgColor: '#f2f5ff', color: '#5a5dff', path: '/wishlist' },
                            { label: 'Addresses', icon: 'fa-location-dot', bgColor: '#e7f5ff', color: '#17a2b8' },
                            { label: 'Payments', icon: 'fa-wallet', bgColor: '#fdfdfd', color: '#6c757d' },
                            { label: 'Support', icon: 'fa-headset', bgColor: '#e5ffe5', color: '#28a745' },
                            { label: 'Logout', icon: 'fa-right-from-bracket', bgColor: '#fff1f1', color: '#e63946', path: '/' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleNavigation(item.path)}
                                style={{
                                    backgroundColor: item.bgColor,
                                    color: item.color,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '15px',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
                                }}
                            >
                                <i className={`fa-solid ${item.icon}`} 
                                   style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
                                <p style={{ margin: 0, fontWeight: '500', fontSize: '0.9rem' }}>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Profile;
