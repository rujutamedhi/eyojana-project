import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    username: 'MadhuraJangale',
    email: 'madhura@gmail.com',
    phoneNo: '9999999999',
    gender: 'female',
    state: 'Maharashtra',
    photo: 'https://via.placeholder.com/150'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Container className="profile-page">
      <Row className="justify-content-md-center">
        <Col md="4" className="text-center">
          <img src={user.photo} alt="User" className="profile-image rounded-circle" />
        </Col>
        <Col md="8">
          <h2 className="my-profile-title">My Profile</h2>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhoneNo">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNo"
                    value={user.phoneNo}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={user.state}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant={editMode ? "success" : "primary"} onClick={handleEdit}>
                {editMode ? 'Save' : 'Edit'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
