import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthUser from './AuthUser'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Change_password = () => {
  const {http} = AuthUser();
  const [successModal, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const [setvalues,setval]=useState([]);
  const [formData, setFormData] = useState({
    currentPassword:'',
    newPassword:'',
    confrimPassword:'',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.currentPassword) {
      errors.currentPassword = 'Current Password is required.';
    }
    if (!formData.newPassword) {
      errors.newPassword = 'New Password is required.';
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\])(?=.*?[A-Za-z\d@$!%*+?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\]).{8,}/.test(formData.newPassword)){
      errors.newPassword = 'Min. 8 characters a combination of AbYz1290!@#$%';
    }
    if (!formData.confrimPassword) {
      errors.confrimPassword = 'Confirm New Password is required.';
    }else if(formData.confrimPassword !== formData.newPassword){
      errors.confrimPassword = 'Confirm password is not matched';

    }
    return errors
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      
      const errors = {};
      http.post("list_employee/changePassword/"+sessionStorage.getItem('userId'),formData).then((res)=>{
        
        if(res.data.success=='100'){
          setShows(true);
          setval(res.data.message);

        }else{
          errors.currentPassword = res.data.message;
          setFormErrors(errors);

        }
        
        },[])

      
    } else {
      setFormErrors(errors);
    }
  }

  function refreshPage(){ 
    window.location.reload(); 
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
                  <div className="title-wrap"><h1 className="title is-4">Change Password</h1></div>
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
                    <div className="card mb-3">
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label>Current Password</label>
                            <div className="control has-icon">
                              <input type="password"
                               className={`form-control ${formErrors.currentPassword ? 'is-invalid' : ''}`} 
                               name="currentPassword"
                                value={formData.currentPassword} onChange={handleChange}
                                 placeholder="Enter current password" />
                              <label className="label form-icon" htmlFor="password">
                                <i className="lnil lnil-lock" />
                              </label>
                            </div>
                           
                            {formErrors.currentPassword && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.currentPassword}</div>}
                            
                          </div>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>New Password</label>
                              <div className="control has-icon">
                                <input type="password" className={`form-control ${formErrors.newPassword ? 'is-invalid' : ''}`} 
                               name="newPassword"
                                value={formData.newPassword} onChange={handleChange}
                                placeholder="Enter new password" />
                                <label className="label form-icon" htmlFor>
                                  <i className="lnil lnil-unlock" />
                                </label>
                              </div>
                              {formErrors.newPassword && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.newPassword}</div>}
                            </div>
                            <div className="form-group col-md-6">
                              <label>Confirm New Password</label>
                              <div className="control has-icon">
                                <input type="password" className={`form-control ${formErrors.confrimPassword ? 'is-invalid' : ''}`} 
                               name="confrimPassword"
                                value={formData.confrimPassword} onChange={handleChange} placeholder="Confirm new password" />
                                <label className="label form-icon" htmlFor>
                                  <i className="lnil lnil-user" />
                                </label>
                              </div>
                              {formErrors.confrimPassword && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.confrimPassword}</div>}
                            </div>
                          </div>
                          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Change Password</button>
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
              <Button className="btn btn-primary" type="button" onClick={refreshPage}>
              Ok
              </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
  )
}

export default Change_password
