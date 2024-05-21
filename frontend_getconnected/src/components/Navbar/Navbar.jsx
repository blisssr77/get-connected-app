import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    let Links = [
        {name:"HOME", link:"/"},
        {name:"LOGIN / SIGNUP", link:"/login"},
    ];

    if (isLoggedIn) {
        Links = [
            {name:"HOME", link:"/"},
            {name:"Students", link:"/students"},
            {name:"Freelancers", link:"/freelancers"},
            {name:"LOGOUT", link:"#", onClick: handleLogout},
        ];
    }

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef(null);  

    const goToUserRoleForm = () => {
        console.log('trying to navigate to /user-role-form');
        navigate('/user-role-form');
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);  

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7' ref={navRef}>
                <div className='font-extrabold text-2xl cursor-pointer flex items-center font-[quicksand] text-gray-800'>
                    GetConnected
                    <span className='text-xl3 text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="person-add"></ion-icon>
                    </span>
                    
                </div>
                
                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <li style={{fontSize:'14px'}} key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                            {link.name === "LOGOUT" ? (
                                <a onClick={link.onClick} className='text-gray-800 hover:text-gray-400 duration-500 cursor-pointer'>{link.name}</a>
                            ) : (
                                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                            )}
                        </li>
                    ))}
                    
                        <button onClick={goToUserRoleForm} className="w-full md:ml-8 px-6 py-3 text-sm bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700">
                            Get Started
                        </button>
                    
                </ul>
            </div>
        </div>
    );
}

export default Navbar;