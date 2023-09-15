import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Manage_holiday = () => {
  const getToken  = sessionStorage.getItem('token');
  const {http,setToken} = AuthUser();
  
  const [holiday, setData]= useState([]);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage,setRecords]=useState('10');
const totalPages = Math.ceil(holiday.length / itemsPerPage);
  useEffect( ()=>{
      getholiday();
      
    },[]);
    function getholiday(){
      http.get("list_holidy").then((res)=>{
        
        setData(res.data.data)
        setFilterdata(res.data.data)
        })


    }

    const handlesearch=(event)=>{
      const getSearch= event.target.value; 
      if(getSearch.length > 0)
      {     
        const searchdata = holiday.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
      })
      setData(searchdata);
      } else {
        setData(filterdata);
      }
      setQuery(getSearch);
    }

    const srNo = (currentPage - 1 ) * totalPages;
const handlePageChange = newPage => {
if (newPage >= 1 && newPage <= totalPages) {
setCurrentPage(newPage);
}
};
const renderPaginationLinks = () => {
const visiblePageCount = 5; // Number of visible page links
const pagesToShow = [];
if (currentPage <= visiblePageCount) {
for (let i = 1; i <= Math.min(visiblePageCount, totalPages); i++) {
pagesToShow.push(i);
}
if (totalPages > visiblePageCount) {
pagesToShow.push('...');
pagesToShow.push(totalPages - 2, totalPages - 1, totalPages);
}
} else if (currentPage >= totalPages - visiblePageCount + 1) {
pagesToShow.push(1, 2, 3);
if (totalPages > visiblePageCount) {
pagesToShow.push('...');
for (let i = totalPages - visiblePageCount + 1; i <= totalPages; i++) {
pagesToShow.push(i);
}
}
} else {
pagesToShow.push(1, 2, 3);
if (totalPages > visiblePageCount) {
pagesToShow.push('...');
}
for (let i = currentPage - 1; i <= currentPage + 1; i++) {
pagesToShow.push(i);
}
if (totalPages > visiblePageCount) {
pagesToShow.push('...');
}
pagesToShow.push(totalPages - 2, totalPages - 1, totalPages);
}
return pagesToShow.map(page => (
<li
   key={page}
   onClick={() =>
   handlePageChange(page)}
   className={`page-item ${page === currentPage  ? 'active' : ''} `}
   disabled={page === '...'}
   >
   <Link className="page-link" to="#">
   {page}</Link>
</li>
));
};
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const records = holiday.slice(indexOfFirstItem, indexOfLastItem);

const [delHoliday, showdel] = useState(false);
const delClose = () => showdel(false);
const [delId, setDelId] = useState([]);
const [showdelSuccs, showdelSucc] = useState(false);
const [showmess, showmes] = useState([]);
const showdelCloses = () => showdelSucc(false);
const DeleteList = async (item) =>{
    
    showdel(true)
    setDelId(item);

}
const delIdList = async (e) =>{
    http.delete("list_holidy/"+e).then((res)=>{
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
    getholiday();
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
                  <div className="title-wrap"><h1 className="title is-4">Mange Holiday</h1></div>
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
                    <Link to="/settings/add-holiday">
                    <button type="button" className="btn btn-outline-dark"><i className="lnil lnil-plus icon" />Add Holiday</button></Link>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody>
                            <tr>
                          <th>SrNo</th>
                            <th>Holiday Name</th>
                            <th>Holiday Date</th>
                           
                            <th>Tools</th>
                          </tr>
                          
                          {
                              
                              records.map((item, i)=>
                          <tr>
                            <td>{ i +1}.</td>
                            <td>{item.Description}</td>
                            <td>{(() => { if (item.HolidayDate) { 
                                const date = new Date(item.HolidayDate);
                                function formatDate(date) {
                                    const options = { day: '2-digit', month: 'short', year: 'numeric' };
                                    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
                        
                                    // Split the formatted date into day, month, and year parts
                                    const [month, day, year] = formattedDate.split(' ');
                        
                                    // Convert the month abbreviation to uppercase
                                    const capitalizedMonth = month.toUpperCase();
                        
                                    // Return the formatted date with uppercase month abbreviation and desired format
                                    return `${day} ${capitalizedMonth} ${year}`;
                                }
                                return(formatDate(date))
                             } })()}
                             </td>
                             <td>
                              <div className="buttons">
                             
                                <button type="button" className="button tooltip-top"  onClick={() => DeleteList(item.SrNo)}><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                              )}
                          
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">{currentPage} of {holiday.length}&nbsp;(Total Records)</div>
                  {holiday.map(holiday => (
                  <p key={holiday.id}>{holiday.name}</p>
                  ))}
                  <ul className="pagination">
                     <li
                        onClick={() =>
                        handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        > 
                        <Link className="page-link" to="#">
                        Previous</Link>
                     </li>
                     {renderPaginationLinks()}
                     <li
                        onClick={() =>
                        handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        >
                        <Link className="page-link" to="#">
                        Next</Link>
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
        <Modal show={delHoliday} onHide={delClose} className="modal fade">
          
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

export default Manage_holiday
