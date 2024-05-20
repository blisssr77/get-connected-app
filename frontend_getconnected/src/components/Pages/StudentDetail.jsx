import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';

const StudentDetail = () => {
    const { id } = useParams();
    const { students } = useContext(AppContext);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (students) {
            const foundStudent = students.find(student => student._id === id);
            setStudent(foundStudent);
        }
    }, [students, id]);

    if (!student) {
        return <div className="text-center text-2xl mt-10">Loading...</div>;
    }

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    {student.photo && (
                        <img
                            src={student.photo}
                            alt={student.fullname}
                            className="w-32 h-32 rounded-full mb-4"
                        />
                    )}
                    <h2 className="text-3xl font-bold mb-2">{student.fullname}</h2>
                    <p className="text-gray-600">{student.location}</p>
                </div>
                <div className="mt-8 space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">Personal Information</h3>
                        <p className="text-gray-700"><strong>Age:</strong> {student.age}</p>
                        <p className="text-gray-700"><strong>Career:</strong> {student.career}</p>
                        <p className="text-gray-700"><strong>Hobby:</strong> {student.hobby}</p>
                        <p className="text-gray-700"><strong>Description:</strong> {student.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;