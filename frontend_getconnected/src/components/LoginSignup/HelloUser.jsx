import React from 'react';
import { useNavigate } from 'react-router-dom';
import robot from '../Assets/robot.webp';

const HelloUser = () => {
    const navigate = useNavigate();

    const goToHomepage = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-100 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Hello, User!</h1>
            <img src={robot} alt="Cute Dog" className="w-full max-w-lg rounded-lg shadow-lg mb-8" />
            <button
                onClick={goToHomepage}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default HelloUser;