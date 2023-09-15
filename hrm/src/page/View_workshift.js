import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'
import AuthUser from './AuthUser'
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';

const View_workshift = () => {

  const {http} = AuthUser();
 
  const [listWorkshift,setData]=useState([]);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  useEffect(()=>{
    workshiftlist();
   

  },[])
  function workshiftlist(){
    http.get("list_workshift").then((res)=>{
    
      setData(res.data.data)
      setFilterdata(res.data.data)
    })
  }

  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
      const searchdata = listWorkshift.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
    })
    setData(searchdata);
    } else {
      setData(filterdata);
    }
    setQuery(getSearch);
  }
  const [currentPage, setCurrentPage] = useState(1);
  
  const [itemsPerPage,setRecords]=useState('10');

  const totalPages = Math.ceil(listWorkshift.length / itemsPerPage);

  const pageNeighbours = 1; // Number of pages to display before and after the current page
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return pages;
    }

    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);

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

  // Logic to calculate the current slice of data to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listWorkshift.slice(indexOfFirstItem, indexOfLastItem);

  // add
  const [shiftsTime, setshiftsTime] = useState('');
  const [shifteTime, setshifteTime] = useState('');
  
  const [errors, setErrors] = useState({});
  const addWorkshifts = async() => {
    showadd(true);
    }
    const [addWorksshift, showadd] = useState(false);
    const addClose = () => showadd(false);
    const [successModal, showSucc] = useState(false);
    const handleClose = () => showSucc(false);
    const handlefaled = () => showFailed(false);
    const [failedModal, showFailed] = useState(false);
    const [setvalues,setMessage]=useState([]);

    const WorkshiftAdd = async(e)=>{
      e.preventDefault();
      const newErrors = {};
      if (!shiftsTime) {
        newErrors.shiftsTime = 'Please Enter You Shift Start Time!. ';
      }
      if (!shifteTime) {
        newErrors.shifteTime = 'Please Enter You Shift Start Time!. ';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; 
      }else{
        let body={"WorkShiftFrom": shiftsTime?.format('h:mm A'),"WorkShiftTo": shifteTime?.format('h:mm A')}
        
        http.post("list_workshift/",body).then((res)=>{
          if(res.data.success=='100'){
            showadd(false)
            workshiftlist();
            showSucc(true);
            setMessage(res.data.message)



          }else{
            showadd(false)
            showFailed(true)
            setMessage(res.data.message)
            
          }

        },[])
      }
      

      

    }
    //update
    const [updateWorksshift, showUpdate] = useState(false);
    const updateClose = () => showUpdate(false);
    const [id, workshiftId] = useState('');
    
    const updatelist = async(item)=>{
      
      setshiftsTime(dayjs(moment(item.WorkShiftFrom, 'hh:mm A')))
      setshifteTime(dayjs(moment(item.WorkShiftTo, 'hh:mm A')))
      workshiftId(item.SrNo)
      showUpdate(true);
     
    }
    const WorkshiftUpdate = async(e)=>{
      e.preventDefault();
      const newErrors = {};
      if (!shiftsTime) {
        newErrors.shiftsTime = 'Please Enter You Shift Start Time!. ';
      }
      if (!shifteTime) {
        newErrors.shifteTime = 'Please Enter You Shift Start Time!. ';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; 
      }else{
        let body={"WorkShiftFrom": shiftsTime,"WorkShiftTo": shifteTime}
        
        http.put("list_workshift/"+id,body).then((res)=>{
          if(res.data.success=='100'){
            showUpdate(false)
            workshiftlist();
            showSucc(true);
            setMessage(res.data.message)



          }else{
            showUpdate(false)
            showFailed(true)
            setMessage(res.data.message)
            
          }

        },[])
      }
    }

    //Delete popup
    const [Wid, setDelId] = useState('');
    const [delWorkshift, showDel] = useState(false);
    const delClose = () => showDel(false);
    const DelWork = async(Id) =>{
      showDel(true)
      setDelId(Id)
    }
    const delWorkShiftId = async(id)=>{
      http.delete("list_workshift/"+Wid).then((res)=>{
        if(res.data.success=='100'){
          showDel(false)
          workshiftlist();
          showFailed(true);
          setMessage(res.data.message)



        }else{
          showDel(false)
          showFailed(true)
          setMessage(res.data.message)
          
        }

      },[])
      
    }
   
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <Sidebar1 />

        <div id="content-wrapper" className="d-flex flex-column"> 
            {/* Main Content */}
            <div id="content" className="page-content-wrapper"> 
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="page-title justify-content-between">
                  <div className="title-wrap"><h1 className="title is-4">View Workshift</h1></div>
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
                        <input className="form-control" placeholder="Search.." name='name' value={query} onChange={(e)=>handlesearch(e)}/>
                      </div>
                      {/* <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div> */}
                      <div className="form-group">
                        <select className="form-control" onChange={(e) => setRecords(e.target.value)} value={itemsPerPage}>
                          <option>Entries</option>
                          <option value={1}>1</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </form>
                    <button type="button" className="btn btn-outline-dark" onClick={addWorkshifts}><i className="lnil lnil-plus icon" />Add Workshift</button>	
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            
                            <th>Shift Start</th>
                            <th>Shift End</th>
                            <th>Tools</th>
                          </tr>
                          {currentItems.map((item) =>
                           <tr>
                           
                           <td>{item.WorkShiftFrom}</td>
                           <td>{item.WorkShiftTo}</td>
                           <td>
                             <div className="buttons">
                               <button type="button" className="button tooltip-top" data-tooltip="Edit" onClick={() => updatelist(item)}><i className="lnil lnil-pencil" /></button>
                               <button type="button" className="button tooltip-top" data-tooltip="Delete" onClick={() => DelWork(item.SrNo)}><i className="lnil lnil-trash" /></button>
                             </div>
                           </td>
                         </tr>
                          
                          )}
                         
                          
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">{currentPage} of {listWorkshift.length}&nbsp;(Total Records)</div>
                  <ul className="pagination">
                          <li
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            
                            <Link className="page-link" to="#">Previous</Link>
                          </li>
                          {getPageNumbers().map(pageNumber => (
                            <li
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              // className={pageNumber === currentPage ? 'active' : ''}
                              className={`page-item ${pageNumber === currentPage  ? 'active' : ''} `}
                            >
                              
                              <Link className="page-link" to="#">{pageNumber}</Link>
                            </li>
                          ))}
                          <li
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <Link className="page-link" to="#">Next</Link> 
                          </li>
                        </ul>
                </div>
              </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>

      </div>
      <Modal show={addWorksshift} onHide={addClose} className="modal fade">
          <Modal.Header className="modal-header">
              <Modal.Title >
                <h5 className="modal-title" id>Add WorkShift</h5>
              </Modal.Title>
              <button className="close" type="button"  onClick={addClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          <form onSubmit={WorkshiftAdd} >
              <Modal.Body>
              <div className="form-group">
                  <label>Shift Start Time</label>
                  
                  <TimePicker className={`form-control ${errors.shiftsTime ? 'is-invalid' : ''}`}
                    use12Hours  // Enable AM/PM selection
                    format="h:mm A"  // Format with AM/PM
                    onChange={setshiftsTime}
                  />
                </div>
                <span style={{ color: 'red'}}>{errors.shiftsTime}</span>
                <div className="form-group">
                  <label>Shift End Time</label>

                  <TimePicker className={`form-control ${errors.shifteTime ? 'is-invalid' : ''}`}
                    use12Hours  // Enable AM/PM selection
                    format="h:mm A"  // Format with AM/PM
                    onChange={setshifteTime}
                  />
                 
                </div>
                <span style={{ color: 'red'}}>{errors.shifteTime}</span>

               
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-outline-dark" type="button" onClick={addClose}>Cancel</Button>
                <Button className="btn btn-primary" type="submit" >Add WorkShift</Button>
              </Modal.Footer>
          </form>
        </Modal>
        {/* update model */}
        <Modal show={updateWorksshift} onHide={updateClose} className="modal fade">
          <Modal.Header className="modal-header">
              <Modal.Title >
                <h5 className="modal-title" id>Update WorkShift</h5>
              </Modal.Title>
              <button className="close" type="button"  onClick={updateClose}>
              <span aria-hidden="true">×</span>
              </button>
          </Modal.Header>
          <form onSubmit={WorkshiftUpdate} >
              <Modal.Body>
              <div className="form-group">
                  <label>Shift Start Time</label>
                  <TimePicker className={`form-control ${errors.shiftsTime ? 'is-invalid' : ''}`}
                    use12Hours  // Enable AM/PM selection
                    format="h:mm A"  // Format with AM/PM
                    onChange={setshiftsTime}
                    value={shiftsTime}
                  />
                  
                </div>
                <span style={{ color: 'red'}}>{errors.shiftsTime}</span>
                <div className="form-group">
                  <label>Shift End Time</label>
                  <TimePicker className={`form-control ${errors.shiftsTime ? 'is-invalid' : ''}`}
                    use12Hours  // Enable AM/PM selection
                    format="h:mm A"  // Format with AM/PM
                    onChange={setshifteTime}
                    value={shifteTime}
                  />
                  
                </div>
                <span style={{ color: 'red'}}>{errors.shifteTime}</span>

               
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-outline-dark" type="button" onClick={updateClose}>Cancel</Button>
                <Button className="btn btn-primary" type="submit" >Update WorkShift</Button>
              </Modal.Footer>
          </form>
        </Modal>

        {/* //success */}
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
              <Button className="btn btn-primary" type="button" onClick={handleClose} >
              Ok
              </Button>
          </Modal.Footer>
        </Modal>

        {/* FAled Errror */}
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

        {/* //delete  */}
        <Modal show={delWorkshift} onHide={delClose} className="modal fade">
          <Modal.Header className="modal-header">
              <Modal.Title >
                Confirm
              </Modal.Title>
              <button className="close" type="button"  onClick={delClose}>
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
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={delClose}>
              No
              </Button>
              <Button className="btn btn-primary" type="button" onClick={() => delWorkShiftId(Wid)}>
              yes
              </Button>
          </Modal.Footer>
        </Modal>

      
    </div>
  )
}

export default View_workshift
