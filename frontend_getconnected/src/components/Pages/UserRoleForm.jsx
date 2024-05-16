import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const UserRoleForm = (props) => {
    const newStudentForm = {
        fullname: "",
        age: "",
        career: "",
        hobby: "",
        description: "",
        location: "",
        photo: "",
    };

    const newFreelancerForm = {
        fullname: "",
        age: "",
        career: "",
        hobby: "",
        degree: "",
        location: "",
        description: "",
        experience: "",
        photo: "",
    };

    const [newStudent, setNewStudent] = useState(newStudentForm);
    const [newFreelancer, setNewFreelancer] = useState(newFreelancerForm);
    const [studentPhoto, setStudentPhoto] = useState(null);
    const [freelancerPhoto, setFreelancerPhoto] = useState(null);
    const navigate = useNavigate();

    const handleStudentChange = (i) => {
        setNewStudent({ ...newStudent, [i.target.name]: i.target.value });
    };

    const handleFreelancerChange = (i) => {
        setNewFreelancer({ ...newFreelancer, [i.target.name]: i.target.value });
    };

    const handleStudentSubmit = (i) => {
        i.preventDefault();
        console.log("Student Form submitted");
        console.log(newStudent);
        props.createStudent(newStudent);
    };

    // Below code handles the submission of the freelancer form
    const handleFreelancerSubmit = (i) => {
        i.preventDefault();
        console.log("Freelancer Form submitted");
        console.log(newFreelancer);
        props.createFreelancer(newFreelancer);
    };

    const handleCancel = () => {
        navigate('/');
    };

    const onDropStudent = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setStudentPhoto(file);
        setNewStudent({ ...newStudent, photo: file });
    };

    const onDropFreelancer = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFreelancerPhoto(file);
        setNewFreelancer({ ...newFreelancer, photo: file });
    };

    const { getRootProps: getStudentRootProps, getInputProps: getStudentInputProps } = useDropzone({
        onDrop: onDropStudent,
        accept: 'image/*',
        multiple: false,
    });

    const { getRootProps: getFreelancerRootProps, getInputProps: getFreelancerInputProps } = useDropzone({
        onDrop: onDropFreelancer,
        accept: 'image/*',
        multiple: false,
    });

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Register as</h2>
                <div className="flex justify-between space-x-8">
                    {/* Student Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl font-bold text-center mb-4">Student</h3>
                        <form className="space-y-6" onSubmit={handleStudentSubmit}>
                            <div>
                                <label htmlFor="studentFullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <textarea
                                    id="studentFullname"
                                    name="fullname"
                                    value={newStudent.fullname}
                                    onChange={handleStudentChange}
                                    placeholder="Full Name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="studentAge" className="block text-sm font-medium text-gray-700">Age</label>
                                <textarea
                                    id="studentAge"
                                    name="age"
                                    value={newStudent.age}
                                    onChange={handleStudentChange}
                                    placeholder="Age"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="studentCareer" className="block text-sm font-medium text-gray-700">Career</label>
                                <textarea
                                    id="studentCareer"
                                    name="career"
                                    value={newStudent.career}
                                    onChange={handleStudentChange}
                                    placeholder="Career"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="studentHobby" className="block text-sm font-medium text-gray-700">Hobby</label>
                                <textarea
                                    id="studentHobby"
                                    name="hobby"
                                    value={newStudent.hobby}
                                    onChange={handleStudentChange}
                                    placeholder="Hobby"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="studentDescription" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="studentDescription"
                                    name="description"
                                    value={newStudent.description}
                                    onChange={handleStudentChange}
                                    placeholder="Description"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="studentLocation" className="block text-sm font-medium text-gray-700">Location</label>
                                <textarea
                                    id="studentLocation"
                                    name="location"
                                    value={newStudent.location}
                                    onChange={handleStudentChange}
                                    placeholder="Location"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                                <div {...getStudentRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="studentPhoto"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    {...getStudentInputProps()}
                                                    id="studentPhoto"
                                                    name="photo"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                                <button onClick={handleCancel} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Freelancer Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl font-bold text-center mb-4">Freelancer</h3>
                        <form className="space-y-6" onSubmit={handleFreelancerSubmit}>
                            <div>
                                <label htmlFor="freelancerFullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <textarea
                                    id="freelancerFullname"
                                    name="fullname"
                                    value={newFreelancer.fullname}
                                    onChange={handleFreelancerChange}
                                    placeholder="Full Name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerAge" className="block text-sm font-medium text-gray-700">Age</label>
                                <textarea
                                    id="freelancerAge"
                                    name="age"
                                    value={newFreelancer.age}
                                    onChange={handleFreelancerChange}
                                    placeholder="Age"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerCareer" className="block text-sm font-medium text-gray-700">Career</label>
                                <textarea
                                    id="freelancerCareer"
                                    name="career"
                                    value={newFreelancer.career}
                                    onChange={handleFreelancerChange}
                                    placeholder="Career"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerHobby" className="block text-sm font-medium text-gray-700">Hobby</label>
                                <textarea
                                    id="freelancerHobby"
                                    name="hobby"
                                    value={newFreelancer.hobby}
                                    onChange={handleFreelancerChange}
                                    placeholder="Hobby"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerDegree" className="block text-sm font-medium text-gray-700">Degree</label>
                                <textarea
                                    id="freelancerDegree"
                                    name="degree"
                                    value={newFreelancer.degree}
                                    onChange={handleFreelancerChange}
                                    placeholder="Degree"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerLocation" className="block text-sm font-medium text-gray-700">Location</label>
                                <textarea
                                    id="freelancerLocation"
                                    name="location"
                                    value={newFreelancer.location}
                                    onChange={handleFreelancerChange}
                                    placeholder="Location"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerDescription" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="freelancerDescription"
                                    name="description"
                                    value={newFreelancer.description}
                                    onChange={handleFreelancerChange}
                                    placeholder="Description"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="freelancerExperience" className="block text-sm font-medium text-gray-700">Experience</label>
                                <textarea
                                    id="freelancerExperience"
                                    name="experience"
                                    value={newFreelancer.experience}
                                    onChange={handleFreelancerChange}
                                    placeholder="Experience"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                                <div {...getFreelancerRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="freelancerPhoto"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    {...getFreelancerInputProps()}
                                                    id="freelancerPhoto"
                                                    name="photo"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                                <button onClick={handleCancel} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRoleForm;