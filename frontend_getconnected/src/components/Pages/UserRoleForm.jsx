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
                navigate('/students');
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
                navigate('/freelancers');
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
        <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Register as</h2>
                <div className="flex justify-between space-x-8">
                    {/* Student Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl font-bold text-center mb-4">Student</h3>
                        <form className="space-y-6" onSubmit={studentFormik.handleSubmit}>
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input id="fullname" name="fullname" type="text" {...studentFormik.getFieldProps('fullname')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.fullname && studentFormik.errors.fullname ? <div className="text-red-600 text-sm">{studentFormik.errors.fullname}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                <input id="age" name="age" type="number" {...studentFormik.getFieldProps('age')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.age && studentFormik.errors.age ? <div className="text-red-600 text-sm">{studentFormik.errors.age}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="career" className="block text-sm font-medium text-gray-700">Career</label>
                                <input id="career" name="career" type="text" {...studentFormik.getFieldProps('career')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.career && studentFormik.errors.career ? <div className="text-red-600 text-sm">{studentFormik.errors.career}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="hobby" className="block text-sm font-medium text-gray-700">Hobby</label>
                                <input id="hobby" name="hobby" type="text" {...studentFormik.getFieldProps('hobby')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.hobby && studentFormik.errors.hobby ? <div className="text-red-600 text-sm">{studentFormik.errors.hobby}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="description" name="description" {...studentFormik.getFieldProps('description')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.description && studentFormik.errors.description ? <div className="text-red-600 text-sm">{studentFormik.errors.description}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input id="location" name="location" type="text" {...studentFormik.getFieldProps('location')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {studentFormik.touched.location && studentFormik.errors.location ? <div className="text-red-600 text-sm">{studentFormik.errors.location}</div> : null}
                            </div>
                            <div className="mt-4">
                                {/* Image upload */}
                                {/* <div {...getStudentRootProps()} className="h-32 bg-gray-200 rounded-md flex items-center justify-center border-dashed border-2 border-gray-300 cursor-pointer">
                                    <input {...getStudentInputProps()} />
                                    <span className="text-gray-500">{studentPhoto ? studentPhoto.name : 'Drop or click to upload photo'}</span>
                                </div> */}
                            </div>
                            <div>
                                <button type="submit" disabled={studentFormik.isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Register as Student
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Freelancer Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl font-bold text-center mb-4">Freelancer</h3>
                        <form className="space-y-6" onSubmit={freelancerFormik.handleSubmit}>
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input id="fullname" name="fullname" type="text" {...freelancerFormik.getFieldProps('fullname')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.fullname && freelancerFormik.errors.fullname ? <div className="text-red-600 text-sm">{freelancerFormik.errors.fullname}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                <input id="age" name="age" type="number" {...freelancerFormik.getFieldProps('age')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.age && freelancerFormik.errors.age ? <div className="text-red-600 text-sm">{freelancerFormik.errors.age}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="career" className="block text-sm font-medium text-gray-700">Career</label>
                                <input id="career" name="career" type="text" {...freelancerFormik.getFieldProps('career')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.career && freelancerFormik.errors.career ? <div className="text-red-600 text-sm">{freelancerFormik.errors.career}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="hobby" className="block text-sm font-medium text-gray-700">Hobby</label>
                                <input id="hobby" name="hobby" type="text" {...freelancerFormik.getFieldProps('hobby')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.hobby && freelancerFormik.errors.hobby ? <div className="text-red-600 text-sm">{freelancerFormik.errors.hobby}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                                <input id="degree" name="degree" type="text" {...freelancerFormik.getFieldProps('degree')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.degree && freelancerFormik.errors.degree ? <div className="text-red-600 text-sm">{freelancerFormik.errors.degree}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input id="location" name="location" type="text" {...freelancerFormik.getFieldProps('location')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.location && freelancerFormik.errors.location ? <div className="text-red-600 text-sm">{freelancerFormik.errors.location}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="description" name="description" {...freelancerFormik.getFieldProps('description')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.description && freelancerFormik.errors.description ? <div className="text-red-600 text-sm">{freelancerFormik.errors.description}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                                <textarea id="experience" name="experience" {...freelancerFormik.getFieldProps('experience')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                {freelancerFormik.touched.experience && freelancerFormik.errors.experience ? <div className="text-red-600 text-sm">{freelancerFormik.errors.experience}</div> : null}
                            </div>
                            <div className="mt-4">
                                {/* Image upload */}
                                {/* <div {...getFreelancerRootProps()} className="h-32 bg-gray-200 rounded-md flex items-center justify-center border-dashed border-2 border-gray-300 cursor-pointer">
                                    <input {...getFreelancerInputProps()} />
                                    <span className="text-gray-500">{freelancerPhoto ? freelancerPhoto.name : 'Drop or click to upload photo'}</span>
                                </div> */}
                            </div>
                            <div>
                                <button type="submit" disabled={freelancerFormik.isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Register as Freelancer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRoleForm;