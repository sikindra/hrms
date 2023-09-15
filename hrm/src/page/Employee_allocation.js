import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Employee_allocation = () => {
  const {http,setToken} = AuthUser();
  const [allocate,setData]=useState([])
  useEffect(()=>{
    
    setAllocation();

  },[])
  function setAllocation(){
    http.get("list_allocation").then((res)=>{
    
      setData(res.data.data)
    })

  }
  const [currentPage,setCurrentPage]=useState(1);
  const count = 10;
  const recorsPerPage = 10;
  const npage = Math.ceil(allocate.length / recorsPerPage);
  const TotalCount = allocate.length;
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const lastIndex = currentPage * recorsPerPage;
  const firstIndex = lastIndex - recorsPerPage;
  const srNo = (currentPage - 1 ) * recorsPerPage;
  const allocates = allocate.slice(firstIndex, lastIndex);
  const [setManger,setMan]=useState([]);
  useEffect(()=>{
    
    http.get("list_employeeType/MAN").then((res)=>{
    console.log(res.data.data)
    setMan(res.data.data)
    
  })

  },[])
  const [setEmp,setEMP]=useState([]);
  useEffect(()=>{
    
    http.get("list_employeeType/EMP").then((res)=>{
    console.log(res.data.data)
    setEMP(res.data.data)
    
  })

  },[])
  const [setvalues,setval]=useState([]);
  const handleDelte = async(item) =>{
    setShow(true);
    setval(item)

  }
  const handleDeletes = async(e)=>{
    
    http.delete("list_allocation/"+e).then((res)=>{
      if(res.data.success==1){
        setShows(true);
        setShow(false);
        setval(res.data.data)
        setAllocation();
        
       


      }
    },[])
    

  }
  const allocatesDelete = () => {
    setShows(false);
    
   };
   const allocatesADD =() =>{
    
    setadd(false);
   }
  
   const [addModel, addShow] = useState(false);
  const [successModal, setShows] = useState(false);
  const [successModals, setadd] = useState(false);
  const addClose = () => addShow(false);
  const handleCloses = () => setShows(false);
  const [show, setShow] = useState(false);
  console.log(show);
  
  const handleClose = () => setShow(false);
  const allocateEmp = () =>{
    addShow(true);
  }
  const [managerId, setManagerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [errors, setErrors] = useState({});
  const [addMess, setMes] = useState([]);
  const allocateAdd = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!managerId) {
      newErrors.managerid = 'Please select a manager';
    }
    if (!employeeId) {
      newErrors.employeeid = 'Please select an employee';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
    else{
    

     let body={"AllocatedEmployeeId": managerId,"EmployeeId": employeeId,"AllocatedBy":"ADMIN"}
     
     http.post("list_allocation",body).then((res)=>{
      console.log(res.data)
      const newErrors = {};
      
      if(res.data.success==100){
        addShow(false);
        setMes(res.data.data)
        setadd(true);
        setAllocation();


      }else if(res.data.success==102){
        newErrors.employeeid = res.data.message;
        setErrors(newErrors);

      }
      

     })
     
      

    }

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
                  <div className="title-wrap"><h1 className="title is-4">Employee Allocation</h1></div>
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
                        <input className="form-control" placeholder="Search.." id />
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                        <option>Manager</option>
                      {
                        setManger.map((man)=>
                        

                        <option value={man.EmployeeId}>{man.Name}</option>
                        )
                      }
                         
                        </select>
                      </div>
                      {/* <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div> */}
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
                    {/* <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#allocateEmp"><i className="lnil lnil-plus icon" />Allocate Employee</button>	 */}
                    <button type="button" className="btn btn-outline-dark" onClick={allocateEmp}><i className="lnil lnil-plus icon" />Allocate Employee</button>	
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>Allocated By</th>
                            <th>Employee Name</th>
                            <th>Date &amp; Time</th>
                            <th>Allocated Emp Name</th>
                            <th>Status</th>
                            <th>Tools</th>
                          </tr>
                          {
                              
                              allocates.map((item, i)=>
                          <tr>
                            <td>{item.AllocatedBy}</td>
                            <td>{item.EmployeeName}</td>
                            <td>{item.AllocationDateTime}</td>
                            <td>{item.EmployeeUserName}</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" onClick={() => handleDelte(item.SrNo)}><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                              )}
                          
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">Showing page {currentPage} of {npage}&nbsp;(Total {TotalCount} Records)</div>
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
        {/* End of Page Wrapper */} 
        <div className="modal fade" id="Modal" >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body animate-check text-center">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" width={40}>
                  <circle className="path circle" fill="none" stroke="#f82a5e" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
                  <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                  <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="95.8" y1={38} x2="34.4" y2="92.2" />
                </svg>
                <div className="mt-3 text-danger">Are you sure to delete this Record permanently.</div>
                {/* <input type="hidden" value={setvalues} /> */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={handleClose}>No</button>
                <button className="btn btn-danger" type="button" onClick={() => handleDeletes(setvalues)} >Yes</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Confirm</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Are you sure to hold services for this destination!</div>
        <div class="modal-footer">
          <button class="btn btn-outline-dark" type="button" data-dismiss="modal">No</button>
          <button class="btn btn-primary" type="button">Yes</button>
        </div>
      </div>
    </div>
  </div>
        <Modal show={show} onHide={handleClose} className="modal fade">
          
        <Modal.Header className="modal-header">
          
            <Modal.Title >
            Confirm
            </Modal.Title>
            <button className="close" type="button"  onClick={handleClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          
        <div class="modal-body">Are you sure to hold services for this destination!</div>

           
            
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={handleClose}>
          No
          </Button>
           <Button className="btn btn-primary" type="button" onClick={() => handleDeletes(setvalues)}>
                   yes
                </Button>
        </Modal.Footer>
    </Modal>

  {/* success */}
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
        <div className="modal-body animate-check text-center">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" width={40}>
                  <circle className="path circle" fill="none" stroke="#f82a5e" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
                  <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                  <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="95.8" y1={38} x2="34.4" y2="92.2" />
                </svg>
                <div className="mt-3 text-danger">Are you sure to delete this Record permanently.</div>
                {/* <input type="hidden" value={setvalues} /> */}
              </div>
          
            

           
            
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-primary" type="button" onClick={allocatesDelete}>
                   Ok
                </Button>
                
        </Modal.Footer>
    </Modal>

    {/* ADD Model */}
    <Modal show={addModel} onHide={addClose} className="modal fade">
        <Modal.Header>
            <Modal.Title>
            Allocate Employee
            </Modal.Title>
            <button class="close" type="button"  onClick={addClose}>
            <span aria-hidden="true">×</span>
            </button>
        </Modal.Header>
        <form onSubmit={allocateAdd} >
        <Modal.Body>
              
                  <div className="form-group">
                    <label>Manager Name</label>
                    
                    <select className={`form-control ${errors.managerid ? 'is-invalid' : ''}`}
                  onChange={(e) => setManagerId(e.target.value)}
                  value={managerId}>
                    <option>Select Manager</option>
                      {
                        setManger.map((man)=>
                        

                        <option value={man.EmployeeId}>{man.Name}</option>
                        )
                      }
                      
                      
                    </select>
                  </div>
                  
                  
                  <div className="form-group">
                    <label>Select Employee</label>
                    <select className={`form-control ${errors.employeeid ? 'is-invalid' : ''}`}  onChange={(e) => setEmployeeId(e.target.value)} value={employeeId} >
                      <option>Select Employee</option>
                      {
                        setEmp.map((emp)=>
                        

                        <option value={emp.EmployeeId}>{emp.Name}</option>
                        )
                      }
                      
                    </select>
                    
                  </div>
                  <p style={{color: "red"}}>{errors.employeeid}</p>
                
          
            

           
            
        </Modal.Body>
        <Modal.Footer>
                <Button className="btn btn-outline-dark" type="button" onClick={addClose}>
                    Cancel
                </Button>
                <Button type='submit' className="btn btn-primary">
                Allocate Employee
                </Button>
                
        </Modal.Footer>
        </form>
    </Modal>

    <Modal show={successModals} onHide={addClose} className="modal fade">
          
        <Modal.Header class="modal-header">
          
            <Modal.Title >
            Confirms
            </Modal.Title>
            <button class="close" type="button"  onClick={addClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
        <div class="modal-body animate-check text-center">
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
			  <circle class="path circle" fill="none" stroke="#05d69e" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
			  <polyline class="path check" fill="none" stroke="#05d69e" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
			</svg>
      <div class="mt-3 text-success">{addMess}</div>
      </div>
          
            

           
            
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-primary" type="button" onClick={allocatesADD}>
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

export default Employee_allocation
