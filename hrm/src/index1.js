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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
  
    <BrowserRouter>
    <Routes>
     
      
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="dashboard/add-employee" element={<Add_employee />} />
    <Route path="dashboard/view-employee" element={<View_employee />} />
    <Route path="dashboard/view-attendence" element={<View_attendence />} />
    <Route path="dashboard/in-out-attendence" element={<In_out_attendence />} />
    <Route path="dashboard/employee-allocation" element={<Employee_allocation />} />
    <Route path="dashboard/my-work-day" element={<My_work_day />} />
    <Route path="dashboard/attendance-report" element={<Attendance_report />} />
    <Route path="dashboard/manage-leave" element={<Manage_leave />} />
    <Route path="dashboard/remaining-leave" element={<Remaining_leave />} />
    <Route path="dashboard/download-salary-slip" element={<Download_salary_slip />} />
    <Route path="dashboard/download-report" element={<Download_report />} />
    <Route path="dashboard/view-designation" element={<View_designation />} />
    <Route path="dashboard/add-holiday" element={<Add_holiday />} />
    <Route path="dashboard/view-workshift" element={<View_workshift />} />
    <Route path="dashboard/ip-allocation" element={<Ip_allocation />} />
    <Route path="dashboard/login-history" element={<Login_history />} />
    <Route path="dashboard/profile" element={<Profile />} />
    <Route path="dashboard/change-password" element={<Change_password />} />
    
    
    
    
    <Route path="/" element={<App />} />
  

    </Routes>
    

    </BrowserRouter>
      
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
