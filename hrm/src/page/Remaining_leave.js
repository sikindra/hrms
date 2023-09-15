import React from 'react'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Remaining_leave = () => {
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
                  <div className="title-wrap"><h1 className="title is-4">Remaining Leave's</h1></div>
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
                        <input className="form-control" placeholder="Search.." id />
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
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header">
                      <h5>Remaining Leave Status</h5>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Total Leave</th>
                            <th>Used Leave</th>
                            <th>Remaining Leave</th>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>Rahul</td>
                            <td>0</td>
                            <td><a className="btn btn-outline-dark btn-sm tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#remainingLeave">0</a></td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>Rahul</td>
                            <td>0</td>
                            <td><a className="btn btn-outline-dark btn-sm tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#remainingLeave">0</a></td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>Rahul</td>
                            <td>0</td>
                            <td><a className="btn btn-outline-dark btn-sm tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#remainingLeave">0</a></td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>Rahul</td>
                            <td>0</td>
                            <td><a className="btn btn-outline-dark btn-sm tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#remainingLeave">0</a></td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>usd</td>
                            <td>Rahul</td>
                            <td>0</td>
                            <td><a className="btn btn-outline-dark btn-sm tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#remainingLeave">0</a></td>
                            <td>0</td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="table-page">Showing 1 to 10 of 16 entries</div>
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#">←</a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">→</a>
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
        <div className="modal fade" id="remainingLeave" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id>Remaining Leave Status</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <tbody><tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Leave Type</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Total Leave</th>
                        <th>Description</th>
                      </tr>
                      <tr>
                        <td>usd</td>
                        <td>Rahul</td>
                        <td>Casual</td>
                        <td>2023-07-17</td>
                        <td>2023-07-17</td>
                        <td>0</td>
                        <td>Travel</td>
                      </tr>
                    </tbody></table>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-dark" type="button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Remaining_leave
