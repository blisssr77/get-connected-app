import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../App'

const Freelancer = (props) => {
  const freelancers = useContext(AppContext);

  

  return (
    <div className='pt-28'>Freelancer</div>
  )
}

export default Freelancer