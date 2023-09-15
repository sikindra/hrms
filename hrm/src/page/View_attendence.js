import axios from 'axios'
import moment, { duration } from 'moment'

import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthUser from './AuthUser'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const View_attendence = () => {
  
  
  const {http,setToken} = AuthUser();
  const [attendence,setData]=useState([])
  const UserType  = sessionStorage.getItem('UserType');
  const date = new Date();
            // Format the date to YYYY-MM-DD
            const formattedDate = date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
  const curTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
 
  
  useEffect(()=>{
    
    attendanceList();
 

  },[]);
  function attendanceList(){
    
      http.get("list_Attendance/"+sessionStorage.getItem('userId')).then((res)=>{
        setData(res.data.data)
        
      })
     
      

    
    
    
    
    

  }
  const [currentPage,setCurrentPage]=useState(1);
  const count = 1;
  const recorsPerPage = 10;
  const npage = Math.ceil(attendence.length / recorsPerPage);
  const TotalCount = attendence.length;
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const lastIndex = currentPage * recorsPerPage;
  const firstIndex = lastIndex - recorsPerPage;
  const srNo = (currentPage - 1 ) * recorsPerPage;
  const records = attendence.slice(firstIndex, lastIndex);
  
  //InList
  const [showdelSuccs, showdelSucc] = useState(false);
  const [showmess, showmes] = useState([]);
  const showdelClose = () => showdelSucc(false);

  const [cDate,setDate]=useState(false)
  useEffect(()=>{
    attendanceInList();
    
    
 

  },[]);
  const [show, setShow] = useState(false);
  function attendanceInList(){
    if(formattedDate){
      
      http.get("list_Attendances/"+sessionStorage.getItem('userId'))
      .then((res)=>{
        const EntryDate = res.data.data.ActionType;
        
        
        
        if(EntryDate == 'IN'){
         
          console.log(EntryDate)
          setShow(true)
        }else{
          setShow(false)

        }
        
        
      }).catch((error)=>{console.log(error.message)})

    }
  }
  
  const inAtten = () => {
    let body={"EmployeeId": sessionStorage.getItem('userId'),
        "EntryDate": formattedDate,"EntryTime":curTime,"ActionType":"IN"};
    http.post("list_attendance/",body).then((res)=>{
        console.log(res);
        if(res.data.success==100){
          attendanceList();
          attendanceInList();
          showdelSucc(true);
          showmes(res.data.message)
          

        }else{
          alert(res.data.message);

        }
      })
    
    
  }
  const ouAtten = () => {
    let body={"EntryDate": formattedDate,"EntryTime":curTime,"OutDate": formattedDate,"OutTime":curTime,"EmployeeId":sessionStorage.getItem('userId'),"ActionType":"OUT"};
    http.post("list_attendance/",body).then((res)=>{
        console.log(res);
        if(res.data.success==100){
          attendanceList();
          attendanceInList();
          showdelSucc(true);
          showmes(res.data.message)
          

        }else{
          alert(res.data.message);

        }
      })
    
    
  }
  
  
  

 
  

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
                  <div className="title-wrap"><h1 className="title is-4"></h1></div>
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
                <div className="card mb-3">
                  <div className="card-body d-flex justify-content-between">
                    <div className="form-group">
                    <div className="title-wrap"><h1 className="title is-4">Attendance Management</h1></div>
                    <p>Welcome {sessionStorage.getItem('userName')} Your EmployeeID: TD-{sessionStorage.getItem('userId')}</p>

                    </div>
                    {show ? (
                      <button onClick={ouAtten} className="btn btn-light tooltip-top btn-icon"> OUT </button>
                    ) : (
                      <button onClick={inAtten} className="btn btn-light tooltip-top btn-icon"> IN </button>
                    )}
                    {/* {(() => { if (cDate) { return (<button onClick={ouAtten} className="btn btn-light tooltip-top btn-icon">OUT</button>) }
                    else{ return (<button className="btn btn-light tooltip-top btn-icon" onClick={inAtten}>IN</button>) } })()} */}
                    	
                  </div>
                </div>
                <div className="card mb-3">

                  <div className="card-body d-flex justify-content-between">
                    <form className="form-inline">
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input type="radio" id="month" name="rdoAuthType" className="custom-control-input" defaultChecked />
                          <label htmlFor="month" className="custom-control-label">Month</label>
                        </div>
                        <div className="custom-control custom-radio ml-2">
                          <input type="radio" id="date" name="rdoAuthType" className="custom-control-input" />
                          <label htmlFor="date" className="custom-control-label">Date</label>
                        </div>	
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Year</option>
                          <option value={10}>2002</option>
                          <option value={25}>2003</option>
                          <option value={50}>2004</option>
                          <option value={100}>2005</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Month</option>
                          <option value={10}>Jan</option>
                          <option value={25}>Feb</option>
                          <option value={50}>Mar</option>
                          <option value={100}>Apr</option>
                        </select>
                      </div>
                      <div className="form-group d-none">
                        <input type="text" name="dates" id="dates" className="form-control date-range-input" placeholder="Date Range" />
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Employee</option>
                          <option value={10}>Aadil</option>
                          <option value={25}>Rajesh</option>
                          <option value={50}>Mohit</option>
                          <option value={100}>Aamir</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Entries</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </form>
                    <button type="button" className="btn btn-light tooltip-top btn-icon" data-tooltip="Download CSV"><i className="lnil lnil-download" /></button>	
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Shift</th>
                            <th>Entry</th>
                            <th>Exit</th>
                            <th>Hours</th>
                          </tr>
                          {
                              
                              records.map((item, i)=>
                              
                          <tr>
                            <td>{srNo + i +1}.</td>
                            <td>{item.Name}</td>
                           
                            <td>{item.Shift}</td>
                            <td>{item.EntryTime}</td>
                            <td>{item.OutTime}</td>
                            <td>
                            {(() => { 
                              const seconds = item.TotalPresenceTime;
                              const hours = Math.floor(seconds / 3600);
                              const minutes = Math.floor((seconds % 3600) / 60);
                              const remainingSeconds = seconds % 60;
                            
                              const formattedTime = moment().hours(hours).minutes(minutes).seconds(remainingSeconds).format('HH:mm:ss');
                            
                              
                              return (formattedTime);
                             })()}
                              
                              
                             </td>
                           
                           

                        </tr>
                              )}
                          
                         
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">Showing page {currentPage} of {TotalCount}&nbsp;(Total  Records)</div>
                  <ul className="pagination">
                  {
                          numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''} `} key={i}>
                             <a className="page-link" href="#" onClick={() => changeCpage(n)}>{n}</a>
                       

                            </li>

                          ))
                        }
                  </ul>
                </div>
              </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>
        <Modal show={showdelSuccs} onHide={showdelClose} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={showdelClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          <Modal.Body>
              <div className="modal-body animate-check text-center">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
			  <circle class="path circle" fill="none" stroke="#05d69e" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
			  <polyline class="path check" fill="none" stroke="#05d69e" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
			</svg>
                <div className="mt-3 text-success">{showmess}</div>
                {/* <input type="hidden" value={setvalues} /> */}
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button className="btn btn-primary" type="button" onClick={showdelClose}>
              Ok
              </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
  function changeCpage(id){
    setCurrentPage(id)

  }
}

export default View_attendence
