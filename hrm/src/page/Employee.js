import React, {useState,useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import AuthUser from './AuthUser';
import Sidebar from './Sidebar';
const Employee = () => {
    const [states, setStates] = useState([]);
    const [desList, setDes] = useState([]);
    
    const [cities, setCities] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    var showDate= new Date();
    var displaytodayDate=showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+showDate.getFullYear();
    var datess=showDate.toDateString();
    var displayTime=showDate.getHours()+':'+showDate.getMinutes()+':'+showDate.getSeconds();
  
  const [formData, setFormData] = useState({
    OfficeNumber:'',
    UserType:'',
    EmployeeId:'',
    EmployeePassword:'',
    Name:'',
    LastName:'',

    DateOfBirth:'',
    Email:'',
    Mobile:'',
    DrivingLicence:'',
    Education:'',
    MaritalStatus:'',
    PreviousCompany:'', Experience:'', Designation:'', DateOfJoining:'', WorkShift:'',BloodGroup:'',
    Address:'', State:'', City:'', Country:'', Pincode:'',

   
  });
  const {http} = AuthUser();
  
  useEffect(()=>{
    
    http.get("state").then((res)=>{
    console.log(res.data.data)
    setStates(res.data.data)
  })

  },[]) 

  //desination
  useEffect(()=>{
    
    http.get("list_designation").then((res)=>{
    console.log(res.data.data)
    setDes(res.data.data)
  })

  },[]) 

   

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);

  
    // Fetch cities data for the selected state from the API
    http.get("citymaster/"+stateId).then((res)=>{
      console.log(res.data.data)
      setCities(res.data.data)
    })
  };
  

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  
  };


  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  // Handlers to update the form data for each step
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  

  const validateForm = () => {
    // Reset previous errors
    const errors = {};
    // Validate input fields for Step 1
    if (currentStep === 1) {
        if (!formData.OfficeNumber) {
            errors.OfficeNumber = 'Office Location is required.';
          }
          if (!formData.UserType) {
            errors.UserType = 'User Type is required.';
          }
          if (!formData.EmployeeId) {
            errors.EmployeeId = 'Employee Id is required.';
          }
          if(formData.EmployeeId){


          }
          if (!formData.EmployeePassword) {
            errors.EmployeePassword = 'EmployeePassword is required.';
          }

          if (!formData.Name) {
            errors.Name = 'Name  is required.';
        }
        if (!formData.LastName) {
            errors.LastName = 'LastName Id is required.';
        }
        if (!formData.DateOfBirth) {
            errors.DateOfBirth = 'DateOfBirth Id is required.';
        }
        if (!formData.Email) {
            errors.Email = 'Email Id is required.';
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.Email)){
          errors.Email = 'Pelse Enter Valid Email ID';

        }
        if (!formData.Mobile) {
            errors.Mobile = 'mobileNumber is required.';
        }
        else if(!(formData.Mobile.match('[0-9]{10}')) ){
          errors.Mobile = 'Please provide valid phone number';

        }
        if (!formData.DrivingLicence) {
            errors.DrivingLicence = 'DrivingLicence is required.';
        }
        if (!formData.Education) {
            errors.Education = 'Education is required.';
        }
        if (!formData.MaritalStatus) {
            errors.MaritalStatus = 'MaritalStatus is required.';
        }
        if (!formData.PreviousCompany) {
            errors.PreviousCompany = 'PreviousCompany is required.';
        }
    
        if (!formData.Experience) {
            errors.Experience = 'Experience is required.';
        }
        if (!formData.Designation) {
            errors.Designation = 'Designation is required.';
        }
        if (!formData.DateOfJoining) {
            errors.DateOfJoining = 'DateOfJoining is required.';
        }
        if (!formData.WorkShift) {
            errors.WorkShift = 'WorkShift is required.';
        }
        if (!formData.BloodGroup) {
            errors.BloodGroup = 'BloodGroup is required.';
        }
    }

    // Validate input fields for Step 2
    if (currentStep === 2) {
  

      if (!formData.Address) {
        errors.Address = 'Address is required.';
      }
      if (!selectedState) {
        errors.State = 'State is required.';
      }
      if (!selectedCity) {
        errors.City = 'City is required.';
      }
      if (!formData.Country) {
        errors.Country = 'Country is required.';
      }
      if (!formData.Pincode) {
        errors.Pincode = 'Pin Code is required.';
      }
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setFormErrors({});
  };
  const [successModal, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const [setvalues,setval]=useState([]);
  const successAdd = () =>{
    setShows(false);
    window.location = "/Employee";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      setShows(true);
      setval("Add Employee success");

      // fetch('http://localhost:5000/emp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Data inserted successfully, handle success (e.g., show a success message)
      //     console.log('Data inserted successfully:', data);
      //   })
      //   .catch((error) => {
      //     // Error occurred during the request, handle error (e.g., show an error message)
      //     console.error('Error inserting data:', error);
      //   });

      // setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };


  return (
    <div>

<div id="wrapper"> 
     <Sidebar/>

          {/* End of sub Sidebar */} 
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column"> 
            {/* Main Content */}
            <div id="content" className="page-content-wrapper"> 
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="page-title justify-content-between">
                  <div className="title-wrap"><h1 className="title is-4">Add Employee</h1></div>
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
                <div className="card">
                    <div className="card-body">
                        <form>
                            {/* Render different sections of the form based on the current step */}
                            {currentStep === 1 && (
                            <div>
                                
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label>Office Location</label>
                                        
                                        <select
                                                className={`form-control ${formErrors.OfficeNumber ? 'is-invalid' : ''}`}
                                                name="OfficeNumber"
                                                value={formData.OfficeNumber} 
                                                onChange={handleChange} 
                                            >   
                                                <option value="">Select Office </option>
                                                <option value="1">Noida</option>
                                                <option value="2">Mumbai</option>
                                        </select>
                                        {formErrors.OfficeNumber && <div className="invalid-feedback">{formErrors.OfficeNumber}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>User Type</label>
                                        <select
                                                
                                                className={`form-control ${formErrors.UserType ? 'is-invalid' : ''}`}
                                                name="UserType"
                                                value={formData.UserType}
                                                onChange={handleChange} 
                                            >
                                                <option value="">Select User Type </option>
                                                <option value="Manager">Manager</option>
                                                <option value="Executive">Executive</option>
                                        </select>
                                        {formErrors.UserType && <div className="invalid-feedback">{formErrors.UserType}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Employee ID</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.EmployeeId ? 'is-invalid' :  ''}`}
                                            name="EmployeeId"
                                            value={formData.EmployeeId}
                                            onChange={handleChange}
                                            />
                                             {formErrors.EmployeeId && <div className="invalid-feedback">{formErrors.EmployeeId}</div>}
                                    </div>
                               
                                    <div className="form-group col-md-4">
                                        <label>Employee EmployeePassword</label>
                                            <input
                                            type="text"
                                            className={`form-control ${formErrors.EmployeePassword ? 'is-invalid' : ''}`}
                                            name="EmployeePassword"
                                            value={formData.EmployeePassword}
                                            onChange={handleChange}
                                            />
                                            {formErrors.EmployeePassword && <div className="invalid-feedback">{formErrors.EmployeePassword}</div>}
                                    </div>





                                    <div className="form-group col-md-4">
                                        <label>First Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.Name ? 'is-invalid' : ''}`}
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleChange}
                                            />
                                             {formErrors.Name && <div className="invalid-feedback">{formErrors.Name}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Last Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.LastName ? 'is-invalid' : ''}`}
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleChange}
                                            />
                                            {formErrors.LastName && <div className="invalid-feedback">{formErrors.LastName}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Date of Birth</label>
                                            <input
                                            type="date"
                                             className={`form-control ${formErrors.DateOfBirth ? 'is-invalid' : ''}`}
                                            name="DateOfBirth"
                                            id="DateOfBirth"
                                            value={formData.DateOfBirth}
                                            onChange={handleChange}
                                            />
                                    </div>
                                
                                    <div className="form-group col-md-4">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                             className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            />
                                            {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Mobile Number</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.Mobile ? 'is-invalid' : ''}`}
                                            name="Mobile"
                                            value={formData.Mobile}
                                            onChange={handleChange}
                                            />
                                            {formErrors.Mobile && <div className="invalid-feedback">{formErrors.Mobile}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Driving Licence</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.DrivingLicence ? 'is-invalid' : ''}`}
                                            name="DrivingLicence"
                                            value={formData.DrivingLicence}
                                            onChange={handleChange}
                                            />
                                            {formErrors.DrivingLicence && <div className="invalid-feedback">{formErrors.DrivingLicence}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.Education ? 'is-invalid' : ''}`}
                                            name="Education"
                                            value={formData.Education}
                                            onChange={handleChange}
                                            
                                            />
                                            {formErrors.Education && <div className="invalid-feedback">{formErrors.Education}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Marital Status</label>
                                        <select
                                                 className={`form-control ${formErrors.MaritalStatus ? 'is-invalid' : ''}`}
                                                name="MaritalStatus"
                                                value={formData.MaritalStatus} 
                                                onChange={handleChange} 
                                            > 
                                                <option value="">Select</option>
                                                <option value="Married">Married</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Single">Single</option>
                                        </select>
                                        {formErrors.MaritalStatus && <div className="invalid-feedback">{formErrors.MaritalStatus}</div>}
                                           
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Previous Company</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.PreviousCompany ? 'is-invalid' : ''}`}
                                            name="PreviousCompany"
                                            value={formData.PreviousCompany}
                                            onChange={handleChange}
                                            />
                                            {formErrors.PreviousCompany && <div className="invalid-feedback">{formErrors.PreviousCompany}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Experience</label>
                                        <select
                                                 className={`form-control ${formErrors.Experience ? 'is-invalid' : ''}`}
                                                name="Experience"
                                                value={formData.Experience} 
                                                onChange={handleChange} 
                                            >
                                                <option value="">Select Year</option>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                        </select>
                                        {formErrors.Experience && <div className="invalid-feedback">{formErrors.Experience}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Designation</label>
                                        <select
                                                 className={`form-control ${formErrors.Designation ? 'is-invalid' : ''}`}
                                                name="Designation"
                                                value={formData.Designation} 
                                                onChange={handleChange} 
                                            >
                                            <option value="">Select Designation</option>
                                            {
                                              desList.map((des)=>
                                              <option value={des.DesignationId}>{des.DesignationCode}</option>
                                              )
                                            }
                                        </select>
                                        {formErrors.Designation && <div className="invalid-feedback">{formErrors.Designation}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Date of Joining</label>
                                        <input type="date"
                                            
                                             className={`form-control ${formErrors.DateOfJoining ? 'is-invalid' : ''}`}
                                            name="DateOfJoining"
                                            value={formErrors.DateOfJoining}
                                            onChange={handleChange}
                                            />
                                             {formErrors.DateOfJoining && <div className="invalid-feedback">{formErrors.DateOfJoining}</div>}
                                    </div>
                                    
                                    <div className="form-group col-md-4">
                                        <label>Work Shift</label>
                                        <select
                                                 className={`form-control ${formErrors.WorkShift ? 'is-invalid' : ''}`}
                                                name="WorkShift"
                                                value={formData.WorkShift} 
                                                onChange={handleChange} 
                                            >
                                            <option value="9:30 A.M. - 6:00 P.M.">9:30 A.M. - 6:00 P.M.</option>
                                            <option value="6:00 P.M. - 2:30 A.M.">6:00 P.M. - 2:30 A.M.</option>
                                        </select>
                                        {formErrors.WorkShift && <div className="invalid-feedback">{formErrors.WorkShift}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Blood Group</label>
                                        <select
                                                 className={`form-control ${formErrors.BloodGroup ? 'is-invalid' : ''}`}
                                                name="BloodGroup"
                                                value={formData.BloodGroup} 
                                                onChange={handleChange} 
                                            >
                                            <option value>Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="B+">B+</option>
                                            <option value="O+">O+</option>
                                            <option value="AB+">AB+</option>
                                            <option value="A-">A-</option>
                                            <option value="B-">B-</option>
                                            <option value="O-">O-</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                        {formErrors.BloodGroup && <div className="invalid-feedback">{formErrors.BloodGroup}</div>}
                                    </div>
                                   
                                
                                   
                                    
                                
                                </div>
                            </div>

                            )}
                            {currentStep === 2 && (
                            <div>
                                 <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-header">
                                        <h5>Permanent Address</h5>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Address</label>
                                            
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.Address ? 'is-invalid' : ''}`}
                                                name="Address"
                                                value={formData.Address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {formErrors.Address && <div className="invalid-feedback">{formErrors.Address}</div>}


                                        <div className="form-group">
                                            <label>State</label>
                                            
                                            <select name="State"  className={`form-control ${formErrors.states ? 'is-invalid' : ''}`} id="State" onChange={handleStateChange} value={selectedState}>
                                                <option value="">Select a State</option>
                                                {states.map((state) => (
                                                <option key={state.SrNo} value={state.SrNo}>
                                                    {state.StateName}
                                                </option>
                                                ))}
                                            </select>
                                            {formErrors.states && <div className="invalid-feedback">{formErrors.states}</div>}


                                        </div>

                                        <div className="form-group">
                                            <label>City</label>
                                        

                                            <select name="City"  className={`form-control ${formErrors.cities ? 'is-invalid' : ''}`} id="City" onChange={handleCityChange} value={selectedCity}>
                                            <option value="">Select a City</option>
                                            {cities.map((city) => (
                                                <option key={city.SrNo} value={city.SrNo}>
                                                {city.CityName}
                                                </option>
                                            ))}
                                            </select>
                                            {formErrors.cities && <div className="invalid-feedback">{formErrors.cities}</div>}

                                        </div>

                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.Country ? 'is-invalid' : ''}`}
                                                name="Country"
                                                value={formData.Country}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Country && <div className="invalid-feedback">{formErrors.Country}</div>}
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Pin Code</label>
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.Pincode ? 'is-invalid' : ''}`}
                                                name="Pincode"
                                                value={formData.Pincode}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Pincode && <div className="invalid-feedback">{formErrors.Pincode}</div>}
                                        </div>
                                        
                                    </div>
                                  
                                    
                                    </div>
                            </div>
                            )}

                            {/* Step navigation buttons */}
                            {currentStep > 1 && (
                            <button type="button" className='btn btn-outline-primary' onClick={handlePrev}>
                                Previous
                            </button>
                            )}
                            {currentStep < 2 && (
                            <button type="button" className='btn btn-outline-primary' onClick={handleNext}>
                                Next
                            </button>
                            )}
                            {currentStep === 2 && (
                            <button type="button" className='btn btn-primary' onClick={handleSubmit}>
                                Add Employee
                            </button>
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
          </div>
          </div>
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
          <Button className="btn btn-primary" type="button" onClick={successAdd}>
                     Ok
                  </Button>
                  
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employee;
