import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthUser from './AuthUser'
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'
const Profile = () => {
const {http} = AuthUser();
const [successModal, setShows] = useState(false);
const handleCloses = () => setShows(false);
const [setvalues,setval]=useState([]);
const [selectedState, setSelectedState] = useState('');
const [selectedStates, setSelectedStates] = useState('');
const [selectedCity, setSelectedCity] = useState('');
const [selectedCitys, setSelectedCitys] = useState('');
const [State, setState] = useState([]);
const [States, setStates] = useState([]);
const [City, setCity] = useState([]);
const [Citys, setCitys] = useState([]);
useEffect(() =>{
  profileList();
  }, []);

 function profileList(){
  http.get("list_employee/"+sessionStorage.getItem('userId')).then((res)=>{
    const data =res.data.data;
    setSelectedState(data.State);
    setSelectedStates(data.State1);
    if(data.State1){
      http.get("citymaster/"+data.State1).then((res)=>{
    setCitys(res.data.data)
    },[])
    
    }
    console.log(data.State1);
    http.get("citymaster/"+data.State).then((res)=>{
    setCity(res.data.data)
    },[])
    
    setSelectedCitys(data.City1)
    setSelectedCity(data.City);
    setFormData({EmployeeId: data.EmployeeId,EmployeeUserName: data.EmployeeUserName,
    UserType:data.UserType,Name:data.Name,LastName:data.LastName,Email:data.Email,OfficeNumber:data.OfficeNumber,DateOfBirth:data.DateOfBirth,
    DrivingLicence: data.DrivingLicence,Education:data.Education,MaritalStatus:data.MaritalStatus,Mobile:data.Mobile,PreviousCompany:data.PreviousCompany
    ,Experience:data.Experience,Designation:data.Designation,DateOfJoining:data.DateOfJoining,WorkShift:data.WorkShift,BloodGroup:data.BloodGroup,
    Address:data.Address,Country:data.Country,Pincode:data.Pincode,Address1:data.Address1,State:data.State,City:data.City,State1:data.State1,City1:data.City1,Country1:data.Country1,Pincode1:data.Pincode1
    // {"success":1,"data":{"SrNo":48,"EmployeeId":"T-12wdferferww","EmployeeUserName":"","UserType":"EMP",
    // "Name":"Deepak","LastName":"Sarsaswat","Email":"12retrete3@gmail.com","Mobile":"9654356787","Std":0,"OfficeNumber":"414","DateOfBirth":"15/01/1995","Education":"B.E","MaritalStatus":"Married","PreviousCompany":"ICFA","Experience":"4","Designation":"Softwares Developer","DateOfJoining":"01/12/2022","WorkShift":"9:30 A.M. - 6:00 P.M.","BloodGroup":"A","Status":"Active","Grace":1,"Address":"Rohini Delhi","City":"Delhi","State":"Delhi","Country":"India","Pincode":"110085","Address1":"G 51 Vijay Vihar Phase 2, Rohini Sec -4","City1":"Delhi","State1":"Delhi","Country1":"India","Pincode1":"110085","SystemName":"dev13","IP":"10.10.20.13","MacAddress":"255.255.255.13","DateOfLeave":"","AllocatedStoreId":"","SocialSecurity":"","DrivingLicence":"","ParentId":0}}
    })
    })
 } 
useEffect(()=>{
http.get("state").then((res)=>{
console.log(res.data.data)
setState(res.data.data)
})
},[])
useEffect(()=>{
http.get("state").then((res)=>{
setStates(res.data.data)
})
},[])  
const handleStateChange = (event) => {
const stateId = event.target.value;
setSelectedState(stateId);
setFormData((prevFormData) => ({
...prevFormData,
State: stateId,
}));
// Fetch City data for the selected state from the API
http.get("citymaster/"+stateId).then((res)=>{
console.log(res.data.data)
setCity(res.data.data)
})
};
const handleCityChange = (event) => {
const cityId = event.target.value;
setSelectedCity(cityId);
setFormData((prevFormData) => ({
...prevFormData,
City: cityId,
}));
};
const handleStateChanges = (event) => {
const stateId = event.target.value;
setSelectedStates(stateId);
setFormData((prevFormData) => ({
...prevFormData,
State1: stateId,
}));
// Fetch City data for the selected state from the API
http.get("citymaster/"+stateId).then((res)=>{
console.log(res.data.data)
setCitys(res.data.data)
})
};
const handleCityChanges = (event) => {
const cityId = event.target.value;
setSelectedCitys(cityId);
setFormData((prevFormData) => ({
...prevFormData,
City1: cityId,
}));
};
const [formData, setFormData] = useState({
Name:'',
LastName:'',
Email:'',
Mobile:'',
Address: '',
State: '',
City: '',
Country: '',
Pincode: '',
Address1: '',
State1: '',
City1: '',
Country1: '',
Pincode1: '',
});
const [formErrors, setFormErrors] = useState({});
const validateForm = () => {
const errors = {};
if (!formData.Name) {
errors.Name = 'First Name is required.';
}
else if(!/^[A-Za-z]+$/.test(formData.Name)){
errors.Name = 'Only Char Required!';
}
if (!formData.LastName) {
errors.LastName = 'Last Name is required.';
}
else if(!/^[A-Za-z]+$/.test(formData.LastName)){
errors.LastName = 'Only Char Required!';
}
if (!formData.Email) {
errors.Email = 'Email ID is required.';
}
else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.Email)){
errors.Email = 'Pelse Enter Valid Email ID';
}
if (!formData.Mobile) {
errors.Mobile = 'Mobile Number is required.';
}
else if(!(formData.Mobile.match('[0-9]{10}')) ){
errors.Mobile = 'Please provide valid phone number';
}
else if(!/^[6-9][0-9]{0,10}$/.test(formData.Mobile)){
errors.Mobile = "Please provide valid phone!";
}
else if(formData.Mobile.length !=10 ){
errors.Mobile = "invalid mobile nuumber";
}
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
}else if(formData.Pincode.length !=6){
errors.Pincode = 'Please Required 6 digit Pincode!';
}
if (!formData.Address1) {
  errors.Address1 = 'Address is required.';
  }
  if (!selectedStates) {
  errors.State1 = 'State is required.';
  }
  if (!selectedCitys) {
  errors.City1 = 'City is required.';
  }
  if (!formData.Country1) {
  errors.Country1 = 'Country is required.';
  }
  if (!formData.Pincode1) {
  errors.Pincode1 = 'Pin Code is required.';
  }else if(formData.Pincode1.length !=6){
  errors.Pincode1 = 'Please Required 6 digit Pincode!';
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
// const errors = {};
http.patch("list_employee/"+sessionStorage.getItem('userId'),formData).then((res)=>{
  if(res.data.success=='1'){
    setShows(true);
    setval('Profile Details has been Updated Successfully');
  }else{
    errors.Name = res.data.message;
    setFormErrors(errors);
  }
  },[])

} else {
setFormErrors(errors);
}
}
function refreshPage(){ 
  setShows(false);
  profileList(); 
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
                  <div className="title-wrap">
                     <h1 className="title is-4">Profile</h1>
                  </div>
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
                     <div className="row">
                        <div className="form-group col-md-3">
                           <label>First Name</label>
                           <input type="text"  className={`form-control ${formErrors.Name ? 'is-invalid' : ''}`} 
                           name="Name"
                           value={formData.Name} onChange={handleChange} />
                           {formErrors.Name && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.Name}
                        </div>
                        }
                     </div>
                     <div className="form-group col-md-3">
                        <label>Last Name</label>
                        <input type="text" className={`form-control ${formErrors.LastName ? 'is-invalid' : ''}`} 
                        name="LastName" value={formData.LastName} onChange={handleChange} />
                        {formErrors.LastName && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.LastName}
                     </div>
                     }
                  </div>
                  <div className="form-group col-md-3">
                     <label>Email ID</label>
                     <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} 
                     name="Email" value={formData.Email} onChange={handleChange} />
                     {formErrors.Email && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.Email}
                  </div>
                  }
               </div>
               <div className="form-group col-md-3">
                  <label>Mobile Number</label>
                  <input type="text" className={`form-control ${formErrors.Mobile ? 'is-invalid' : ''}`} 
                  name="Mobile" value={formData.Mobile} onChange={handleChange} />
                  {formErrors.Mobile && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.Mobile}
               </div>
               }
            </div>
         </div>
         <div className="row">
            <div className="col-md-6">
               <div className="card-header">
                  <h5>Permanent Address</h5>
               </div>
               <form>
                  <div className="form-group">
                     <label>Address</label>
                     <input type="text"
                     className={`form-control ${formErrors.Address ? 'is-invalid' : ''}`}
                     name="Address"
                     value={formData.Address}
                     onChange={handleChange}/>
                     {formErrors.Address && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.Address}
                  </div>
                  }
            </div>
            <div className="form-group">
            <label>State</label>
            <select name="State"  className={`form-control ${formErrors.State ? 'is-invalid' : ''}`} id="State" onChange={handleStateChange} value={selectedState}>
            <option value="">Select a State</option>
            {State.map((state) => (
            <option key={state.SrNo} value={state.SrNo}>
            {state.StateName}
            </option>
            ))}
            </select>
            {formErrors.State && <div className="invalid-feedback">{formErrors.State}</div>}
            </div>
            <div className="form-group">
            <label>City</label>
            <select name="City"  className={`form-control ${formErrors.City ? 'is-invalid' : ''}`} id="City" onChange={handleCityChange} value={selectedCity}>
            <option value="">Select a City</option>
            {City.map((city) => (
            <option key={city.SrNo} value={city.SrNo}>
            {city.CityName}
            </option>
            ))}
            </select>
            {formErrors.City && <div className="invalid-feedback" style={{"display": 'block'}}>{formErrors.City}</div>}
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
         </form>
      </div>
      <div className="col-md-6">
         <div className="card-header">
            <h5>Temporary Address</h5>
         </div>
         <form>
            <div className="form-group">
               <label>Address</label>
               <input type="text"
                  className={`form-control ${formErrors.Address1 ? 'is-invalid' : ''}`}
                  name="Address1"
                  value={formData.Address1}
                  onChange={handleChange}
                  
                />
                {formErrors.Address1 && <div className="invalid-feedback">{formErrors.Address1}</div>}
            </div>
            <div className="form-group">
               <label>State</label>
               <select name="State1"  className={`form-control ${formErrors.State1 ? 'is-invalid' : ''}`} id="State1" onChange={handleStateChanges} value={selectedStates} > 
                  <option value="">Select a State</option>
                  {States.map((states) => (
                  <option key={states.SrNo} value={states.SrNo}>
                      {states.StateName}
                  </option>
                  ))} 
                  </select>
                  {formErrors.State1 && 
                  <div className="invalid-feedback">{formErrors.State1}</div>
                  }
            </div>
            <div className="form-group">
               <label>City</label>
               <select name="City1"  className={`form-control ${formErrors.City1 ? 'is-invalid' : ''}`} id="City1" onChange={handleCityChanges} value={selectedCitys} >
                    <option value="">Select a City</option>
                    {Citys.map((city) => (
                    <option key={city.SrNo} value={city.SrNo}>
                      {city.CityName}
                    </option>
                    ))}
                    </select>
                    {formErrors.City1 && 
                    <div className="invalid-feedback">{formErrors.City1}</div>
                    }
            </div>
            
            <div className="form-group">
               <label>Country</label>
               <input
                    type="text"
                    className={`form-control ${formErrors.Country1 ? 'is-invalid' : ''}`}
                    name="Country1" value={formData.Country1}
                    onChange={handleChange}
                     
                />
                {formErrors.Country1 && <div className="invalid-feedback">{formErrors.Country1}</div>}
            </div>
            <div className="form-group">
               <label>Pin Code</label>
               <input
                  type="text"
                  className={`form-control ${formErrors.Pincode1 ? 'is-invalid' : ''}`}
                  name="Pincode1"
                  value={formData.Pincode1}
                  onChange={handleChange}
                  
              />
              {formErrors.Pincode1 && <div className="invalid-feedback">{formErrors.Pincode1}</div>}
            </div>
         </form>
      </div>
   </div>
   <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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
export default Profile