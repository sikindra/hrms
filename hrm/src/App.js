import logo from './img/login-logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AuthUser from './page/AuthUser';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {http,setToken} = AuthUser();
  const [name, userName] = useState('');
    const [pass, password] = useState('');

    const UserLogin = (e) => {
      e.preventDefault();
      if(validate()){
       
        let body={"UserName": name,
        "password": pass};
        
        http.post("login", body)
        .then((res)=>{ 
         
         setToken(res.data.user,res.data.userId,res.data.UserType,res.data.token,res.data.success);
          
           
                
              }).catch((err)=>(
                toast.error("Invalid  password")
                
            ));
           
        
  
      }
    }
    
    const validate=()=>{
      let result=true;
      if(name ==='' || name ===null){
        result=false;
        toast.error('Please Enter Username');
      }
      if(pass ==='' || pass ===null){
        result=false;
        toast.error('Please Enter Password');
        
        
      }
      return result;
    }
  return (
    <div>
    
    
    <div id="wrapper"> 
  
      <div id="content-wrapper" className="d-flex flex-column"> 
        {/* Main Content */}
        <div className="page-content-wrapper blank"> 
          {/* Begin Page Content */}
          <div className="container-fluid"> 
            <div className="text-center mt-5">
              <img src={logo} className="login-logo" />
            </div>
            <div className="row mt-4 justify-content-center">
              <div className="col-md-4">
                <div className="card border-0 shadow-lg">
                  <div className="card-body login-page">
                    <form onSubmit={UserLogin}>
                      <h5>Sign In</h5>
                      <p>Welcome back to your account.</p>
                      <div className="form-group">
                        <div className="control has-icon">
                        <input type="text" value={name} onChange={e=>userName(e.target.value)} className="form-control" placeholder="Username"  />
                          
                          <label className="label form-icon" htmlFor="usrName"><i className="lnil lnil-user" /></label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="control has-icon">
                        <input type="password" value={pass} onChange={e=>password(e.target.value)} className="form-control" placeholder="Password"  />
                          <label className="label form-icon" htmlFor="pswd"><i className="lnil lnil-lock-alt" /></label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="custom-control custom-switch">
                              <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                              <label className="custom-control-label" htmlFor="customSwitch1">Remember</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 f-pswd">
                          <a href="#">Forgot Password?</a>
                        </div>
                      </div>
                      <button type='submit' className="btn btn-primary" > Sign In </button>
                      
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
    {/* End of Page Wrapper */} 
    {/* Scroll to Top Button*/} 
    <a className="scroll-to-top rounded" href="#page-top"> <i className="lnil lnil-arrow-up-circle" /> </a> 
    {/* Logout Modal*/}
    <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button className="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
          </div>
          <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
           
           
            <Link className="btn btn-primary" to="/logout">Logout</Link></div>
        </div>
      </div>
    </div>
    {/* Bootstrap core JavaScript*/} 
    {/* Core plugin JavaScript*/} 
    <ToastContainer />
  </div>
  );
}

export default App;
