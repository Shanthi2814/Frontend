import React from 'react'
import './css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import { Avatar } from '@mui/material';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
// import { signOut } from 'firebase/auth';
 import {useNavigate} from "react-router-dom"

function Header() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <Link to='/'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png' alt="logo"/>
          </Link>
        
        <h3>Products</h3>
        </div>
        <div className='header-middle'>
        <div className='header-search-container'>
        <SearchIcon/>
        <input type='text' placeholder='Search..'/>
        </div>
        </div>
        <div className='header-right'>
        <div className='header-right-container'>
         <span
          onClick={()=>{
            auth.signOut()
            navigate('/auth') 
          }}
         > <Avatar src={user?.photo}/></span>
          <InboxIcon/>
          <DehazeOutlinedIcon/>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header