import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Students = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_URL;

    const fetchStudents = async () => {
        try {
            const response = await fetch(`${URL}students`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setStudents(data.data);
                console.log("Students fetched successfully.");
            } else {
                console.log("Failed to fetch students.");
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                        <div key={student._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{student.fullname}</h3>
                            <p className="text-gray-700 mb-2"><strong>Age:</strong> {student.age}</p>
                            <p className="text-gray-700 mb-2"><strong>Career:</strong> {student.career}</p>
                            <p className="text-gray-700 mb-2"><strong>Hobby:</strong> {student.hobby}</p>
                            <p className="text-gray-700 mb-2"><strong>Description:</strong> {student.description}</p>
                            <p className="text-gray-700 mb-2"><strong>Location:</strong> {student.location}</p>
                            {student.photo && (
                                <img src={`${URL}/uploads/${student.photo}`} alt={student.fullname} className="w-full h-48 object-cover rounded-md mt-4" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Students;