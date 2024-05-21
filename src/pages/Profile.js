import React, { useContext, useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Background from './Background';
import ResetPassword from '../components/ResetPassword';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.user._id !== 'undefined') {
                    setDetails(data.user);
                } else if (data.error === 'User not found') {
                    Swal.fire({
                        title: 'User not found',
                        icon: 'error',
                        text: 'Something went wrong, kindly contact us for assistance.'
                    });
                } else {
                    Swal.fire({
                        title: 'Something went wrong',
                        icon: 'error',
                        text: 'Something went wrong, kindly contact us for assistance.'
                    });
                }
            });
    }, []);

    return (
        <>
            {user.id === null ? (
                <Navigate to="/products" />
            ) : (
                <Background imageUrl="/images/BG-01.png">
                    <div className="Profile">
                        <Card style={{ width: '50rem', height: 'auto' }} className="ProfileCard">
                            <div className="center-image">
                                <Image className="ProfileLogo" src="/images/logo-01.png" />
                            </div>
                            <div>
                                <h1 className="ProfileTitle">Welcome to Your Profile</h1>
                                <h2 className="ProfileDetails">{`${details.firstName} ${details.lastName}`}</h2>
                                <div className="ProfileInfo">
                                    <h4>CONTACT INFORMATION</h4>
                                    <div>
                                        <ul>
                                            <Image className="ProfileIcon" src="/images/email.png" /> {details.email} |{' '}
                                            <Image className="ProfileIcon" src="/images/phone.png" /> {details.mobileNo}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr className="ProfileDivider" />
                            <div>
                                <ResetPassword />
                            </div>
                        </Card>
                    </div>
                </Background>
            )}
        </>
    );
}