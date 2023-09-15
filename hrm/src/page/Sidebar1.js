import React from 'react'

import { NavLink, useLocation, useParams } from 'react-router-dom';

const Sidebar1 = () => {
    const location = useLocation();
    const action = 'account-tab-item active';
    const UserType  = sessionStorage.getItem('UserType');
    
    
    // const {id} = useParams();
 
   


    
    
    let comp;
    if(UserType=='ADMIN'){
      if(location.pathname === '/manage_employee/add-employee' || location.pathname === '/manage_employee/view-employee'|| location.pathname === '/manage_employee/view-attendence'|| location.pathname === '/manage_employee/in-out-attendence' || location.pathname === '/manage_employee/employee-allocation'){
     
        comp = <div className="sub-sidebar">
          <div className="account-tab">
              <div className="title">Manage Employee</div>
              <NavLink to="/manage_employee/add-employee" className="account-tab-item">
                <span>Add Employee</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/view-employee" className="account-tab-item">
                <span>View Employee</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/view-attendence" className="account-tab-item">
  
              <span>View Attendance</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/in-out-attendence" className="account-tab-item">
  
              <span>IN/OUT Attendance</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/employee-allocation" className="account-tab-item">
  
              <span>Employee Allocation</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              
          
          
          </div>
          </div>
        
      }else if(location.pathname === '/my_zone/my-work-day' || location.pathname === '/my_zone/remaining-leave'  || location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/attendance-report' ){
       comp =  <div className="sub-sidebar">
                <div className="account-tab">
                  <div className="title">My Zone</div>
                  <NavLink to="/my_zone/my-work-day" className="account-tab-item"><span>My Work Days</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                  <NavLink to="/my_zone/manage-leave" className="account-tab-item"><span>Manage Leave</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                  <NavLink to="/my_zone/remaining-leave" className="account-tab-item"><span>Remaining Leave's</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                  <NavLink to="/my_zone/attendance-report" className="account-tab-item"><span>Attendance Reports</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                </div>
                </div>
  
      }else if(location.pathname === '/downloads/download-salary-slip' || location.pathname === '/downloads/download-report'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">Downloads</div>
                <NavLink to="/downloads/download-salary-slip" className="account-tab-item">
                  <span>Salary Slip</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/downloads/download-report" className="account-tab-item">
                  <span>Reports</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }else if(location.pathname === '/settings/view-designation' || location.pathname === '/settings/add-holiday' || location.pathname === '/settings/manage-holiday' || location.pathname === '/settings/view-workshift' || location.pathname === '/settings/ip-allocation'){
        comp = <div className="sub-sidebar">
                <div className="account-tab">
                  <div className="title">Settings</div>
                  <NavLink to="/settings/view-designation" className="account-tab-item">
                    <span>View Designation</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/add-holiday" className="account-tab-item">
                    <span>Add Holiday</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/manage-holiday" className="account-tab-item">
                    <span>Manage Holiday</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/view-workshift" className="account-tab-item">
                    <span>Manage Workshift</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/ip-allocation" className="account-tab-item">
                    <span>IP Allocation</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                </div>
              </div>
  
      }else if(location.pathname === '/logs/login-history') {
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">Logs</div>
                <NavLink href="/logs/login-history" className={(() => { if (location.pathname === '/logs/login-history') { return ( action) }else{ return ("account-tab-item") } })()}>
                  <span>Login History</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }else if(location.pathname === '/dashboard/profile' || location.pathname === '/dashboard/change-password'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">My Account</div>
                <NavLink to="/dashboard/profile" className="account-tab-item">
                  <span>Profile</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/dashboard/change-password" className="account-tab-item">
                  <span>Change Password</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }

    }
    if(UserType=='EMP'){
      if(location.pathname === '/MangeAttendance/attendance-management'){
        comp = <div className="sub-sidebar">
          <div className="account-tab">
              <div className="title">Manage Details</div>
              <NavLink to="/MangeAttendance/attendance-management" className="account-tab-item">
  
              <span>Manage Details</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              
              
          
          
          </div>
          </div>
      }else if(location.pathname === '/my_zone/remaining-leave'  || location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/attendance-report' ){
        comp =  <div className="sub-sidebar">
                 <div className="account-tab">
                   <div className="title">My Zone</div>
                    <NavLink to="/my_zone/manage-leave" className="account-tab-item"><span>Manage Leave</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                   <NavLink to="/my_zone/remaining-leave" className="account-tab-item"><span>Remaining Leave's</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                   <NavLink to="/my_zone/attendance-report" className="account-tab-item"><span>Attendance Reports</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                 </div>
                 </div>
   
       }
       else if(location.pathname === '/dashboard/profile' || location.pathname === '/dashboard/change-password'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">My Account</div>
                <NavLink to="/dashboard/profile" className="account-tab-item">
                  <span>Profile</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/dashboard/change-password" className="account-tab-item">
                  <span>Change Password</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }

    }
    if(UserType=='HR'){
      if(location.pathname === '/manage_employee/add-employee' || location.pathname === '/manage_employee/view-employee' || location.pathname === '/manage_employee/view-attendence' || location.pathname === '/manage_employee/in-out-attendence' || location.pathname === '/manage_employee/employee-allocation'){

        comp = <div className="sub-sidebar">
          <div className="account-tab">
              <div className="title">Manage Employee</div>
              <NavLink to="/manage_employee/add-employee" className="account-tab-item">
  
              <span>Add Employee</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/view-employee" className="account-tab-item">
  
              <span>View Employee</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/view-attendence" className="account-tab-item">
  
              <span>View Attendance</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              {/* <NavLink to="/manage_employee/manage-attendence" className="account-tab-item">
  
              <span>Manage Attendance</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink> */}
              <NavLink to="/manage_employee/in-out-attendence" className="account-tab-item">
  
              <span>IN/OUT Attendance</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              <NavLink to="/manage_employee/employee-allocation" className="account-tab-item">
  
              <span>Employee Allocation</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              
          
          
          </div>
          </div>
        
      }
      else if(location.pathname === '/settings/view-designation' || location.pathname === '/settings/add-holiday' || location.pathname=== '/settings/manage-holiday' || location.pathname === '/settings/view-workshift' || location.pathname === '/settings/ip-allocation'){
        comp = <div className="sub-sidebar">
                <div className="account-tab">
                  <div className="title">Settings</div>
                  <NavLink to="/settings/view-designation" className="account-tab-item">
                    <span>View Designation</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/add-holiday" className="account-tab-item">
                    <span>Add Holiday</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/manage-holiday" className="account-tab-item">
                    <span>Manage Holiday</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/view-workshift" className="account-tab-item">
                    <span>Manage Workshift</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                  <NavLink to="/settings/ip-allocation" className="account-tab-item">
                    <span>IP Allocation</span>
                    <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                  </NavLink>
                </div>
              </div>
  
      }
      else if(location.pathname === '/my_zone/my-work-day' || location.pathname === '/my_zone/remaining-leave'  || location.pathname === '/my_zone/manage-leave' || location.pathname === '/my_zone/attendance-report' ){
        comp =  <div className="sub-sidebar">
                 <div className="account-tab">
                   <div className="title">My Zone</div>
                   <NavLink to="/my_zone/my-work-day" className="account-tab-item"><span>My Work Days</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                   <NavLink to="/my_zone/manage-leave" className="account-tab-item"><span>Manage Leave</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                   <NavLink to="/my_zone/remaining-leave" className="account-tab-item"><span>Remaining Leave's</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                   <NavLink to="/my_zone/attendance-report" className="account-tab-item"><span>Attendance Reports</span><span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span></NavLink>
                 </div>
                 </div>
   
       }
       else if(location.pathname === '/downloads/download-salary-slip' || location.pathname === '/downloads/download-report'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">Downloads</div>
                <NavLink to="/downloads/download-salary-slip" className="account-tab-item">
                  <span>Salary Slip</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/downloads/download-report" className="account-tab-item">
                  <span>Reports</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }
       else if(location.pathname === '/logs/login-history') {
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">Logs</div>
                <NavLink href="/logs/login-history" className={(() => { if (location.pathname === '/logs/login-history') { return ( action) }else{ return ("account-tab-item") } })()}>
                  <span>Login History</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }
      else if(location.pathname === '/dashboard/profile' || location.pathname === '/dashboard/change-password'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">My Account</div>
                <NavLink to="/dashboard/profile" className="account-tab-item">
                  <span>Profile</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/dashboard/change-password" className="account-tab-item">
                  <span>Change Password</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }

    }
    if(UserType=='MAN'){
      if(location.pathname === '/MangeAttendance/attendance-management'){
        comp = <div className="sub-sidebar">
          <div className="account-tab">
              <div className="title">Manage Details</div>
              <NavLink to="/MangeAttendance/attendance-management" className={(() => { if (location.pathname === '/MangeAttendance/attendance-management') { return ( action) }else{ return ("account-tab-item") } })()}>
  
              <span>Manage Details</span>
              <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
              </NavLink>
              
              
          
          
          </div>
          </div>
      }
      else if(location.pathname === '/dashboard/profile' || location.pathname === '/dashboard/change-password'){
        comp = <div className="sub-sidebar">
              <div className="account-tab">
                <div className="title">My Account</div>
                <NavLink to="/dashboard/profile" className="account-tab-item">
                  <span>Profile</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
                <NavLink to="/dashboard/change-password" className="account-tab-item">
                  <span>Change Password</span>
                  <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>
                </NavLink>
              </div>
            </div>
      }

    }

    
    
    
    
    
  return (
    <div>
        {comp}
        
      
    </div>
  )
}

export default Sidebar1
