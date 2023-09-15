import moment from 'moment';
import React, { useEffect, useState } from 'react'
import AuthUser from './AuthUser';
import Sidebar from './Sidebar'
import Sidebar1 from './Sidebar1'

const Attendance_report = () => {
  const {http} = AuthUser();
  
  const [data, setData] = useState([]);
  const [startDate, setSelectedDate] = useState(new Date());
  
  const currentYear = startDate.getFullYear();
  const currentMonth = startDate.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
 
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Set date to Monday of current week
  const firstDayOfWeek = new Date(startDate);
firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1);

// Calculate the last day of the current week (Sunday)
const lastDayOfWeek = new Date(startDate);
lastDayOfWeek.setDate(startDate.getDate() + (7 - startDate.getDay()));

// Format the dates as strings
const formattedFirstDayOfWeek = firstDayOfWeek.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const formattedLastDayOfWeek = lastDayOfWeek.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
 
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  

  const dateTable = [];
  for (let i = 0; i < days.length; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    dateTable.push(currentDate.getDate());
  }

  const filteredData = data.filter(item => {
  const entryDate = new Date(item.EntryDate);
  const entryYear = entryDate.getFullYear();
  const entryMonth = entryDate.getMonth();
  const entryDay = entryDate.getDate();

  const currentDate = new Date(startDate);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();



  return (
    entryYear === currentYear &&
    entryMonth === currentMonth &&
    dateTable.includes(entryDay)
  );
});
  

  useEffect(()=>{
    
    attendanceList();
  }, [attendanceList]);
  function attendanceList(){
    
    http.get("list_Attendance/"+sessionStorage.getItem('userId')).then((res)=>{
      setData(res.data.data);
      
    })
    .catch(err => {
      // some error handling
    });
  }

  //Worked Hours
  const totalWorkedSecondsForWeek = filteredData.reduce((total, item) => total + item.TotalPresenceTime, 0);
const totalWorkedHoursForWeek = Math.floor(totalWorkedSecondsForWeek / 3600);
const totalWorkedMinutesForWeek = Math.floor((totalWorkedSecondsForWeek % 3600) / 60);
const totalWorkedSecondsRemaining = totalWorkedSecondsForWeek % 60;

const totalFormattedTimeForWeek = moment().hours(totalWorkedHoursForWeek).minutes(totalWorkedMinutesForWeek).seconds(totalWorkedSecondsRemaining).format('HH:mm:ss');
 //Total Hours
 const shiftTiming = { start: "9:45 am", end: "6:00 pm" };

