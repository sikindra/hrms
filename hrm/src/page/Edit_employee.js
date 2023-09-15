import React, {useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import { DatePicker } from 'antd' 
import "react-datepicker/dist/react-datepicker.css";  
import AuthUser from './AuthUser';
import { useParams } from 'react-router-dom';
import Sidebar1 from './Sidebar1';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import dayjs from 'dayjs';
const Edit_employee = () => {
const [successModal, setShows] = useState(false);
const handleCloses = () => setShows(false);
const [setvalues,setval]=useState([]);
const [workList, setwork] = useState([]);
const successAdd = () =>{
setShows(false);
window.location = "/manage_employee/view-employee";
}
const [State, setState] = useState([]);
const [States, setStates] = useState([]);
const [City, setCity] = useState([]);
const [Citys, setCitys] = useState([]);
const [desList, setDes] = useState([]);
const [selectedState, setSelectedState] = useState('');
const [selectedStates, setSelectedStates] = useState('');
const [selectedCity, setSelectedCity] = useState('0');
const [selectedCitys, setSelectedCitys] = useState('');
const [sameAsPermanent, setSameAsPermanent] = useState(false); // State to manage checkbox
const [formData, setFormData] = useState({
OfficeNumber:'',
UserType:'',
EmployeeId:'',
Name:'',
LastName:'',
DateOfBirth:'',
Email:'',
Mobile:'',
DrivingLicence:'',
Education:'',
MaritalStatus:'',
PreviousCompany:'', Experience:'', Designation:'', DateOfJoining:'', WorkShift:'',BloodGroup:'',
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
const {http} = AuthUser();
const {id} = useParams();
let date = new Date();
/* Date format you have */
let dateMDY = `0${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
/* Date converted to MM-DD-YYYY format */
const [startDate, setStartDate] = useState(dateMDY); 
useEffect(() =>{
http.get("list_employee/"+id).then((res)=>{
const data =res.data.data;
setSelectedState(data.State);
setSelectedStates(data.State1);
if(data.State1){
http.get("citymaster/"+data.State1).then((res)=>{
setCitys(res.data.data)
},[])
}
http.get("citymaster/"+data.State).then((res)=>{
setCity(res.data.data)
},[])
setSelectedCitys(data.City1)
setSelectedCity(data.City);
setFormData({EmployeeId: data.EmployeeId,EmployeeUserName: data.EmployeeUserName,
UserType:data.UserType,Name:data.Name,LastName:data.LastName,Email:data.Email,OfficeNumber:data.OfficeNumber,DateOfBirth:dayjs(moment(data.DateOfBirth,'YYYY-MM-DDTHH:mm:ss')),
DrivingLicence: data.DrivingLicence,Education:data.Education,MaritalStatus:data.MaritalStatus,Mobile:data.Mobile,PreviousCompany:data.PreviousCompany
,Experience:data.Experience,Designation:data.Designation,DateOfJoining:dayjs(moment(data.DateOfJoining,'YYYY-MM-DDTHH:mm:ss')),WorkShift:data.WorkShift,BloodGroup:data.BloodGroup,
Address:data.Address,Country:data.Country,Pincode:data.Pincode,Address1:data.Address1,State:data.State,City:data.City,State1:data.State1,City1:data.City1,Country1:data.Country1,Pincode1:data.Pincode1
// {"success":1,"data":{"SrNo":48,"EmployeeId":"T-12wdferferww","EmployeeUserName":"","UserType":"EMP",
// "Name":"Deepak","LastName":"Sarsaswat","Email":"12retrete3@gmail.com","Mobile":"9654356787","Std":0,"OfficeNumber":"414","DateOfBirth":"15/01/1995","Education":"B.E","MaritalStatus":"Married","PreviousCompany":"ICFA","Experience":"4","Designation":"Softwares Developer","DateOfJoining":"01/12/2022","WorkShift":"9:30 A.M. - 6:00 P.M.","BloodGroup":"A","Status":"Active","Grace":1,"Address":"Rohini Delhi","City":"Delhi","State":"Delhi","Country":"India","Pincode":"110085","Address1":"G 51 Vijay Vihar Phase 2, Rohini Sec -4","City1":"Delhi","State1":"Delhi","Country1":"India","Pincode1":"110085","SystemName":"dev13","IP":"10.10.20.13","MacAddress":"255.255.255.13","DateOfLeave":"","AllocatedStoreId":"","SocialSecurity":"","DrivingLicence":"","ParentId":0}}
})
})
http.get("list_workshift").then((res)=>{
setwork(res.data.data)
})
}, [])
useEffect(()=>{
http.get("state").then((res)=>{
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
useEffect(()=>{
http.get("list_designation").then((res)=>{
setDes(res.data.data)
})
},[]) 
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
const handleDateChange = (date) => {
setStartDate(date);
setFormData((prevFormData) => ({
...prevFormData,
DateOfBirth: date, // Update the DateOfBirth field in the form data
}));
};
const handleDatesChange = (date) => {
setFormData((prevFormData) => ({
...prevFormData,
DateOfJoining: date,
}));
};
//   accounts@telogo.in
//   TeloGoMeta@1100
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
if (!formData.Name) {
errors.Name = 'Name is required.';
}
else if(!/^[A-Za-z]+$/.test(formData.Name)){
errors.Name = 'Only Char Required!';
}
if (!formData.LastName) {
errors.LastName = 'LastName is required.';
}
else if(!/^[A-Za-z]+$/.test(formData.LastName)){
errors.LastName = 'Only Char Required!';
}
if (!formData.DateOfBirth) {
errors.DateOfBirth = 'Date Of Birth Id is required.';
} 
if (!formData.Email) {
errors.Email = 'Email Id is required.';
}
else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.Email)){
errors.Email = 'Pelse Enter Valid Email ID';
}
if (!formData.Mobile) {
errors.Mobile = 'mobile Number is required.';
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
}else if(formData.Pincode.length !=6){
errors.Pincode = 'Please Required 6 digit Pincode!';
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
const handleSubmit = (e) => {
e.preventDefault();
const errors = validateForm();
if (Object.keys(errors).length === 0) {
console.log(formData);
http.patch("list_employee/"+id,formData).then((res)=>{
console.log(res.data.data)
if(res.data.success=='1'){
setShows(true);
setval(res.data.message)
}else{
setShows(true);
setval(res.data.message)
}
})
} else {
setFormErrors(errors);
}
};
// Handler to handle checkbox change
const handleCheckboxChange = (e) => {
e.preventDefault();
setSameAsPermanent(e.target.checked);
console.log(e.target.checked);
if (e.target.checked) {
// Set temporary address fields to permanent address fields
setSelectedStates(formData.State)
http.get("citymaster/"+formData.State).then((res)=>{
console.log(res.data.data)
setCitys(res.data.data)
},[])
setSelectedCitys(formData.City)
setFormData((prevFormData) => ({
...prevFormData,
State1: formData.State,
City1: formData.City,
Address1: formData.Address,
Country1: formData.Country,
Pincode1: formData.Pincode,
}));
} else {
// Clear temporary address fields if the checkbox is unchecked
setFormData((prevFormData) => ({
...prevFormData,
Address1: '',
State1: '',
City1: '',
Country1: '',
Pincode1: '',
}));
}
};
return (
<div>
   <div id="wrapper">
      <Sidebar/>
      <Sidebar1 />
      {/* End of sub Sidebar */} 
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
         {/* Main Content */}
         <div id="content" className="page-content-wrapper fullwidth">
            {/* Begin Page Content */}
            <div className="container-fluid">
               <div className="page-title justify-content-between">
                  <div className="title-wrap">
                     <h1 className="title is-4">Edit Employee</h1>
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
                                 {formErrors.OfficeNumber && 
                                 <div className="invalid-feedback">{formErrors.OfficeNumber}</div>
                                 }
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
                                 <option value="ADMIN">ADMIN</option>
                                 <option value="MAN">Manager</option>
                                 <option value="EMP">Employee</option>
                                 </select>
                                 {formErrors.UserType && 
                                 <div className="invalid-feedback">{formErrors.UserType}</div>
                                 }
                              </div>
                              <div className="form-group col-md-4">
                                 <label>Employee ID</label>
                                 <input
                                 type="text"
                                 className={`form-control ${formErrors.EmployeeId ? 'is-invalid' :  ''}`}
                                 name="EmployeeId"
                                 value={formData.EmployeeId}
                                 onChange={handleChange}
                                 id disabled />
                                 {formErrors.EmployeeId && 
                                 <div className="invalid-feedback">{formErrors.EmployeeId}</div>
                                 }
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
                                 {formErrors.Name && 
                                 <div className="invalid-feedback">{formErrors.Name}</div>
                                 }
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
                                 {formErrors.LastName && 
                                 <div className="invalid-feedback">{formErrors.LastName}</div>
                                 }
                              </div>
                              <div className="form-group col-md-4">
                                 <label>Date of Birth</label>
                                 {/* <input
                                 type="date"
                                 className={`form-control ${formErrors.DateOfBirth ? 'is-invalid' : ''}`}
                                 name="DateOfBirth"
                                 value={formData.DateOfBirth}
                                 onChange={handleChange}
                                 /> */}
                                 <DatePicker
                                 className={`form-control ${formErrors.DateOfBirth ? 'is-invalid' : ''}`}
                                 name="DateOfBirth"
                                 selected={formData.DateOfBirth}
                                 onChange={handleDateChange}
                                 dateFormat="yyyy-MM-dd"
                                 value={formData.DateOfBirth}
                                 />
                              </div>
                              {formErrors.DateOfBirth && 
                              <div className="invalid-feedback">{formErrors.DateOfBirth}</div>
                              }
                              <div className="form-group col-md-4">
                                 <label>Email ID</label>
                                 <input
                                 type="text"
                                 className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}
                                 name="Email"
                                 value={formData.Email}
                                 onChange={handleChange}
                                 />
                                 {formErrors.Email && 
                                 <div className="invalid-feedback">{formErrors.Email}</div>
                                 }
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
                                 {formErrors.Mobile && 
                                 <div className="invalid-feedback">{formErrors.Mobile}</div>
                                 }
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
                                 {formErrors.DrivingLicence && 
                                 <div className="invalid-feedback">{formErrors.DrivingLicence}</div>
                                 }
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
                                 {formErrors.Education && 
                                 <div className="invalid-feedback">{formErrors.Education}</div>
                                 }
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
                                 {formErrors.MaritalStatus && 
                                 <div className="invalid-feedback">{formErrors.MaritalStatus}</div>
                                 }
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
                                 {formErrors.PreviousCompany && 
                                 <div className="invalid-feedback">{formErrors.PreviousCompany}</div>
                                 }
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
                                 {formErrors.Experience && 
                                 <div className="invalid-feedback">{formErrors.Experience}</div>
                                 }
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
                                 {formErrors.Designation && 
                                 <div className="invalid-feedback">{formErrors.Designation}</div>
                                 }
                              </div>
                              <div className="form-group col-md-4">
                                 <label>Date of Joining</label>
                                 {/* <input
                                 type="date"
                                 className={`form-control ${formErrors.DateOfJoining ? 'is-invalid' : ''}`}
                                 name="DateOfJoining"
                                 value={formData.DateOfJoining}
                                 onChange={handleChange}
                                 /> */}
                                 <DatePicker
                                 className={`form-control ${formErrors.DateOfJoining ? 'is-invalid' : ''}`}
                                 name="date"
                                 selected={formData.DateOfJoining}
                                 onChange={handleDatesChange}
                                 dateFormat="yyyy-MM-dd"
                                 value={formData.DateOfJoining}
                                 />
                                 {formErrors.DateOfJoining && 
                                 <div className="invalid-feedback">{formErrors.DateOfJoining}</div>
                                 }
                              </div>
                              <div className="form-group col-md-4">
                                 <label>Work Shift</label>
                                 <select
                                 className={`form-control ${formErrors.WorkShift ? 'is-invalid' : ''}`}
                                 name="WorkShift"
                                 value={formData.WorkShift} 
                                 onChange={handleChange} 
                                 >
                                 {
                                 workList.map((item) => (
                                 <option value={`${item.WorkShiftFrom}. - ${item.WorkShiftTo}.`}>{item.WorkShiftFrom}. - {item.WorkShiftTo}.</option>
                                 ))
                                 }
                                 </select>
                                 {formErrors.WorkShift && 
                                 <div className="invalid-feedback">{formErrors.WorkShift}</div>
                                 }
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
                                 {formErrors.BloodGroup && 
                                 <div className="invalid-feedback">{formErrors.BloodGroup}</div>
                                 }
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
                                 {formErrors.Address && 
                                 <div className="invalid-feedback">{formErrors.Address}</div>
                                 }
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
                                    {formErrors.State && 
                                    <div className="invalid-feedback">{formErrors.State}</div>
                                    }
                                 </div>
                                 <div className="form-group">
                                    <label>City</label>
                                    <select name="City"  className={`form-control ${formErrors.City ? 'is-invalid' : ''}`} id="City" onChange={handleCityChange} value={selectedCity}>
                                    <option value="">Select a City</option>
                                    {City.map((city) => (
                                    <option  value={city.SrNo}>
                                       {city.CityName}
                                    </option>
                                    ))}
                                    </select>
                                    {formErrors.City && 
                                    <div className="invalid-feedback">{formErrors.City}</div>
                                    }
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
                                    {formErrors.Country && 
                                    <div className="invalid-feedback">{formErrors.Country}</div>
                                    }
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
                                    {formErrors.Pincode && 
                                    <div className="invalid-feedback">{formErrors.Pincode}</div>
                                    }
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="card-header d-flex justify-content-between">
                                    <h5>Temporary Address</h5>
                                    <div className="custom-control custom-checkbox">
                                       <input
                                          id="chkPrompt"
                                          name="chkPrompt"
                                          type="checkbox"
                                          className="custom-control-input"
                                          checked={sameAsPermanent}
                                          onChange={handleCheckboxChange}
                                          />
                                       <label className="custom-control-label" htmlFor="chkPrompt">Same as permanent</label>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label>Address</label>
                                    <input
                                    type="text"
                                    className={`form-control ${formErrors.Address1 ? 'is-invalid' : ''}`}
                                    name="Address1"
                                    value={formData.Address1}
                                    onChange={handleChange}
                                    disabled={sameAsPermanent} 
                                    />
                                    {formErrors.Address1 && 
                                    <div className="invalid-feedback">{formErrors.Address1}</div>
                                    }
                                 </div>
                                 <div className="form-group">
                                    <label>State</label>
                                    <select name="State1"  className={`form-control ${formErrors.State1 ? 'is-invalid' : ''}`} id="State1" onChange={handleStateChanges} value={selectedStates} disabled={sameAsPermanent}> 
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
                                    <select name="City1"  className={`form-control ${formErrors.City1 ? 'is-invalid' : ''}`} id="City1" onChange={handleCityChanges} value={selectedCitys} disabled={sameAsPermanent}  >
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
                                    name="Country1"
                                    value={formData.Country1}
                                    onChange={handleChange}
                                    disabled={sameAsPermanent} 
                                    />
                                    {formErrors.Country1 && 
                                    <div className="invalid-feedback">{formErrors.Country1}</div>
                                    }
                                 </div>
                                 <div className="form-group">
                                    <label>Pin Code</label>
                                    <input
                                    type="text"
                                    className={`form-control ${formErrors.Pincode1 ? 'is-invalid' : ''}`}
                                    name="Pincode1"
                                    value={formData.Pincode1}
                                    onChange={handleChange}
                                    disabled={sameAsPermanent} // Disable if sameAsPermanent is true
                                    />
                                    {formErrors.Pincode1 && 
                                    <div className="invalid-feedback">{formErrors.Pincode1}</div>
                                    }
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
                        Update Employee
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
export default Edit_employee;