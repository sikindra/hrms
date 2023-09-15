import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AuthUser(){
    
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = tokenString;
        
        return userToken;
    }
    
    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = userString;

        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());
   
    const saveToken = (user,userId,UserType,token,success) =>{
       
        if(success==100){
            sessionStorage.setItem('token',token);
            sessionStorage.setItem('success',success);
            sessionStorage.setItem('userName',user);
            sessionStorage.setItem('userId',userId);
            sessionStorage.setItem('UserType',UserType);
            const hostname = window.location.hostname;
            let body={"userName":user,"RedirectPage": 'dashboard',"hostname":hostname}
 
            axios.post("http://10.10.20.22:4000/users/loginhistory",body)
            .then(response => {
                navigate('/dashboard');
                
               
            })
            

            // if(UserType=='ADMIN'){
            //     navigate('/dashboard');

            // } 
            // if(UserType=="EMP"){
            //     navigate('/Emp-dashboard');

            // }
            // if(UserType=="MAN"){
            //     navigate('/Man-dashboard');

            // }  
            
            
            
            

        }else if(success==102){
            
            toast.error('Invalid UserName');
            

        }else{
            toast.error("Invalid  password");

        }
        
        
        
    }

    const logout = (name) => {
        axios.put("http://10.10.20.22:4000/users/loginhistory/"+name)
            .then(response => {
                sessionStorage.clear();
        
                console.log( window.location.href = ("/")
                )
                
               
            })
        
    }

    const http = axios.create({
        baseURL:"http://10.10.20.22:4000/users/",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}