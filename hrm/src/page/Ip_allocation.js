import { format, parseISO } from 'date-fns';

import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Ip_allocation = () => {

  const {http} = AuthUser();
  const [ipAllocation,setData]=useState([])
  const [employee, setUserdata]= useState([]);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  
  useEffect( ()=>{
    getEmployee();
    },[]);
    function getEmployee(){
    const fetchData = async () => {
    try {
    const response = await http.get(`listemployee`);
    setUserdata(response.data.data)
    
    } catch (error) {
    console.error('Error fetching employee data:', error);
    }
    };
    fetchData();
    }
  useEffect(()=>{
    allcationIp();
    
    

  },[])
  function allcationIp(){
    const fetchData = async () => {
    try {
    const res = await http.get(`ipAllocation`);
    setData(res.data.data)
    setFilterdata(res.data.data)
    
    } catch (error) {
    console.error('Error fetching employee data:', error);
    }
    };
    fetchData();
    }
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
      const searchdata = ipAllocation.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
    })
    setData(searchdata);
    } else {
      setData(filterdata);
    }
    setQuery(getSearch);
  } 

  const [selectedEmployee, setSelectEmployee] = useState([]);
 
  
  const handleEmployee = (event) => {
    const getSearch = event.target.value;
    console.log(getSearch);
    setSelectEmployee(getSearch);
  
    if (getSearch.length > 0) 
    {     
      const searchData = ipAllocation.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
        
    })
    console.log(searchData);
      setData(searchData);
    } else {
      setData(filterdata);
    }
  };

  const [currentPage,setCurrentPage]=useState(1);
  const [recorsPerPage,setRecords]=useState('10');
  const count = 1;
 
  const npage = Math.ceil(ipAllocation.length / recorsPerPage);
  const TotalCount = ipAllocation.length;
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const lastIndex = currentPage * recorsPerPage;
  const firstIndex = lastIndex - recorsPerPage;
  const srNo = (currentPage - 1 ) * recorsPerPage;
  const records = ipAllocation.slice(firstIndex, lastIndex);


  //add ip allocation

  function validateIpAddress(ipAddress) {
    // Regular expressions for IPv4 and IPv6 validation
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  
    if (ipv4Pattern.test(ipAddress) || ipv6Pattern.test(ipAddress)) {
      return true;
    } else {
      return false;
    }
  }

  const [EmployeeId, setEmployeeId] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [successModal, showSucc] = useState(false);
  const [setvalues,setMessage]=useState([]);
  const handleClose = () => showSucc(false);
  const handlefaled = () => showFailed(false);
  const [failedModal, showFailed] = useState(false);
  const [errors, setErrors] = useState({});
  const AddipAllocation = async(e)=>{
    e.preventDefault();
      const newErrors = {};
      
      if (!EmployeeId) {
        newErrors.EmployeeId = 'Please Select Employee Name!. ';
      }
      if (!ipAddress) {
        newErrors.ipAddress = 'Please Enter You Ip Address!. ';
      }
      else if (ipAddress.length < 7 || ipAddress.length > 19) {
        newErrors.ipAddress = 'IP Address must be between 7 and 19 characters.';
      }
      else if (!validateIpAddress(ipAddress)) {
        newErrors.ipAddress = 'Please Enter You valid Ip Address';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; 
      }else{
        setErrors('');

        let body={"EmployeeId": EmployeeId,"IPAddress": ipAddress}
        
        http.post("ipAllocation/",body).then((res)=>{
          if(res.data.success=='100'){
           
            showSucc(true);
            setMessage(res.data.message)



          }else if(res.data.success=='101'){
           
            newErrors.EmployeeId = res.data.message;
            setErrors(newErrors);
          }else if(res.data.success=='102'){
           
            newErrors.ipAddress = res.data.message;
            setErrors(newErrors);
          }else{
            
            showFailed(true)
            setMessage(res.data.message)
            
          }

        },[])

      }
  }
  const addIpallcation = async()=>{
    allcationIp();
    showSucc(false);
   

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
                  <div className="title-wrap"><h1 className="title is-4">IP Allocation</h1></div>
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
                    <div className="d-flex justify-content-between">
                      <ul className="nav nav-tabs">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#allocateIp">Allocate IP</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#viewAllocation">View IP Allocation</a></li>
                      </ul>
                      <form className="form-inline">
                        <div className="form-group">
                          <input className="form-control" placeholder="Search.." id value={query} onChange={(e)=>handlesearch(e)} />
                        </div>
                       
                        <div className="form-group">
                        <select
                          className="form-control"
                          value={selectedEmployee} // Use the state variable to set the default value
                          onChange={handleEmployee}
                        >
                          <option value="">Select Employee</option>
                          {employee.map((emp) => (
                            <option key={emp.EmployeeId} value={emp.EmployeeId}>
                              {emp.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                        <div className="form-group">
                        <select className="form-control" onChange={(e) => setRecords(e.target.value)} value={recorsPerPage}>
                          <option>Entries</option>
                          
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                        </div>
                        
                      </form>
                    </div>
                    <div className="tab-content pt-2">
                      <div className="tab-pane fade show active" id="allocateIp">
                        <form onSubmit={AddipAllocation}>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label>Employee ID</label>
                              <select
                                className={`form-control ${errors.EmployeeId ? 'is-invalid' : ''}`}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                value={EmployeeId}
                              >
                                <option value="">Select Employee</option>
                                {employee.map((emp) => (
                                  <option key={emp.EmployeeId} value={emp.EmployeeId}>
                                    {emp.Name}
                                  </option>
                                ))}
                              </select>
                              <span style={{ color: 'red'}}>{errors.EmployeeId}</span>
                            </div>
                            
                            <div className="form-group col-md-4">
                              <label>IP Address</label>
                              <input type="text" className={`form-control ${errors.ipAddress ? 'is-invalid' : ''}`}
                                onChange={(e) => setIpAddress(e.target.value)}
                                value={ipAddress} />
                                <span style={{ color: 'red'}}>{errors.ipAddress}</span>
                            </div>
                          </div>
                          <input type="submit" className="btn btn-primary" defaultValue="Allocate IP" />
                          
                        </form>
                      </div>
                      <div className="tab-pane fade" id="viewAllocation">
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <tbody><tr>
                                <th>SrNo</th>
                                <th>ID</th>
                                <th>IP Address</th>
                                <th>Date &amp; Time</th>
                                <th>Tools</th>
                              </tr>
                              
                              {records.map((item,i)=>
                              <tr>
                            <td>{srNo + i +1}.</td>
                            <td>{item.EmployeeId}</td>
                            <td>{item.IPAddress}</td>                              
                            <td>{(() => { 
                              const date = parseISO(item.EntryDateTime); 
                              const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
                              return(formattedDate);
                             })()}</td>
                              <td>
                                <div className="buttons">
                                  <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                                </div>
                              </td>
                            </tr>
                              )}
                              
                            </tbody></table>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                        <div className="table-page">{currentPage} of {TotalCount}&nbsp;(Total  Records)</div>
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
              <Button className="btn btn-primary" type="button" onClick={addIpallcation} >
              Ok
              </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={failedModal} onHide={handlefaled} className="modal fade">
          <Modal.Header class="modal-header">
              <Modal.Title >
                Confirms
              </Modal.Title>
              <button class="close" type="button"  onClick={handlefaled}>
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
              <Button className="btn btn-primary" type="button" onClick={handlefaled} >
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

export default Ip_allocation
