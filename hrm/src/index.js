import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard  from './page/Dashboard';
import Add_employee from './page/Add_employee';
import App from './App';

import reportWebVitals from './reportWebVitals';
import View_employee from './page/View_employee';

import In_out_attendence from './page/In_out_attendence';
import Employee_allocation from './page/Employee_allocation';
import View_attendence from './page/View_attendence';
import My_work_day from './page/My_work_day';
import Attendance_report from './page/Attendance_report';
import Remaining_leave from './page/Remaining_leave';
import Manage_leave from './page/Manage_leave';
import Download_salary_slip from './page/Download_salary_slip';
import Download_report from './page/Download_report';
import View_designation from './page/View_designation';
import View_workshift from './page/View_workshift';
import Add_holiday from './page/Add_holiday';
import Ip_allocation from './page/Ip_allocation';
import Login_history from './page/Login_history';
import Profile from './page/Profile';
import Change_password from './page/Change_password';
import Logout from './page/Logout';
import Employee from './page/Employee';
import Date from './page/Dates';
import Edit_employee from './page/Edit_employee';
import Manage_holiday from './page/Manage_holiday';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
  
    <BrowserRouter>
    <Routes>
     
   
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="/manage_employee/add-employee" element={<Add_employee />} />
    <Route path="manage_employee/view-employee" element={<View_employee />} />
    <Route path="manage_employee/view-attendence" element={<View_attendence />} />
    <Route path="manage_employee/in-out-attendence" element={<In_out_attendence />} />
    <Route path="manage_employee/employee-allocation" element={<Employee_allocation />} />
    <Route path="my_zone/my-work-day" element={<My_work_day />} />
    <Route path="my_zone/attendance-report" element={<Attendance_report />} />
    <Route path="my_zone/manage-leave" element={<Manage_leave />} />
    <Route path="my_zone/remaining-leave" element={<Remaining_leave />} />
    <Route path="downloads/download-salary-slip" element={<Download_salary_slip />} />
    <Route path="downloads/download-report" element={<Download_report />} />
    <Route path="settings/view-designation" element={<View_designation />} />
    <Route path="settings/add-holiday" element={<Add_holiday />} />
    <Route path="settings/manage-holiday" element={<Manage_holiday />} />
    <Route path="settings/view-workshift" element={<View_workshift />} />
    <Route path="settings/ip-allocation" element={<Ip_allocation />} />
    <Route path="logs/login-history" element={<Login_history />} />
    <Route path="dashboard/profile" element={<Profile />} />
    <Route path="dashboard/change-password" element={<Change_password />} />
    <Route path="/logout" element={<Logout />} />
    <Route path='/Employee' element={<Employee />} />
    <Route path='/date' element={<Date />} />
    <Route path='/MangeAttendance/attendance-management' element={<View_attendence />} />
    
    <Route path='/manage_employee/editEmployee/:id' element={<Edit_employee />} />

    
    
    
    
    <Route path="/" element={<App />} />
  

    </Routes>
    

    </BrowserRouter>
      
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
