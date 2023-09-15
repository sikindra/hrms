import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'
import moment from 'moment';
import { format, parseISO } from 'date-fns';
const { RangePicker } = DatePicker;

const Login_history = () => {
  const {http} = AuthUser();
  const [loginHistory,setData]=useState([])
  const [filterdata, setFilterdata]= useState([]);
  const currentDayjsDate = dayjs();
  const [dates, setDates] = useState([currentDayjsDate, currentDayjsDate]);
 console.log(dates);
  const [query, setQuery] = useState('');
  useEffect(()=>{
    
    http.get("loginList").then((res)=>{
    console.log(res.data.data)
    setData(res.data.data)
    setFilterdata(res.data.data)
  })

  },[]) 
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
      const searchdata = loginHistory.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(getSearch.toLowerCase())
    })
    setData(searchdata);
    } else {
      setData(filterdata);
    }
    setQuery(getSearch);
  }

  const handleDateChange = (selectedDates) => {
    if (selectedDates.length > 0) {
      const [startDate, endDate] = selectedDates;
      
      const filtered = loginHistory.filter((item) => {
        const itemDate = new Date(item.LoginTime);
        return itemDate >= startDate && itemDate <= endDate;
      });
      
      // Update the data state with the filtered data
      setData(filtered);
      
      // Set the dates state with the selected date range
      setDates([startDate, endDate]);
    } else {
      // If no date range is selected, reset the data state to the original data (filterdata)
      setData(filterdata);
      
      // Reset the dates state to an empty array or null, depending on your use case
      setDates([]);
    }
    
    // Set the query or perform other actions as needed
    
  };
  
  

  const [currentPage,setCurrentPage]=useState(1);
  const count = 1;
  const [recorsPerPage,setRecords]=useState('10');
  const npage = Math.ceil(loginHistory.length / recorsPerPage);
  const TotalCount = loginHistory.length;
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const lastIndex = currentPage * recorsPerPage;
  const firstIndex = lastIndex - recorsPerPage;
  const srNo = (currentPage - 1 ) * recorsPerPage;
  const records = loginHistory.slice(firstIndex, lastIndex);
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
                  <div className="title-wrap"><h1 className="title is-4">Login History</h1></div>
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
                  <div className="card-body">
                    <form className="form-inline">
                      <div className="form-group">
                      <RangePicker value={dates} onChange={handleDateChange} />
                      </div>
                      <div className="form-group">
                        <input className="form-control" placeholder="Search.." id  value={query} onChange={(e)=>handlesearch(e)}/>
                      </div>
                      {/* <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div> */}
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
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th>User Name</th>
                            <th>Login IP</th>
                            <th>Host Name</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Browser</th>
                            <th>Operating System</th>
                            <th>Remarks</th>
                          </tr>
                          {
                            records.map((itam,i)=>
                            <tr>
                            <td>{itam.UserName}</td>
                            <td>{itam.LoginIP}</td>
                            <td>{itam.HostName}</td>
                            <td><span className={(() => { if (itam.LoginStatus == 'ACTIVE') { return("tag is-success") }else{return("tag is-danger")} })()}>{(() => { if (itam.LoginStatus == 'ACTIVE'== '1') { return("Success") }else{return("Pending")} })()}</span></td>
                            
                            <td>
                            {(() => { 
                              const date = parseISO(itam.LoginTime); 
                              const formattedDate = format(date, "yyyy-MM-dd HH:mm");
                              return(formattedDate);
                             })()}</td>
                            <td>{itam.LoginBrowser}</td>
                            <td>{itam.LoginOperatingSystem}</td>
                            <td>{itam.Remark}</td>
                          </tr>
                            )
                          }
                          
                         
                        </tbody></table>
                    </div>
                  </div>
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
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>
      
    </div>
  )
  function changeCpage(id){
    setCurrentPage(id)

  }
}

export default Login_history
