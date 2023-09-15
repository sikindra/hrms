import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const View_designation = () => {
  const getToken  = sessionStorage.getItem('token');
  const {http,setToken} = AuthUser();
  
  const [designation, setData]= useState([]);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  useEffect( ()=>{
      getEmployee();
      
    },[]);
    function getEmployee(){
      http.get("list_designation").then((res)=>{
        setData(res.data.data)
        setFilterdata(res.data.data)
        })


    }

    const handlesearch=(event)=>{
      const getSearch= event.target.value; 
      if(getSearch.length > 0)
      {     
        const searchdata = designation.filter((item) => {
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

  const totalPages = Math.ceil(designation.length / itemsPerPage);

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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designation.slice(indexOfFirstItem, indexOfLastItem);

  //add poupup
  const [addDesignation, showadd] = useState(false);
  const [addShow, setAdd] = useState([]);
  const addClose = () => showadd(false);
  const [designationName, setdesignationName] = useState('');
  const [gracePeriodMonth, setgracePeriodMonth] = useState('1');
  console.log(gracePeriodMonth)
  const [gracePeriods, setgracePeriod] = useState('');
  const [successModal, setShows] = useState(false);
  const [errors, setErrors] = useState({});
  const [setvalues,setval]=useState([]);
  const handleCloses = () => setShows(false);
  
 

  const DesignationList = async() => {
    showadd(true);
    setAdd("Add Designation");
   
    
  

  }
  
  const successAdd = () =>{
    setShows(false);
    window.location = "/settings/view-designation";
  }
  const addDes = async(e) => {
   
    e.preventDefault();
    const newErrors = {};
    if (!designationName) {
      newErrors.designationName = 'Please Enter You Designation Name. ';
    }
    if (!gracePeriods) {
      newErrors.gracePeriods = 'Please Enter You grace Periods. ';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }else{
      let body={"DesignationCode": designationName,"GracePeriod": gracePeriods,"EnableGracePeriod": gracePeriodMonth}
      
     
     http.post("list_designation",body).then((res)=>{
      
      if(res.data.success==1){
        showadd(false);
        setval(res.data.data);
        setShows(true);
      }
      else{
        showadd(false);
        showdelSucc(true);
        setShows(res.data.message)

      }
    })
  }
  
};
//update
const [did, designationId] = useState('');
const [updateShow, showUpdate] = useState(false);
const updateClose = () => showUpdate(false);
const updatelist = async(item)=>{
  showUpdate(true);
  setAdd("Update Designation");
  setdesignationName(item.DesignationCode);
  setgracePeriod(item.GracePeriod);
  designationId(item.DesignationId)
  
    
  if(item.EnableGracePeriod==1){
    setgracePeriodMonth('1');

  }else{
    setgracePeriodMonth('0');
  }
  
  
  
  
}

const updateDes = async(e) => {
   
  e.preventDefault();
  const newErrors = {};
  if (!designationName) {
    newErrors.designationName = 'Please Enter You Designation Name. ';
  }
  if (!gracePeriods) {
    newErrors.gracePeriods = 'Please Enter You grace Periods. ';
  }
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return; 
  }else{
    
    let body={"DesignationCode": designationName,"GracePeriod": gracePeriods,"EnableGracePeriod": gracePeriodMonth}
    const id= did;
    console.log(id)
   
   http.patch("list_designation/"+id,body).then((res)=>{
    
    if(res.data.success==1){
      showUpdate(false);
      setval(res.data.message);
      setShows(true);
    }
    else{
      showUpdate(false);
      showdelSucc(true);
      setShows(res.data.message)

    }})
  }
}
//delet Popup
  const [delDesignation, showdel] = useState(false);
  const delClose = () => showdel(false);
  const [delId, setDelId] = useState([]);
  const [showdelSuccs, showdelSucc] = useState(false);
  const [showmess, showmes] = useState([]);
  const showdelCloses = () => showdelSucc(false);
  const DeleteList = async (item) =>{
    showdel(true)
    console.log(item);
    setDelId(item);

  }
  const delIdList = async (e) =>{
    http.delete("list_designation/"+e).then((res)=>{
      if(res.data.success==1){
        showdel(false);
        showdelSucc(true);
        showmes(res.data.data)
      }else{
        showdel(false);
        showdelSucc(true);
        showmes(res.data.message)

      }
    },[])
    
  }
  const desDelete = async() =>{
    showdelSucc(false);
    getEmployee();
  }
 

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
                  <div className="title-wrap"><h1 className="title is-4">View Designation</h1></div>
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
                        <input className="form-control" placeholder="Search.." name='name' value={query} onChange={(e)=>handlesearch(e)} />
                      </div>
                      {/* <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div> */}
                      <div className="form-group">
                        <select className="form-control" onChange={(e) => setRecords(e.target.value)} value={itemsPerPage}>
                          <option>Entries</option>
                          <option value={2}>2</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </form>
                    <button type="button" className="btn btn-outline-dark" onClick={DesignationList}><i className="lnil lnil-plus icon" />Add Designation</button>	
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                          <th>SrNo</th>
                            <th>Designation Name</th>
                            <th>Grace Period (Minutes)</th>
                            <th>Grace Period Status</th>
                            <th>Tools</th>
                          </tr>
                          {
                              
                              currentItems.map((item, i)=>
                          <tr>
                            <td>{ i +1}.</td>
                            <td>{item.DesignationCode}</td>
                            <td>{item.GracePeriod}</td>
                            <td><span className={(() => { if (item.EnableGracePeriod == '1') { return("tag is-success") }else{return("tag is-danger")} })()}>{(() => { if (item.EnableGracePeriod == '1') { return("Enable") }else{return("Disable")} })()}</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" onClick={() => updatelist(item)}><i className="lnil lnil-pencil" /></button>
                                <button type="button" className="button tooltip-top"  onClick={() => DeleteList(item.DesignationId)}><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                              )}
                          
                          
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">{currentPage} of {designation.length}&nbsp;(Total Records)</div>
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
          {/* End of Content Wrapper */} 
        </div>
        
        
       

        {/* add Popup */}
        <Modal show={addDesignation} onHide={addClose} className="modal fade">
          
        <Modal.Header className="modal-header">
          
            <Modal.Title >
            <h5 className="modal-title" id>{addShow}</h5>
            </Modal.Title>
            <button className="close" type="button"  onClick={addClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <form onSubmit={addDes} >
        <Modal.Body>
        <div className="form-group">
                  <label>Designation Name</label>
                  <input type="text" className={`form-control ${errors.designationName ? 'is-invalid' : ''}`}
                  
                  onChange={(e) => setdesignationName(e.target.value)}
                  value={designationName}
                  
                  />
                  <span style={{ color: 'red'}}>{errors.designationName}</span>
                </div>
                
                <div className="form-group">
                  <label>Grace Period (Minutes)</label>
                  <input type="number" pattern="[0-9]*" className={`form-control ${errors.gracePeriods ? 'is-invalid' : ''}`}
                   
                   onChange={(e) => setgracePeriod(e.target.value)}
                  value={gracePeriods} />
                  <span style={{ color: 'red'}}>{errors.gracePeriods}</span>
                </div>
                <div className="form-group">
                  <label className="d-block">Grace Period (Minutes)</label>
                  <div className="custom-control custom-radio">
                  <input
                      type="radio"
                      id="gracePeriodMonth"
                      
                      value="1"
                      checked={gracePeriodMonth === '1'}
                      onChange={(e) => setgracePeriodMonth(e.target.value)}
                      className="custom-control-input" defaultChecked
                       />
                    <label htmlFor="gracePeriodMonth" className="custom-control-label">Enable</label>
                    
                  </div>
                  <div className="custom-control custom-radio ml-2">
                    

                    <input
                        type="radio"
                        id="gracePeriodDay"
                        
                        value="0"
                        checked={gracePeriodMonth === '0'}
                        onChange={(e) => setgracePeriodMonth(e.target.value)}
                        className="custom-control-input" defaultChecked
                      />


                    <label htmlFor="gracePeriodDay" className="custom-control-label">Disable</label>
                  </div>
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" onClick={addClose}>Cancel</Button>
           <Button className="btn btn-primary" type="submit" >Add Designation</Button>
        </Modal.Footer>
        </form>
    </Modal>
    <Modal show={updateShow} onHide={updateClose} className="modal fade">
          
        <Modal.Header className="modal-header">
          
            <Modal.Title >
            <h5 className="modal-title" id>{addShow}</h5>
            </Modal.Title>
            <button className="close" type="button"  onClick={updateClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <form onSubmit={updateDes} >
        <Modal.Body>
        <div className="form-group">
                  <label>Designation Name</label>
                  <input type="text" className={`form-control ${errors.designationName ? 'is-invalid' : ''}`}
                  
                  onChange={(e) => setdesignationName(e.target.value)}
                  value={designationName}
                  
                  />
                  <input type="hidden" value={did}  onChange={(e) => designationId(e.target.value)}/>
                  
                  <span style={{ color: 'red'}}>{errors.designationName}</span>
                </div>
                
                <div className="form-group">
                  <label>Grace Period (Minutes)</label>
                  <input type="number" pattern="[0-9]*" className={`form-control ${errors.gracePeriods ? 'is-invalid' : ''}`}
                   
                   onChange={(e) => setgracePeriod(e.target.value)}
                  value={gracePeriods} />
                  <span style={{ color: 'red'}}>{errors.gracePeriods}</span>
                </div>
                <div className="form-group">
                  <label className="d-block">Grace Period (Minutes)</label>
                  <div className="custom-control custom-radio">
                  <input
                      type="radio"
                      id="gracePeriodMonth"
                      
                      value="1"
                      checked={gracePeriodMonth === '1'}
                      onChange={(e) => setgracePeriodMonth(e.target.value)}
                      className="custom-control-input" defaultChecked
                       />
                    <label htmlFor="gracePeriodMonth" className="custom-control-label">Enable</label>
                    
                  </div>
                  <div className="custom-control custom-radio ml-2">
                    

                    <input
                        type="radio"
                        id="gracePeriodDay"
                        
                        value="0"
                        checked={gracePeriodMonth === '0'}
                        onChange={(e) => setgracePeriodMonth(e.target.value)}
                        className="custom-control-input" defaultChecked
                      />


                    <label htmlFor="gracePeriodDay" className="custom-control-label">Disable</label>
                  </div>
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" onClick={updateClose}>Cancel</Button>
           <Button className="btn btn-primary" type="submit" >Update Designation</Button>
        </Modal.Footer>
        </form>
    </Modal>
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

   {/* Delete Popup */}
   <Modal show={delDesignation} onHide={delClose} className="modal fade">
          
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
           <Button className="btn btn-primary" type="button" onClick={() => delIdList(delId)}>
                   yes
                </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showdelSuccs} onHide={showdelCloses} className="modal fade">
          
        <Modal.Header class="modal-header">
          
            <Modal.Title >
            Confirms
            </Modal.Title>
            <button class="close" type="button"  onClick={showdelCloses}>
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
                <div className="mt-3 text-danger">{showmess}</div>
                {/* <input type="hidden" value={setvalues} /> */}
              </div>
          
            

           
            
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-primary" type="button" onClick={desDelete}>
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

export default View_designation
