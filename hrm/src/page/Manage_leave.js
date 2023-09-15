import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'
import moment from 'moment';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const Manage_leave = () => {
  const UserType  = sessionStorage.getItem('UserType');

  const {http,setToken} = AuthUser();

  //Get List Data
  const [leave,setData]=useState([])
  const [leaves,setDatas]=useState([])
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  useEffect(()=>{
    leaveList();
    
    
  },[]);
  function leaveList(){
    if(UserType=='ADMIN'){
      http.get("list_leave/").then((res)=>{
       
        setData(res.data.data)
        setFilterdata(res.data.data)
      })
      http.get("list_leaves/").then((res)=>{
       
        setDatas(res.data.data)
      })
      

    }
    if(UserType=='EMP'||UserType=='HR'||UserType=='MAN'){
      http.get("list_leave/"+sessionStorage.getItem('userId')).then((res)=>{
       
        setData(res.data.data)
        setFilterdata(res.data.data)
      })
      http.get("list_leaves/"+sessionStorage.getItem('userId')).then((res)=>{
       
        setDatas(res.data.data)
      })
      

    }
  }
  ///Search Data
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    { 
      const searchdata = leave.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
    })
    
      setData(searchdata);
    } else {
      setData(filterdata);
    }
    setQuery(getSearch);
  }
  // Pagination Data
  
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage,setRecords]=useState('10');
const totalPages = Math.ceil(leave.length / itemsPerPage);
const pageNeighbours = 1; // Number of pages to display before and after the current page
const pages = [];
const srNo = (currentPage - 1 ) * totalPages;
for (let i = 1; i <= totalPages; i++) {
pages.push(i);
}
const getPageNumbers = () => {
if (totalPages <= 5) {
return pages;
}
const startPage = Math.max(1, currentPage - pageNeighbours);
const endPage = Math.min(totalPages, currentPage + pageNeighbours);
console.log()

const pagesToShow = [];
for (let i = startPage; i <= endPage; i++) {
pagesToShow.push(i);
}
if (startPage > 1) {
pagesToShow.unshift('...');
}
if (endPage < totalPages) {
pagesToShow.push('...');
}
return pagesToShow;
};
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const records = leave.slice(indexOfFirstItem, indexOfLastItem);
  
  //popup add leave
  const date = new Date();
  
  const currentDateTime = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [AddLeave, showadd] = useState(false);
  const addClose = () => showadd(false);
  const [dates, setDates] =useState('')
  const [category, setcategory] = useState('');
  const [remark, setRemark] = useState('');
  const [successModal, setShows] = useState(false);
  
  
  const [setvalues,setval]=useState([]);
  const handleCloses = () => setShows(false);
  
  
  const [errors, setErrors] = useState({});

  const ApplyLeave = async() => {
    showadd(true);
  }
  const LeaveAdd = async(e) => {
   
    e.preventDefault();
    const newErrors = {};
    if (!category) {
      newErrors.category = 'Please Enter You Category Name. ';
    }
    if (!dates) {
      newErrors.dates = 'Please Select Dates. ';
    }
    if (!remark){
      newErrors.remark = 'Please Enter You Category Name. ';

    }
   
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }else{
      const date1 = new Date(dates[0]);
      const date2 = new Date(dates[1]);
      const startDate = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + date1.getDate();
      const endDate = date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + date2.getDate();
      
      let body={"EmployeeId": sessionStorage.getItem('userId'),"RequestDateTime": currentDateTime,"LeaveStartDate": startDate,"LeaveEndDate":endDate,"LeaveCategoary":category,ReqDescription:remark}
      
     
      http.post("list_leave/",body).then((res)=>{
      
      if(res.data.success==100){
        showadd(false);
        setval(res.data.message);
        setShows(true);
        leaveList();
        
        
      }
      else{
        showadd(false);
        leaveList();
        setShows(res.data.message)
        

      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
};
const successAdd = () =>{
  setShows(false);
  
  
}

//Approved leave
const [ApproLeave, showAppro] = useState(false);
const [Approid, setAppro] = useState('');
const ApproClose  = () => showAppro(false);
const ApproveLeave = async(e) =>{
  setAppro(e)
  setcategory(e.LeaveCategoary);
  const LeaveStartDate = moment(e.LeaveStartDate).format("YYYY-MM-DD");
  const LeaveEndDate = moment(e.LeaveEndDate).format("YYYY-MM-DD");
  


  setDates([
    dayjs(LeaveStartDate),
    dayjs(LeaveEndDate),
  ]);
  
  showAppro(true);
 
  
}

const ApprovedLeave = async(e) =>{
 

  const date1 = new Date(dates[0]);
  const date2 = new Date(dates[1]);
  const startDate = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + date1.getDate();
  const endDate = date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + date2.getDate();
  const month = ("0" + (date1.getMonth() + 1)).slice(-2)
  const year = date1.getFullYear()
  const currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
  const currentDatetimes = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 
  const userId  = sessionStorage.getItem('userId');
  const aDesc = "leave request from "+startDate+ " to "+ endDate+" has been approved by "+ sessionStorage.getItem('userName')+ " on " +currentDatetimes;
 
  let body={"ApprovedBy": UserType,"RequestStatus": 'APPROVED',"ApprovedLeavedStartDate": startDate,"ApproveLeaveEndDate":endDate,"ApprovalDateTime":currentDatetimes,"EmployeeId":e.EmployeeId,"month":month,"year":year,"ApprovedLeaveDate":currentDate,"LoginUser":userId,"Description":remark,"aDesc":aDesc}
  http.put("list_leave/"+e.SrNo,body).then((res)=>{
    
    if(res.data.success==100){
      showAppro(false);
      setval(res.data.data);
      setShows(true);
      leaveList();
      
      
    }
    else{
      showAppro(false);
      leaveList();
      setShows(res.data.data)
      

    }
  }).catch((error)=>{
    console.log(error.message)
  })
}
const RejectLeave = async(e)=>{
  const date1 = new Date(e.LeaveStartDate);
  const date2 = new Date(e.LeaveEndDate);
  
  const userId  = sessionStorage.getItem('userId');
  const startDate = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + date1.getDate();
  const endDate = date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + date2.getDate();
  const month = ("0" + (date1.getMonth() + 1)).slice(-2)
  const year = date1.getFullYear()
  const currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
  const currentDatetimes = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const aDesc = "leave request from "+startDate+ " to "+ endDate+" has been rejected by "+sessionStorage.getItem('userName')+" on "+currentDatetimes;
 
  
  let body={"ApprovedBy": UserType,"RequestStatus": 'REJECTED',"ApprovedLeavedStartDate": startDate,"ApproveLeaveEndDate":endDate,"ApprovalDateTime":currentDatetimes,"EmployeeId":e.EmployeeId,"month":month,"year":year,"ApprovedLeaveDate":currentDate,"LoginUser":userId,"Description":remark,"aDesc":aDesc}
  http.put("list_leave/"+e.SrNo,body).then((res)=>{
    
    if(res.data.success==100){
      showAppro(false);
      setval("Rejected Leave Succssfully");
      setShows(true);
      leaveList();
      
      
    }
    else{
      showAppro(false);
      leaveList();
      setShows(res.data.data)
      

    }
  }).catch((error)=>{
    console.log(error.message)
  })

}

const [penLeave, showpending] = useState(false);

const pendingClose  = () => showpending(false);
const PendingLeave = async(e)=>{
  setAppro(e)
  
  const LeaveStartDate = moment(e.ApprovedLeavedStartDate).format("YYYY-MM-DD");
  const LeaveEndDate = moment(e.ApproveLeaveEndDate).format("YYYY-MM-DD");
  
 console.log(LeaveEndDate);

  setDates([
    dayjs(LeaveStartDate),
    dayjs(LeaveEndDate),
  ]);
  
  showpending(true);

}
const pendingLeave = async(e) =>{
  const date1 = new Date(dates[0]);
  const date2 = new Date(dates[1]);
 
  const userId  = sessionStorage.getItem('userId');
  const startDate = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + date1.getDate();
  const endDate = date2.getFullYear() + '-' + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + date2.getDate();
  const month = ("0" + (date1.getMonth() + 1)).slice(-2)
  const year = date1.getFullYear()
  const currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
  const currentDatetimes = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const aDesc = startDate+ " to "+ endDate+ " is still pending that need to be address";
  
  let body={"ApprovedBy": UserType,"RequestStatus": 'PENDING',"ApprovedLeavedStartDate": startDate,"ApproveLeaveEndDate":endDate,"ApprovalDateTime":currentDatetimes,"EmployeeId":e.EmployeeId,"month":month,"year":year,"ApprovedLeaveDate":currentDate,"LoginUser":userId,"Description":remark,"aDesc":aDesc}
  http.put("list_leave/"+e.SrNo,body).then((res)=>{
    
    if(res.data.success==100){
      showpending(false);
      setval("Pending Leave Succssfully");
      setShows(true);
      leaveList();
      
      
    }
    else{
      showpending(false);
      leaveList();
      setShows(res.data.data)
      

    }
  }).catch((error)=>{
    console.log(error.message)
  })

}


//Get Token
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
                  <div className="title-wrap"><h1 className="title is-4">Manage Leave</h1></div>
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
                    <form className="form-inline">
                      <div className="form-group">
                      <input className="form-control" placeholder="Search Employee Name.." name='name' value={query} onChange={(e)=>handlesearch(e)}    />
                      </div>
                      <div className="form-group">
                        {/* <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button> */}
                      </div>
                      <div className="form-group">
                      <select className="form-control" onChange={(e) =>
                              setRecords(e.target.value)} value={itemsPerPage}>
                              <option>Entries</option>
                              <option value={2}>2</option>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                           </select>
                      </div>
                    </form>
                    <button type="button" className="btn btn-danger" data-toggle="modal" onClick={ApplyLeave}><i className="lnil lnil-plus icon" />Apply Leave</button>	
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header">
                      <h5>Leave Status</h5>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Leave</th>
                            <th>Status</th>
                            <th>Description</th>
                            {(() => { if (UserType=='HR'||UserType=='MAN'||UserType=='ADMIN') { return (<th>Tools</th>) } })()}
                          </tr>
                          {
                            records.map((item)=>
                            <tr>

                            
                            <td>TD-{item.EmployeeId}</td>
                            <td>{item.Name}</td>
                            <td>{item.LeaveCategoary}</td>
                            <td>{(new Date(item.LeaveStartDate).getFullYear() + '-'+ ("0" + (new Date(item.LeaveStartDate).getMonth() + 1)).slice(-2) + '-' + new Date(item.LeaveStartDate).getDate())}</td>
                            <td>{(new Date(item.LeaveEndDate).getFullYear() + '-'+ ("0" + (new Date(item.LeaveEndDate).getMonth() + 1)).slice(-2) + '-' + new Date(item.LeaveEndDate).getDate())}</td>
                            <td>{item.TotalDays}</td>
                            <td><span className={(() => { if (item.RequestStatus == 'APPROVED') { return("tag is-success") }else if(item.RequestStatus == 'PENDING'){return("tag is-warning")} else{return("tag is-danger")} })()}>{(() => { if (item.RequestStatus == 'APPROVED') { return("APPROVED") }else if(item.RequestStatus == 'PENDING'){return("PENDING")}else{return("REJECTED")} })()}</span></td>
                           
                           
                            <td>{item.ReqDescription.substring(0, 250)}...</td>
                            {(() => { if (UserType=='HR'||UserType=='MAN' ||UserType=='ADMIN') { 
                              
                              if (item.RequestStatus=== "PENDING") {
                              return (
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Approved" onClick={() => ApproveLeave(item)} ><i className="lnil lnil-checkmark" /></button>
                                <button type="button" className="button tooltip-top" data-tooltip="Reject" onClick={() => RejectLeave(item)}><i className="lnil lnil-close" /></button>
                              </div>
                            </td>
                            
                            ) }else if(item.RequestStatus=== "APPROVED"){
                              return(
                                <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Approved" onClick={() => PendingLeave(item)} ><i className="lnil lnil-pencil" /></button>
                                <button type="button" className="button tooltip-top" data-tooltip="Reject" onClick={() => RejectLeave(item)}><i className="lnil lnil-close" /></button>
                              </div>
                            </td>
                              )

                            }else{
                              return(
                                <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Reject" data-toggle="modal" data-target="#rejectLeave"><i className="lnil lnil-close" /></button>
                              </div>
                            </td>
                              )
                              

                            } } })()}
                            

                          
                          </tr>


                            )

                          }
                          </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                <div className="table-page">Showing page {currentPage} of {totalPages}&nbsp;(Total Records)</div>
                  <ul className="pagination">
                     <li
                       onClick={prePage}
                        >
                        <Link className="page-link" to="#">
                        Previous</Link>
                     </li>
                     {getPageNumbers().map(pageNumber => (
                     <li
                        key={pageNumber}
                        onClick={() =>
                        setCurrentPage(pageNumber)}
                        // className={pageNumber === currentPage ? 'active' : ''}
                        className={`page-item ${pageNumber === currentPage  ? 'active' : ''} `}
                        >
                        <Link className="page-link" to="#">
                        {pageNumber}</Link>
                     </li>
                     ))}
                     <li
                        onClick={NexPage}
                        >
                        <Link className="page-link" to="#">
                        Next</Link> 
                     </li>
                  </ul>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header">
                      <h5>Leave Summary</h5>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                        {
                            leaves.map((item)=>
                          <tr>
                            <th>Approved</th>
                            <th><small className="tag is-success">{item.total_approved_count}</small></th>
                            <th>Pending</th>
                            <th><small className="tag is-warning">{item.total_pending_count}</small></th>
                            <th>Reject</th>
                            <th><small className="tag is-danger">{item.total_rejected_count}</small></th>
                          </tr>
                            )}
                           
                        </tbody></table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>
        <Modal show={AddLeave} onHide={addClose} className="modal fade">
          <Modal.Header className="modal-header">
              <Modal.Title >
                <h5 className="modal-title" id>Apply Leave</h5>
              </Modal.Title>
              <button className="close" type="button"  onClick={addClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          <form  onSubmit={LeaveAdd}>
              <Modal.Body>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Date &amp; Time</th>
                  </tr>
                  <tr>
                    <td>{sessionStorage.getItem('userId')}</td>
                    <td>{sessionStorage.getItem('userName')}</td>
                    <td>10:00 - 18:00</td>
                    <td>{currentDateTime}</td>
                  </tr>
                </table>
              </div>
              <div class="bg-light p-3 mt-3 rounded">
                <div class="row">
                  <div class="form-group col-md-6">
                <label>Leave Category</label>
                <select name="txtEmployeeLeaveCat" className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    onChange={(e) => setcategory(e.target.value)}
                    value={category} >
                  <option value="-1">Select Leave</option>
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Other">Other</option>
                </select>
                <span style={{ color: 'red'}}>{errors.category}</span>
              </div>
                  <div class="form-group col-md-6">
                <label>Leave Period</label>
                <RangePicker onChange={(values) =>{
                   setDates(values)
                }} />
                
                <span style={{ color: 'red'}}>{errors.dates}</span>
                </div>
                </div>
                <div class="form-group mb-0">
              <label>Remarks</label>
              <textarea className={`form-control ${errors.remark ? 'is-invalid' : ''}`}
                    onChange={(e) => setRemark(e.target.value)}
                    value={remark}  placeholder="remarks" rows="3"></textarea>
                    <span style={{ color: 'red'}}>{errors.remark}</span>

                </div>
              </div>
                
                
                
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-outline-dark" type="button" onClick={addClose}>Cancel</Button>
                <Button className="btn btn-primary" type="submit" >Apply Leave</Button>
              </Modal.Footer>
          </form>
        </Modal>

        {/* success model */}

        <Modal show={penLeave} onHide={pendingClose} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={pendingClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          
          <form  onSubmit={LeaveAdd}>
              <Modal.Body>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Date &amp; Time</th>
                  </tr>
                  <tr>
                    <td>{sessionStorage.getItem('userId')}</td>
                    <td>{sessionStorage.getItem('userName')}</td>
                    <td>10:00 - 18:00</td>
                    <td>{currentDateTime}</td>
                  </tr>
                </table>
              </div>
              <div class="bg-light p-3 mt-3 rounded">
                <div class="row">
                  <div class="form-group col-md-6">
                <label>Leave Category</label>
                <select name="txtEmployeeLeaveCat" className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    onChange={(e) => setcategory(e.target.value)}
                    value={category} >
                  <option value="-1">Select Leave</option>
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Other">Other</option>
                </select>
                <span style={{ color: 'red'}}>{errors.category}</span>
              </div>
                  <div class="form-group col-md-6">
                <label>Leave Period</label>
                <RangePicker value={dates} onChange={(values) =>{
                   setDates(values)
                }} />
               
                
                <span style={{ color: 'red'}}>{errors.dates}</span>
                </div>
                </div>
                <div class="form-group mb-0">
              <label>Remarks</label>
              <textarea className={`form-control ${errors.remark ? 'is-invalid' : ''}`}
                    onChange={(e) => setRemark(e.target.value)}
                      placeholder="remarks" rows="3"></textarea>
                    <span style={{ color: 'red'}}>{errors.remark}</span>

                </div>
              </div>
          </Modal.Body>
          </form>
          <Modal.Footer>
              <Button className="btn btn-outline-dark" type="button" onClick={pendingClose}>Cancel</Button>
              <Button class="btn btn-primary" type="button" onClick={() => pendingLeave(Approid)} >Leave Pending</Button>
          </Modal.Footer>
        </Modal>


        <Modal show={ApproLeave} onHide={ApproClose} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={ApproClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          
          <form  onSubmit={LeaveAdd}>
              <Modal.Body>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Date &amp; Time</th>
                  </tr>
                  <tr>
                    <td>{sessionStorage.getItem('userId')}</td>
                    <td>{sessionStorage.getItem('userName')}</td>
                    <td>10:00 - 18:00</td>
                    <td>{currentDateTime}</td>
                  </tr>
                </table>
              </div>
              <div class="bg-light p-3 mt-3 rounded">
                <div class="row">
                  <div class="form-group col-md-6">
                <label>Leave Category</label>
                <select name="txtEmployeeLeaveCat" className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    onChange={(e) => setcategory(e.target.value)}
                    value={category} >
                  <option value="-1">Select Leave</option>
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Other">Other</option>
                </select>
                <span style={{ color: 'red'}}>{errors.category}</span>
              </div>
                  <div class="form-group col-md-6">
                <label>Leave Period</label>
                <RangePicker value={dates} onChange={(values) =>{
                   setDates(values)
                }} />
               
                
                <span style={{ color: 'red'}}>{errors.dates}</span>
                </div>
                </div>
                <div class="form-group mb-0">
              <label>Remarks</label>
              <textarea className={`form-control ${errors.remark ? 'is-invalid' : ''}`}
                    onChange={(e) => setRemark(e.target.value)}
                      placeholder="remarks" rows="3"></textarea>
                    <span style={{ color: 'red'}}>{errors.remark}</span>

                </div>
              </div>
          </Modal.Body>
          </form>
          <Modal.Footer>
              <Button className="btn btn-outline-dark" type="button" onClick={ApproClose}>Cancel</Button>
              <Button class="btn btn-primary" type="button" onClick={() => ApprovedLeave(Approid)} >Leave Approved</Button>
          </Modal.Footer>
        </Modal>
        {/* Approved Popup */}
        <Modal show={successModal} onHide={handleCloses} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={handleCloses}>
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
  function prePage(){
    if(currentPage !==1){
      setCurrentPage(currentPage - 1)
  
    }
    
    }
  function NexPage(){
    if(currentPage !== totalPages){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default Manage_leave
