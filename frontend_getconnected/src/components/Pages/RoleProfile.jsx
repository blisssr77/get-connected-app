import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';

const RoleProfile = () => {
    const { students, freelancers, user } = useContext(AppContext);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        if (students && freelancers) {
            const userId = user ? user.id : null;
            const filteredProfiles = [
                ...students.filter(student => student.User === userId),
                ...freelancers.filter(freelancer => freelancer.User === userId)
            ];
            setProfiles(filteredProfiles);
            console.log("Filtered profiles:", filteredProfiles);
        }
    }, [students, freelancers, user]);

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Your Profiles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {profiles.length === 0 ? (
                    <p className="text-center">No profiles found.</p>
                ) : (
                    profiles.map((profile, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full hover:bg-gray-100">
                            {profile.photo && (
                                <img
                                    src={URL.createObjectURL(profile.photo)}
                                    alt={profile.fullname}
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                            )}
                            <div className="text-center">
                                <h3 className="text-xl font-bold">{profile.fullname}</h3>
                                <p className="text-gray-600">{profile.location}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-700"><strong>Age:</strong> {profile.age}</p>
                                <p className="text-gray-700"><strong>Career:</strong> {profile.career}</p>
                                <p className="text-gray-700"><strong>Hobby:</strong> {profile.hobby}</p>
                                <p className="text-gray-700"><strong>Description:</strong> {profile.description}</p>
                                {profile.experience && <p className="text-gray-700"><strong>Experience:</strong> {profile.experience}</p>}
                            </div>
                            <div className="mt-4">
                                <Link to={profile.experience ? `/freelancers/${profile._id}` : `/students/${profile._id}`}>
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update Profile</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RoleProfile;