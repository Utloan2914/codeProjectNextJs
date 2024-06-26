'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Container, Row, Col, Card, CardBody, CardImg, Input, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    phone: string;
    address: string;
    subscribe: boolean;
    urlImage: string | null;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        address: '',
        subscribe: false,
        urlImage: null
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }

        const storedImageUrl = localStorage.getItem('urlImage');
        if (storedImageUrl) {
            setFormData(prevState => ({
                ...prevState,
                urlImage: storedImageUrl
            }));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: fieldValue
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Assuming you want to save the URL directly
            const imageUrl = URL.createObjectURL(file);

            setFormData(prevState => ({
                ...prevState,
                urlImage: imageUrl
            }));

            // Save imageUrl to localStorage
            localStorage.setItem('urlImage', imageUrl);
        }
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^[0-9]{10}$/.test(phone);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { name, email, password, repeatPassword, phone, address, urlImage } = formData;

        if (!name || !email || !password || !repeatPassword || !phone || !address) {
            setError('Tất cả các trường đều phải được điền.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email không hợp lệ.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (storedUsers.some((user: { email: string }) => user.email === email)) {
            setError('Email đã tồn tại. Vui lòng chọn email khác.');
            return;
        }

        if (password !== repeatPassword) {
            setError('Mật khẩu và mật khẩu xác nhận không khớp.');
            return;
        }

        if (!validatePhone(phone)) {
            setError('Số điện thoại không hợp lệ. Số điện thoại phải gồm 10 chữ số.');
            return;
        }

        const newUser = { name, email, password, phone, address, urlImage };
        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        setSuccess('Đăng ký thành công!');
        router.push("/login");
    };

    return (
        <Container fluid>
            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <CardBody>
                    <Row>
                        <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                            <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                                {error && <Alert color="danger">{error}</Alert>}
                                {success && <Alert color="success">{success}</Alert>}
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='text' name='name' placeholder='Tên của bạn' className='w-100' value={formData.name} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='email' name='email' placeholder='Email của bạn' value={formData.email} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='password' name='password' placeholder='Mật khẩu' value={formData.password} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-key me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='password' name='repeatPassword' placeholder='Nhập lại mật khẩu' value={formData.repeatPassword} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-phone me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='text' name='phone' placeholder='Số điện thoại' value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-home me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <Input type='text' name='address' placeholder='Địa chỉ' value={formData.address} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <Input type='file' accept="image/*" name='urlImage' onChange={handleImageChange} />
                                </div>

                                <div className="flex flex-row items-center mb-4">
                                    <Link href="/login" className="text-blue-500 hover:text-red-600 no-underline">Đến trang đăng nhập</Link>
                                </div>

                                <Button type="submit" className='mb-4' size='lg'>Đăng ký</Button>
                            </form>
                        </Col>

                        <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <CardImg src={formData.urlImage || '/images/default-image.png'} fluid />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Register;