// Function to convert "hh:mm am/pm" time to minutes since midnight
const convertToMinutes = (timeString) => {
  const timeParts = timeString.match(/(\d+):(\d+)\s+(am|pm)/i);
  if (!timeParts) {
    throw new Error("Invalid time format. Use 'hh:mm am/pm' format.");
  }
  let hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const period = timeParts[3].toLowerCase();
  if (period === "pm" && hours !== 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes; // Convert to minutes since midnight
};

// Function to calculate the total hours worked in one week for a single shift
const calculateTotalHoursWorkedInWeek = (shiftTiming) => {
  const startMinutes = convertToMinutes(shiftTiming.start);
  const endMinutes = convertToMinutes(shiftTiming.end);
  const hoursWorked = (endMinutes - startMinutes) / 60; // Convert to hours
  return hoursWorked * 5; // Multiply by 7 for each day of the week
};

// Calculate the total hours worked in one week for the single shift
const totalHoursWorkedInWeek = calculateTotalHoursWorkedInWeek(shiftTiming);
 

const totalPresenceTimeForAllData = data.reduce((total, item) => {
  return total + item.TotalPresenceTime;
}, 0);

// Convert total seconds to HH:mm:ss format
const formattedTotalPresenceTime = moment()
  .startOf('day')
  .seconds(totalPresenceTimeForAllData)
  .format('HH:mm:ss');

  //next week

  const handleAddDays = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 6);
   
    setSelectedDate(newDate)
   
    
  };
  //last days

  

  const handLastDays = () => {
    const lastDate = new Date(startDate);
    lastDate.setDate(lastDate.getDate() - 6);
   
    setSelectedDate(lastDate)
    
    
  };
  

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
                  <div className="title-wrap"><h1 className="title is-4">Attendance Reports</h1></div>
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
                        <button type="button" className="btn btn-outline-dark" onClick={handLastDays}><i className="lnil lnil-chevron-left icon" />Last Week</button>
                      </div>
                      <div className="form-group">
                        <span className="alert alert-primary">{days[0]} {moment(formattedFirstDayOfWeek).format('YYYY-MM-DD')} to {days[6]} {moment(formattedLastDayOfWeek).format('YYYY-MM-DD')}</span>
                      </div>
                      <div className="form-group">
                        <button type="button" className="btn btn-outline-dark" onClick={handleAddDays}><i className="lnil lnil-chevron-right icon" />Next Week</button>
                       
                      </div>
                    </form>
                    
                    <button type="button" className="btn btn-light btn-icon tooltip-top" data-tooltip="Print"><i className="lnil lnil-printer" /></button>	
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody>
                          
                          
                          
                          
                          <tr>
                            <th className="info-light">Week</th>
                            
                            {days.map((day, index) => (
                              <th key={index}>{day}</th>
                            ))}
          
                          </tr>
                          <tr>
                            <th className="bg-light">Days</th>
                            {dateTable.map((date, index) => (
                              <td key={index}>{date}</td>
                            ))}
                          </tr>
                         
                          <tr>
                            <th className="success-light">In</th>
                            {dateTable.map((date, dateIndex) => {
                          const filteredEntry = filteredData.find(item => {
                            const entryDate = new Date(item.EntryDate);
                            const entryDay = entryDate.getDate();
                            const entryMonth = entryDate.getMonth();
                            const entryYear = entryDate.getFullYear();

                            return entryDay === date && entryMonth === new Date().getMonth() && entryYear === new Date().getFullYear();
                          });

                          return (
                            <td key={dateIndex}>
                              {filteredEntry ? filteredEntry.EntryTime : '00:00'}
                            </td>
                          );
                        })}



                            
                          </tr>
                          <tr>
                            <th className="purple-light">Out</th>
                            {dateTable.map((date, dateIndex) => {
                              const filteredEntry = filteredData.find(item => {
                                const entryDate = new Date(item.EntryDate);
                                return entryDate.getDate() === date;
                              });

                              return (
                                <td key={dateIndex}>
                                  {filteredEntry ? filteredEntry.OutTime : '00:00'}
                                </td>
                              );
                            })}
                            
                          </tr>
                          <tr>
                            <th className="bg-light text-center" colSpan={8}>Accumulated Hours</th>
                          </tr>
                          <tr>
                            <th className="primary-light">Working Hours</th>
                            {dateTable.map((date, dateIndex) => {
                            const filteredEntry = filteredData.find(item => {
                              const entryDate = new Date(item.EntryDate);
                              return entryDate.getDate() === date;
                            });

                            const seconds = filteredEntry ? filteredEntry.TotalPresenceTime : 0;
                            const hours = Math.floor(seconds / 3600);
                            const minutes = Math.floor((seconds % 3600) / 60);
                            const remainingSeconds = seconds % 60;

                            const formattedTime = moment().hours(hours).minutes(minutes).seconds(remainingSeconds).format('HH:mm:ss');

                            return (
                              <td key={dateIndex}>
                                {filteredEntry ? (
                                  <>
                                  
                                    {formattedTime}
                                  </>
                                ) : (
                                  '00:00'
                                )}
                              </td>
                            );
                          })}
                          </tr>
                          <tr>
                            <td className="bg-light text-center" colSpan={8}>Pay Period: <strong>{firstDayOfMonth.toDateString()} - {lastDayOfMonth.toDateString()}</strong></td>
                          </tr>
                          <tr>
                            <td colSpan={7} className="text-right"><strong>Worked Hours</strong></td>
                            <td>{totalFormattedTimeForWeek}</td>
                          </tr>
                          <tr>
                            <td colSpan={7} className="text-right"><strong>Total Hours</strong></td>
                            <td>{totalHoursWorkedInWeek}</td>
                          </tr>
                        </tbody></table>
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

export default Attendance_report
