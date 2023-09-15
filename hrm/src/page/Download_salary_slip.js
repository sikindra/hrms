import React from 'react'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Download_salary_slip = () => {
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
                  <div className="title-wrap"><h1 className="title is-4">Salary Slip</h1></div>
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
                    </form>
                    <button type="button" className="btn btn-light tooltip-top btn-icon" data-tooltip="Print"><i className="lnil lnil-printer" /></button>	
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-center lh-1 mb-2">
                          <h6>Payslip</h6> <span>Payment slip for the month of June 2021</span>
                        </div>
                        <div className="d-flex justify-content-end"> <span>Working Branch: NOIDA</span> </div>
                        <div className="row">
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-6">
                                <div> <strong>EMP Code</strong> <small>39124</small> </div>
                              </div>
                              <div className="col-md-6">
                                <div> <strong>EMP Name</strong> <small>Ashok</small> </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div> <strong>PF No.</strong> <small>101523065714</small> </div>
                              </div>
                              <div className="col-md-6">
                                <div> <strong>NOD</strong> <small>28</small> </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div> <strong>ESI No.</strong> <small /> </div>
                              </div>
                              <div className="col-md-6">
                                <div> <strong>Mode of Pay</strong> <small>SBI</small> </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div> <strong>Designation</strong> <small>Marketing Staff (MK)</small> </div>
                              </div>
                              <div className="col-md-6">
                                <div> <strong>Ac No.</strong> <small>*******0701</small> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <table className="table table-bordered mt-4">
                          <tbody><tr className="bg-light">
                              <th scope="col">Earnings</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Deductions</th>
                              <th scope="col">Amount</th>
                            </tr>
                            <tr>
                              <th scope="row">Basic</th>
                              <td>16250.00</td>
                              <td>PF</td>
                              <td>1800.00</td>
                            </tr>
                            <tr>
                              <th scope="row">DA</th>
                              <td>550.00</td>
                              <td>ESI</td>
                              <td>142.00</td>
                            </tr>
                            <tr>
                              <th scope="row">HRA</th>
                              <td>1650.00 </td>
                              <td>TDS</td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <th scope="row">WA</th>
                              <td>120.00 </td>
                              <td>LOP</td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <th scope="row">CA</th>
                              <td>0.00 </td>
                              <td>PT</td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <th scope="row">CCA</th>
                              <td>0.00 </td>
                              <td>SPL. Deduction</td>
                              <td>500.00</td>
                            </tr>
                            <tr>
                              <th scope="row">MA</th>
                              <td>3000.00</td>
                              <td>EWF</td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <th scope="row">Sales Incentive</th>
                              <td>0.00</td>
                              <td>CD</td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <th scope="row">Leave Encashment</th>
                              <td>0.00</td>
                              <td colSpan={2} />
                            </tr>
                            <tr>
                              <th scope="row">Holiday Wages</th>
                              <td>500.00</td>
                              <td colSpan={2} />
                            </tr>
                            <tr>
                              <th scope="row">Special Allowance</th>
                              <td>100.00</td>
                              <td colSpan={2} />
                            </tr>
                            <tr>
                              <th scope="row">Bonus</th>
                              <td>1400.00</td>
                              <td colSpan={2} />
                            </tr>
                            <tr>
                              <th scope="row">Individual Incentive</th>
                              <td>2400.00</td>
                              <td colSpan={2} />
                            </tr>
                            <tr className="border-top">
                              <th scope="row">Total Earning</th>
                              <td>25970.00</td>
                              <td>Total Deductions</td>
                              <td>2442.00</td>
                            </tr>
                          </tbody></table>
                        <div className="row mt-3">
                          <div className="col-md-2"><strong>Net Pay : 24528.00</strong> </div>
                          <div className="col-md-6">
                            <strong>In Words</strong> <span>Twenty Five thousand nine hundred seventy only</span>
                          </div>
                          <div className="col-md-4 text-right">
                            <strong>For Telogo Communications Limited</strong>
                            <div className="mt-5">Authorised Signatory</div> 
                          </div>
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
      
    </div>
  )
}

export default Download_salary_slip
