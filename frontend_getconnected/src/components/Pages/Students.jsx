import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const URL = process.env.REACT_APP_URL


    // Fetch students from the backend when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${URL}students`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setStudents(response.data);
                setFilteredStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    // Update filtered students when search term changes
    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                Object.values(student).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        );
    }, [searchTerm, students]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Students</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <div key={student._id} className="bg-white p-6 rounded-lg shadow-lg">
                                {student.photo && (
                                    <img
                                        src={URL.createObjectURL(student.photo)}
                                        alt={student.fullname}
                                        className="w-32 h-32 rounded-full mx-auto mb-4"
                                    />
                                )}
                                <h3 className="text-xl font-bold text-center">{student.fullname}</h3>
                                <p className="text-gray-600 text-center">{student.location}</p>
                                <p className="text-gray-700"><strong>Age:</strong> {student.age}</p>
                                <p className="text-gray-700"><strong>Career:</strong> {student.career}</p>
                                <p className="text-gray-700"><strong>Hobby:</strong> {student.hobby}</p>
                                <p className="text-gray-700"><strong>Description:</strong> {student.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No students found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Students;