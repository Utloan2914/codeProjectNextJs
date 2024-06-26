'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button, Container, Row, Col, Card, CardBody, CardImg, Input, Form, Alert } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.email || !formData.password) {
            setError('Email và mật khẩu không được để trống.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Email không hợp lệ.');
            return;
        }

        const storedFormData = JSON.parse(localStorage.getItem('formData') || '{}');

        if (storedFormData && storedFormData.email === formData.email && storedFormData.password === formData.password) {
            const mockResponse = {
                id: 1,
                email: formData.email,
            };
            sessionStorage.setItem('loggedInUser', JSON.stringify(mockResponse));
            console.log('Login successful!', mockResponse);
            setSuccess('Đăng nhập thành công!');
            router.push("/productAPI");
        } else {
            setError('Email hoặc mật khẩu không đúng.');
        }
    };

    return (
        <Container fluid>
            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <CardBody>
                    <Row>
                        <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>
                            <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                                {error && <Alert color="danger">{error}</Alert>}
                                {success && <Alert color="success">{success}</Alert>}
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='email' name='email' placeholder='Email của bạn' value={formData.email} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='password' name='password' placeholder='Mật khẩu' value={formData.password} onChange={handleChange} />
                                </div>

                                <div className="flex flex-row items-center mb-4">
                                    <Link href="/register" className="text-blue-500 hover:text-red-600 no-underline">Đến trang đăng ký</Link>
                                </div>

                                <Button type="submit" className='mb-4' size='lg'>Đăng nhập</Button>
                            </Form>
                        </Col>

                        <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <CardImg src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Login;
