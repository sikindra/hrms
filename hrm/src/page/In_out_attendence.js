import { DatePicker, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'
import dayjs from 'dayjs';
import moment from 'moment';

const In_out_attendence = () => {

  const {http} = AuthUser();
  const [attendance,setData]=useState([]);
  useEffect(()=>{
    http.get("listemployee").then((res)=>{
    console.log(res.data.data)
    setData(res.data.data)
  })

  },[])


  //add
  const [EmployeeID, setEmployeeID] = useState('');
  const [EntryDate, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [EntryTime, setTime] = useState(moment().format("HH:mm:ss"));
  const [oDate, setoDate] = useState(dayjs().format("YYYY-MM-DD"));
 
  // Define the isDateDisabled function to disable dates in the past
  const isDateDisabled = (currentDate) => {
    // Disable dates that are before today
    return currentDate && currentDate < new Date().setHours(0, 0, 0, 0);
  };

  const handleDateChange = (date) => {
    setoDate(date);
  };
  const handleDateChanges = (date) => {
    setDate(date);
  };
  const [oTime, setoTime] = useState(moment().format("HH:mm:ss"));
  const handleTimeChange = (time, timeString) => {
    setoTime(timeString); // Update the selected time state
  };
  const handleTimeChanges = (time, timeString) => {
    setTime(timeString); // Update the selected time state
  };
 
  const [remark, setRemark] = useState('');
  const [setvalues, SetMessage] = useState('');
  const [successModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const successAdd = async() =>{
    setShow(false);
    window.location = "/manage_employee/in-out-attendence";
    
  }
  

  const [errors, setErrors] = useState({});
  console.log(errors)
  const attendanceSumbmit = async(e)=>{
    e.preventDefault();
    
    const newErrors = {};
    if (!EmployeeID) {
      newErrors.EmployeeID = 'Please select a Employee';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }else{
      
        let body={"EmployeeId":EmployeeID,
        "EntryDate": EntryDate,"EntryTime":EntryTime,"ActionType":"IN"};
       
        http.post("list_Attendance", body)
        .then((res)=>{
          if(res.data.success=='100'){
            setShow(true);
            SetMessage(res.data.message);

          }else{

          }
          
         })

      
    }
  }
 
  
  console.log(setvalues);

  
  const getToken  = sessionStorage.getItem('token');
  if(getToken==null){
    return (
      
       console.log( window.location.href = ("/"))
       );
  

  }
  return (
    <div>
         <div id="wrapper"> 
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */} 
          <Sidebar1 />
          {/* End of sub Sidebar */} 
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column"> 
            {/* Main Content */}
            <div id="content" className="page-content-wrapper"> 
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="page-title justify-content-between">
                  <div className="title-wrap"><h1 className="title is-4">Fill Employee Attendance</h1></div>
                  <div className="balance-strip">
                    <div className="card shadow-primary bg-primary text-white rounded">
                      <div className="d-flex">
                        <div className="id-bal">
                          <i className="lnil lnil-user-alt-2" />
                          <span><strong>ID :</strong> <span>usd</span></span>
                        </div>
                        <div className="id-bal">
                          <i className="lnil lnil-laptop-alt-switch" />
                          <span><strong>Last Login :</strong> <span>02:58 PM 12 Jul 2023</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={attendanceSumbmit}>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label>Employee ID</label>
                          <select className={`form-control ${errors.EmployeeID ? 'is-invalid' : ''}`}
                          onChange={(e) => setEmployeeID(e.target.value)}
                          value={EmployeeID}>
                          <option value="">Select Employee</option>
                            {
                              
                                attendance.map((item, i)=>
                                <option value={item.EmployeeId}>{item.Name}</option>

                                )
                            }

                           
                          </select>
                          <span style={{color: "red",padding: "5px"}}>{errors.EmployeeID}</span>
                        </div>
                        {/* <div className="form-group col-md-4">
                          <label>Emp ID</label>
                          <input className="form-control" defaultValue="subhash" id disabled />
                        </div> */}
                        <div className="form-group col-md-4">
                          <label>Shift</label>
                          <input className="form-control" defaultValue="10:00 - 18:00" id disabled />
                        </div>
                      </div>							
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label>IN Date</label>
                          <DatePicker
                            className={`form-control ${errors.EntryDate ? 'is-invalid' : ''}`}
                            name="date"
                            value={dayjs(EntryDate)}
                            onChange={handleDateChanges}
                            format="YYYY-MM-DD"
                            disabledDate={isDateDisabled}
                          />
                          {/* <input type="date" className={`form-control ${errors.EntryDate ? 'is-invalid' : ''}`} placeholder onChange={(e) => setDate(e.target.value)}
                          value={EntryDate} /> */}
                          <spam style={{color: "red",padding: "5px"}}>{errors.EntryDate}</spam>
                        </div>
                        
                        <div className="form-group col-md-4">
                          <label>IN Time</label>
                          <TimePicker className={`form-control ${errors.EntryTime ? 'is-invalid' : ''}`}
                            value={moment(EntryTime, "HH:mm:ss")}// Set the default value to the current time
                            format="HH:mm:ss" // Specify the time format
                            onChange={handleTimeChanges} // Handle the time change event
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label>OUT Date</label>
                         
                            <DatePicker
                                className={`form-control ${errors.oDate ? 'is-invalid' : ''}`}
                                name="date"
                                value={dayjs(oDate)}
                                onChange={handleDateChanges}
                                format="YYYY-MM-DD"
                                disabledDate={isDateDisabled}
                              />
                          
                        </div>
                        <div className="form-group col-md-4">
                          <label>OUT Time</label>
                          <TimePicker className={`form-control ${errors.oTime ? 'is-invalid' : ''}`}
                             value={moment(oTime, "HH:mm:ss")} // Set the default value to the current time
                            format="HH:mm:ss" // Specify the time format
                            onChange={handleTimeChange} // Handle the time change event
                          />
                          {/* <input type="time"  className={`form-control ${errors.oTime ? 'is-invalid' : ''}`} placeholder onChange={(e) => setoTime(e.target.value)}
                          value={oTime} /> */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-8">
                          <label>Remark</label>
                          <textarea className="form-control" placeholder="Attendance Remark" rows={4} 
                          onChange={(e) => setRemark(e.target.value)}
                          value={remark} defaultValue={""} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Add Attendance</button>
                    </form>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>


        {/* success Model */}
        <Modal show={successModal} onHide={handleClose} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={handleClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          <Modal.Body>
              <div class="modal-body animate-check text-center">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#05d69e" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                    <polyline class="path check" fill="none" stroke="#05d69e" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                </svg>
                <div class="mt-3 text-success">{setvalues}</div>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button className="btn btn-primary" type="button" onClick={successAdd}>
              Ok
              </Button>
          </Modal.Footer>
        </Modal>

        
      
    </div>
  )
}

export default In_out_attendence
