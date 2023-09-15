import React, { useEffect, useState } from 'react'
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const My_work_day = () => {
  const {http} = AuthUser();

  const [employee, setUserdata]= useState([]);
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
                  <div className="title-wrap"><h1 className="title is-4">My Work Days</h1></div>
                  <div>
                    <div className="d-inline-block mr-2">
                      <select className="form-control">
                        <option>Select Employee</option>
                        <option value={10}>yasmin</option>
                        <option value={25}>rahul</option>
                        <option value={50}>raj</option>
                        <option value={100}>jack</option>
                      </select>
                    </div>
                    <div className="balance-strip d-inline-block">
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
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header">
                      <h5>Working Sheet</h5>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Shift</th>
                            <th>Current Date</th>
                            <th>Current Time</th>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>usd</td>
                            <td>10:00 - 18:00</td>
                            <td>2023-07-17</td>
                            <td>18:32:26</td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-header">
                          <h5>Search by Calendar</h5>
                        </div>
                        <form>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Select Year</label>
                              <select className="form-control">
                                <option>Current Year</option>
                                <option value={10}>2004</option>
                                <option value={25}>2005</option>
                                <option value={50}>2006</option>
                                <option value={100}>2007</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Select Month</label>
                              <select className="form-control">
                                <option>Current Month</option>
                                <option value={10}>Jan</option>
                                <option value={25}>Feb</option>
                                <option value={50}>Mar</option>
                                <option value={100}>Apr</option>
                              </select>
                            </div>
                          </div>
                          <div className="alert alert-warning">this section is under construction</div>
                          <input type="text" name="birthday" id="birthday" defaultValue="10/24/1984" />	
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-header">
                      <h5>Attendance Summary</h5>
                    </div>
                    <div className="card">
                      <div className="card-body dashboard-data">
                        <div className="light-icons info-light">
                          <i className="lnil lnil-calender-alt-1" />
                        </div>
                        <span><strong>05</strong><small>Total Days</small></span>
                      </div>
                    </div>
                    <div className="card mt-2">
                      <div className="card-body dashboard-data">
                        <div className="light-icons success-light">
                          <i className="lnil lnil-checkmark-circle" />
                        </div>
                        <span><strong>00</strong><small>Total Present</small></span>
                      </div>
                    </div>
                    <div className="card mt-2">
                      <div className="card-body dashboard-data">
                        <div className="light-icons danger-light">
                          <i className="lnil lnil-cross-circle" />
                        </div>
                        <span><strong>05</strong><small>Total Absent</small></span>
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
      
    </div>
  )
}

export default My_work_day
