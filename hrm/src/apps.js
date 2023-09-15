import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";




function App() {
  const login = sessionStorage.getItem('token')
  console.log(login);
  return (
   <div>
    <BrowserRouter>
    <Routes>
      {(() => { if (login) { return <Route path="" element={<Dashboard  />} /> }else{
        return <Route path="/" element={<Login  />} />

      } })()}
      

      
    
    </Routes>
    </BrowserRouter>
   </div>

   
      
    
  );
}

export default App;