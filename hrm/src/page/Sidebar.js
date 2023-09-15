import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import log from '../img/logo.svg'
import profile from '../img/avatar-male.png'

const Sidebar = () => {
  
  
    const location = useLocation();
    const action = 'active';
    const UserType  = sessionStorage.getItem('UserType');
    
    

   
    
  return (
    <div>
      {(() => { if (UserType=='ADMIN') { return (
        <div className="newsidebar">
        <ul className="mt-2">
          <li><Link to="/dashboard"><img src={log} className="avatar" /></Link></li>
          <li className={(() => { if (location.pathname === '/dashboard') { return ( action ) } })()}><Link to="/dashboard" className="tooltip-right" data-tooltip="Dashboard"> <i className="lnil lnil-display-alt" /></Link></li>
          <li className={(() => { if (location.pathname === '/manage_employee/add-employee' || location.pathname === '/manage_employee/view-employee' || location.pathname === '/manage_employee/view-attendence' || location.pathname === '/manage_employee/in-out-attendence' || location.pathname === '/manage_employee/employee-allocation') { return ( action ) } })()}><Link to="/manage_employee/add-employee" className="tooltip-right" data-tooltip="Employee Management"><i className="lnil lnil-network" /></Link></li>
           
          <li className={(() => { if (location.pathname === '/my_zone/my-work-day' || location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/remaining-leave' || location.pathname === '/my_zone/attendance-report') { return ( action ) } })()}><Link to="/my_zone/my-work-day" className="tooltip-right" data-tooltip="My Zone"><i className="lnil lnil-tap" /> </Link></li>
         
          <li className={(() => { if (location.pathname === '/downloads/download-salary-slip' || location.pathname === '/downloads/download-report') { return ( action ) } })()}><Link to="/downloads/download-salary-slip" className="tooltip-right" data-tooltip="Downloads" ><i className="lnil lnil-download" /></Link></li>
          <li className={(() => { if (location.pathname === '/settings/view-designation' || location.pathname === '/settings/add-holiday' || location.pathname === '/settings/view-workshift' || location.pathname === '/settings/ip-allocation') { return ( action ) } })()}><Link to="/settings/view-designation" className="tooltip-right" data-tooltip="Settings"><i className="lnil lnil-cog" /></Link></li>
          <li className={(() => { if (location.pathname === '/logs/login-history') { return ( action ) } })()}><Link to="/logs/login-history" className="tooltip-right" data-tooltip="logs"><i className="lnil lnil-laptop-alt-switch" /></Link></li>
          
        </ul>
        <ul className="bottom-menu">
          <li>
            <div className="dropdown">
              <Link className="dropdown-toggle" to="#" role="button" id="profileLinks" data-toggle="dropdown"><img src={profile} className="avatar rounded-circle" /></Link>
              <div className="dropdown-menu" aria-labelledby="profileLinks">
                <Link className="dropdown-item" to="/dashboard/profile"><i className="lnil lnil-user-alt-2 icon" />Profile</Link>
                <Link className="dropdown-item" to="/dashboard/change-password"><i className="lnil lnil-lock icon" />Change Password</Link>
                <div className="dropdown-divider" />
                <Link to="/logout">
                <button type="button" className="btn btn-primary btn-block"><i className="lnil lnil-exit icon" />Logout</button>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>



      ) }else if(UserType=='MAN'){
        return (
          <div className="newsidebar">
          <ul className="mt-2">
            <li><Link to="/dashboard"><img src={log} className="avatar" /></Link></li>
            <li className={(() => { if (location.pathname === '/dashboard') { return ( action ) } })()}><Link to="/dashboard" className="tooltip-right" data-tooltip="Dashboard"> <i className="lnil lnil-display-alt" /></Link></li>
            <li className={(() => { if (location.pathname === '/MangeAttendance/attendance-management')  { return ( action ) } })()}><Link to="/MangeAttendance/attendance-management" className="tooltip-right" data-tooltip="Employee Management"><i className="lnil lnil-network" /></Link></li>
            <li className={(() => { if (location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/remaining-leave' || location.pathname === '/my_zone/manage-leave') { return ( action ) } })()}><Link to="/my_zone/my-work-day" className="tooltip-right" data-tooltip="My Zone"><i className="lnil lnil-tap" /> </Link></li>
        
              
          </ul>
          <ul className="bottom-menu">
            <li>
              <div className="dropdown">
                <Link className="dropdown-toggle" to="#" role="button" id="profileLinks" data-toggle="dropdown"><img src={profile} className="avatar rounded-circle" /></Link>
                <div className="dropdown-menu" aria-labelledby="profileLinks">
                  <Link className="dropdown-item" to="/dashboard/profile"><i className="lnil lnil-user-alt-2 icon" />Profile</Link>
                  <Link className="dropdown-item" to="/dashboard/change-password"><i className="lnil lnil-lock icon" />Change Password</Link>
                  <div className="dropdown-divider" />
                  <Link to="/logout">
                <button type="button" className="btn btn-primary btn-block"><i className="lnil lnil-exit icon" />Logout</button>
                </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
  
  
        )


      }else if(UserType=='EMP'){
        return (
          <div className="newsidebar">
          <ul className="mt-2">
            <li><Link to="/dashboard"><img src={log} className="avatar" /></Link></li>
            <li className={(() => { if (location.pathname === '/dashboard') { return ( action ) } })()}><Link to="/dashboard" className="tooltip-right" data-tooltip="Dashboard"> <i className="lnil lnil-display-alt" /></Link></li>
            <li className={(() => { if (location.pathname === '/MangeAttendance/attendance-management')  { return ( action ) } })()}><Link to="/MangeAttendance/attendance-management" className="tooltip-right" data-tooltip="Employee Management"><i className="lnil lnil-network" /></Link></li>
            <li className={(() => { if (location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/remaining-leave' || location.pathname === '/my_zone/attendance-report') { return ( action ) } })()}><Link to="/my_zone/manage-leave" className="tooltip-right" data-tooltip="My Zone"><i className="lnil lnil-tap" /> </Link></li>
        
              
          </ul>
          <ul className="bottom-menu">
            <li>
              <div className="dropdown">
                <Link className="dropdown-toggle" to="#" role="button" id="profileLinks" data-toggle="dropdown"><img src={profile} className="avatar rounded-circle" /></Link>
                <div className="dropdown-menu" aria-labelledby="profileLinks">
                  <Link className="dropdown-item" to="/dashboard/profile"><i className="lnil lnil-user-alt-2 icon" />Profile</Link>
                  <Link className="dropdown-item" to="/dashboard/change-password"><i className="lnil lnil-lock icon" />Change Password</Link>
                  <div className="dropdown-divider" />
                  <Link to="/logout">
                <button type="button" className="btn btn-primary btn-block"><i className="lnil lnil-exit icon" />Logout</button>
                </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
  
  
        )


      }else if(UserType=='HR'){
        return (
          <div className="newsidebar">
          <ul className="mt-2">
            <li><Link to="/dashboard"><img src={log} className="avatar" /></Link></li>
            <li className={(() => { if (location.pathname === '/dashboard') { return ( action ) } })()}><Link to="/dashboard" className="tooltip-right" data-tooltip="Dashboard"> <i className="lnil lnil-display-alt" /></Link></li>
            <li className={(() => { if (location.pathname === '/manage_employee/add-employee' || location.pathname === '/manage_employee/view-employee' || location.pathname === '/manage_employee/view-attendence' || location.pathname === '/manage_employee/in-out-attendence' || location.pathname === '/manage_employee/employee-allocation') { return ( action ) } })()}><Link to="/manage_employee/add-employee" className="tooltip-right" data-tooltip="Employee Management"><i className="lnil lnil-network" /></Link></li>
            <li className={(() => { if (location.pathname === '/my_zone/my-work-day' || location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/remaining-leave' || location.pathname === '/my_zone/attendance-report') { return ( action ) } })()}><Link to="/my_zone/my-work-day" className="tooltip-right" data-tooltip="My Zone"><i className="lnil lnil-tap" /> </Link></li>
            <li className={(() => { if (location.pathname === '/downloads/download-salary-slip' || location.pathname === '/downloads/download-report') { return ( action ) } })()}><Link to="/downloads/download-salary-slip" className="tooltip-right" data-tooltip="Downloads" ><i className="lnil lnil-download" /></Link></li>
            <li className={(() => { if (location.pathname === '/settings/view-designation' || location.pathname === '/settings/add-holiday' || location.pathname === '/settings/view-workshift' || location.pathname === '/settings/ip-allocation') { return ( action ) } })()}><Link to="/settings/view-designation" className="tooltip-right" data-tooltip="Settings"><i className="lnil lnil-cog" /></Link></li>
            <li className={(() => { if (location.pathname === '/logs/login-history') { return ( action ) } })()}><Link to="/logs/login-history" className="tooltip-right" data-tooltip="logs"><i className="lnil lnil-laptop-alt-switch" /></Link></li>
         
              
          </ul>
          <ul className="bottom-menu">
            <li>
              <div className="dropdown">
               
                <Link className="dropdown-toggle" to="#" role="button" id="profileLinks" data-toggle="dropdown"><img src={profile} className="avatar rounded-circle" /></Link>
                <div className="dropdown-menu" aria-labelledby="profileLinks">
                  <NavLink className="dropdown-item" to="/dashboard/profile"><i className="lnil lnil-user-alt-2 icon" />Profile</NavLink>
                  <NavLink className="dropdown-item" to="/dashboard/change-password"><i className="lnil lnil-lock icon" />Change Password</NavLink>
                  <div className="dropdown-divider" />
                  <Link to="/logout">
                <button type="button" className="btn btn-primary btn-block"><i className="lnil lnil-exit icon" />Logout</button>
                </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
  
  
        )


      } })()}
     
        
      
    </div>
  )
}

export default Sidebar
