import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Link ,useLocation} from 'react-router-dom'
import './Header.css'
function Header() {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  return (
    <div >
      <nav id='header'>
        <ul
          className='d-flex align-items-center justify-content-between'
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Left-aligned item */}
          <li style={{ marginRight: 'auto' }}>
            {isAuthenticated ?(<Link to='/home'><button className='linksbutton'>Home</button></Link>):(<Link to='/'><button className='linksbutton'>Home</button></Link>)}
          </li>

          {isAuthenticated && (
            <li>
              <Link to='/profile'><button>Profile</button></Link>
            </li>
          )}

          {/* Right-aligned items */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px' }}>
            {isAuthenticated ? (
              <button onClick={logout} className='btn btn-link p-0'>Logout</button>
            ) : (
              <>
               {location.pathname !== '/login' && 
               ( <Link to='/login' ><button className='linksbutton' >Login</button></Link>)
               }
                <Link to='/signup' ><button className='linksbutton'>Signup</button></Link>
              </>
            )}
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Header
