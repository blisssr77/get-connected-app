import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UserRoleForm = () => {
    const navigate = useNavigate();
    const [studentPhoto, setStudentPhoto] = useState(null);
    const [freelancerPhoto, setFreelancerPhoto] = useState(null);

    const studentFormik = useFormik({
        initialValues: {
            fullname: '',
            age: '',
            career: '',
            hobby: '',
            description: '',
            location: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Required'),
            age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
            career: Yup.string().required('Required'),
            hobby: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('photo', studentPhoto);
            Object.keys(values).forEach(key => formData.append(key, values[key]));

            try {
                await axios.post('/api/students', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                navigate('/register/student');
            } catch (error) {
                console.error(error);
            }
        }
    });

    const freelancerFormik = useFormik({
        initialValues: {
            fullname: '',
            age: '',
            career: '',
            hobby: '',
            degree: '',
            location: '',
            description: '',
            experience: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Required'),
            age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
            career: Yup.string().required('Required'),
            hobby: Yup.string().required('Required'),
            degree: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            experience: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('photo', freelancerPhoto);
            Object.keys(values).forEach(key => formData.append(key, values[key]));

            try {
                await axios.post('/api/freelancers', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                navigate('/register/freelancer');
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { getRootProps: getStudentRootProps, getInputProps: getStudentInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setStudentPhoto(acceptedFiles[0]);
        }
    });

    const { getRootProps: getFreelancerRootProps, getInputProps: getFreelancerInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFreelancerPhoto(acceptedFiles[0]);
        }
    });

    return (

    );
};

export default UserRoleForm;