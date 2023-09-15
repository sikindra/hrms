import { DatePicker } from 'antd'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthUser from './AuthUser'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Add_holiday = () => {
  const {http} = AuthUser();
  
  
  const [HolidayDate, setHolidayDate] = useState('');
  
  const [OfficeId, setOfficeId] = useState('');
  const [Description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [successModal, showSucc] = useState(false);
  const handleClose = () => showSucc(false);
  const [failedModal, showFailed] = useState(false);
  const [setvalues,setMessage]=useState([]);
  const handlefaled = () => showFailed(false);
  const holidayAdd = async(e)=>{
    e.preventDefault();
      const newErrors = {};
      if (!OfficeId) {
        newErrors.OfficeId = 'Please Enter You Office Location!. ';
      }
      if (!HolidayDate) {
        newErrors.HolidayDate = 'Please Enter You Holiday Date!. ';
      }
      if (!Description) {
        newErrors.Description = 'Please Enter You Holiday Description!. ';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; 
      }else{
        let body={"HolidayDate": HolidayDate,"OfficeId": OfficeId,"Description":Description}
        
        http.post("list_holidy/",body).then((res)=>{
          if(res.data.success=='100'){
           
            showSucc(true);
            setMessage(res.data.message)



          }else{
            
            showFailed(true)
            setMessage(res.data.message)
            
          }

        },[])

      }
  }
  const succesM = async() =>{
    showSucc(false);
    window.location = "/settings/add-holiday";
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
                  <div className="title-wrap"><h1 className="title is-4">Add Holiday</h1></div>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={holidayAdd}>
                          <div className="form-group">
                            <label>Office Location</label>
                            <select className={`form-control ${errors.OfficeId ? 'is-invalid' : ''}`}
                              onChange={(e) => setOfficeId(e.target.value)}
                              value={OfficeId}>
                              <option>Select Location</option>
                              <option value={10}>Noida</option>
                              
                            </select>
                          </div>
                          <span style={{ color: 'red'}}>{errors.OfficeId}</span>
                          <div className="form-group">
                            <label>Holiday Date</label>
                            
                            
                              <DatePicker className={`form-control ${errors.HolidayDate ? 'is-invalid' : ''}`}
                              selected={HolidayDate}
                              onChange={date => setHolidayDate(date)}
                              dateFormat="yyyy-MM-dd"
                              defaultValue={HolidayDate}
                            />
                          </div>
                          <span style={{ color: 'red'}}>{errors.HolidayDate}</span>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
                              onChange={(e) => setDescription(e.target.value)}
                              value={Description} placeholder="Holiday Description" rows={4} defaultValue={""} />
                               <span style={{ color: 'red'}}>{errors.Description}</span>
                          </div>
                         
                          <input type="submit" className="btn btn-primary" defaultValue="Add Holiday" />
                        </form>
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
              <Button className="btn btn-primary" type="button" onClick={succesM} >
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
}

export default Add_holiday
