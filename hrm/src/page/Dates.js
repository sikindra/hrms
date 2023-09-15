// import React from 'react';

// const Dates = () => {
//   const startDate = new Date(); // Get today's date
//   startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Set date to Monday of current week

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   console.log(days[0]);

//   const Dates = [];
//   for (let i = 0; i < days.length; i++) {
//     const currentDate = new Date(startDate);
//     currentDate.setDate(currentDate.getDate() + i);
//     Dates.push(currentDate.getDate());
//   }
//   console.log(Dates[0]);

//   return (
//     <div className="dynamic-date-table">
//       <table>
//         <thead>
//           <tr>
//             <th>Week</th>
//             {days.map((day, index) => (
//               <th key={index}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Days</td>
//             {Dates.map((date, index) => (
//               <td key={index}>{date}</td>
//             ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dates;
// import moment from 'moment';
// import React, { useState } from 'react';

// const Dates = () => {
  


//   const newDate = new Date();
//   newDate.setDate(newDate.getDate() + 6);
//   console.log(moment(newDate).format('YYYY-MM-DD'));

//   return (
//     <div>
     
//       <table>
//         <thead>
//           <tr>
//             <th>Original Date</th>
//             <th>New Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
           
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dates;





// import React, { useState } from 'react';

// const Dates = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleAddDays = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(selectedDate.getDate() + 6);
//     console.log(newDate);
//     setSelectedDate(newDate);
    
//   };

//   return (
//     <div>
//       <button onClick={handleAddDays}>Add 6 Days</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Original Date</th>
//             <th>New Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{selectedDate.toDateString()}</td>
//             <td>{selectedDate.getDate() + 6}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dates;



// import React, { useState } from 'react';

// function Dates() {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handlePreviousWeek = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(newDate.getDate() - 7);
//     setSelectedDate(newDate);
//   };

//   return (
//     <div>
//       <h1>Selected Date: {selectedDate.toDateString()}</h1>
//       <button onClick={handlePreviousWeek}>Previous Week</button>
//     </div>
//   );
// }

// export default Dates;



// import React, { useState, useEffect } from 'react';

// function Dates() {
//   const [data, setData] = useState([]);
//   console.log(data);
//   useEffect(() => {
//     // Fetch JSON data from the API endpoint
//     fetch('http://10.10.20.22:4000/users/list_Attendance/2003')
//       .then(response => response.json())
//       .then(data => setData(data.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []); // The empty array [] means the effect runs only once, similar to componentDidMount

//   const currentDate = new Date();
//   const nextDay = new Date();
//   nextDay.setDate(nextDay.getDate() + 1);

//   const filteredData = data.filter(item => {
//     const entryDate = new Date(item.EntryDate);
//     return entryDate.getDate() === currentDate.getDate() || entryDate.getDate() === nextDay.getDate();
//   });

//   return (
//     <div>
//       <h1>Data from API:</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
           
//             <th>Entry Date</th>
//             <th>Entry Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index}>
              
//               <td>{item.Shift}</td>
//               <td>{item.EntryDate}</td>
//               <td>{item.EntryTime}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dates;




// import React, { useState, useEffect } from 'react';

// function Dates() {
//   const [data, setData] = useState([]);
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   const currentDate = new Date();
//   const nextDay = new Date();
//   nextDay.setDate(nextDay.getDate() + 1);

//   const dateTable = [];
//   for (let i = 0; i < days.length; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + i);
//     dateTable.push(currentDate.toDateString());
//   }

//   const filteredData = data.filter(item => {
//     const entryDate = new Date(item.EntryDate);
//     return dateTable.includes(entryDate.toDateString());
    
//   });
//   console.log(filteredData['monday']);

//   useEffect(() => {
//     // Fetch JSON data from the API endpoint
//     fetch('http://10.10.20.22:4000/users/list_Attendance/2003')
//       .then(response => response.json())
//       .then(data => setData(data.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []); // The empty array [] means the effect runs only once, similar to componentDidMount

//   return (
//     <div>
//       <h1>Data for Next 7 Days:</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Employee User Name</th>
//             <th>Shift</th>
//             <th>Entry Date</th>
//             <th>Entry Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.Name}</td>
//               <td>{item.EmployeeUserName}</td>
//               <td>{item.Shift}</td>
//               <td>{item.EntryDate}</td>
//               <td>{item.EntryTime}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dates;


// import React, { useState, useEffect } from 'react';

// const Dates = () => {
//   const [data, setData] = useState([]);
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   const Dates = [];
//   for (let i = 0; i < days.length; i++) {
//     const currentDate = new Date(startDate);
//     currentDate.setDate(currentDate.getDate() + i);
//     Dates.push(currentDate.getDate());
//   }

//   const filteredData = data.filter(item => {
//     const entryDate = new Date(item.EntryDate);
//     return Dates.includes(entryDate.getDate()); // Note: Using Dates instead of dateTable
//   });

//   useEffect(() => {
//     // Fetch JSON data from the API endpoint
//     fetch('http://10.10.20.22:4000/users/list_Attendance/2003')
//       .then(response => response.json())
//       .then(data => setData(data.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="dynamic-date-table">


// import React, { useState, useEffect } from 'react';
// import moment from 'moment'; // Make sure moment is imported and set up

// function Dates({ dateTable }) {
//   const [totalPresenceTimeForCurrentMonth, setTotalPresenceTimeForCurrentMonth] = useState(0);
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     fetch('YOUR_API_ENDPOINT') // Replace with your actual API endpoint
//       .then(response => response.json())
//       .then(responseData => {
//         const data = responseData.data;
  
//         // Filter the data to match the current month and selected dates
//         const currentDate = new Date();
//         const currentMonthData = data.filter(item => {
//           const entryDate = new Date(item.EntryDate);
//           console.log('Entry Date:', entryDate);
//           const isIncluded = entryDate.getMonth() === currentDate.getMonth() && dateTable.includes(entryDate.getDate());
        
//           console.log('Entry Date:', entryDate);
//           console.log('Is Included:', isIncluded);
        
//           return isIncluded;
//         });
  
//         console.log('Filtered Data:', currentMonthData);
  
//         // Calculate the total count in TotalPresenceTime for the current month
//         const totalPresenceTime = currentMonthData.reduce((total, item) => {
//           console.log('Item:', item); // Check individual item values
//           return total + (item.TotalPresenceTime || 0);
//         }, 0);
  
//         console.log('Total Presence Time:', totalPresenceTime);
  
//         setTotalPresenceTimeForCurrentMonth(totalPresenceTime);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
  

//   // Convert total seconds to formatted time (HH:mm:ss) using moment
//   const totalHours = Math.floor(totalPresenceTimeForCurrentMonth / 3600);
//   const totalMinutes = Math.floor((totalPresenceTimeForCurrentMonth % 3600) / 60);
//   const totalRemainingSeconds = totalPresenceTimeForCurrentMonth % 60;
//   const formattedTotalTime = moment()
//     .hours(totalHours)
//     .minutes(totalMinutes)
//     .seconds(totalRemainingSeconds)
//     .format('HH:mm:ss');

//   return (
//     <div>
//       <p>Total time for current month: {formattedTotalTime}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Total Presence Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map(item => (
//             <tr key={item.EntryDate}>
//               <td>{item.EntryDate}</td>
//               <td>{moment.utc(item.TotalPresenceTime * 1000).format('HH:mm:ss')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dates;


// import React, { useState, useEffect } from 'react';

// const Dates = () => {
  
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();
//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//   const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
//   const firstDayOfTargetWeek = new Date(currentYear, currentMonth, 28); // Adjust this for the desired week's start day
//   // Get the current date


// // Calculate the first day of the current week (Monday)
// const firstDayOfWeek = new Date(currentDate);
// firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

// // Calculate the last day of the current week (Sunday)
// const lastDayOfWeek = new Date(currentDate);
// lastDayOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

// // Format the dates as strings
// const formattedFirstDayOfWeek = firstDayOfWeek.toLocaleDateString('en-US', {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });
// const formattedLastDayOfWeek = lastDayOfWeek.toLocaleDateString('en-US', {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });

// console.log(`Week ${formattedFirstDayOfWeek} to ${formattedLastDayOfWeek}`);


//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     // Simulated data for demonstration
//     const data = [
//       { date: new Date(currentYear, currentMonth, 28), inTime: '11:31:42', outTime: '11:34:25' },
//       { date: new Date(currentYear, currentMonth, 29), inTime: '10:51:53', outTime: '11:55:05' },
//       // ... add more data for other days
//     ];

//     const formattedData = daysOfWeek.map(day => {
//       const dayData = data.find(item => item.date.getDay() === daysOfWeek.indexOf(day));

//       return {
//         day,
//         date: dayData ? dayData.date.getDate() : '',
//         inTime: dayData ? dayData.inTime : '',
//         outTime: dayData ? dayData.outTime : '',
//       };
//     });

//     setTableData(formattedData);
//   }, []);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th colSpan={8}>Pay Period: {firstDayOfMonth.toDateString()} - {lastDayOfMonth.toDateString()}</th>
//           </tr>
//           <tr>
//             <th>Week</th>
//             {daysOfWeek.map(day => (
//               <th key={day}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Days</td>
//             {tableData.map(item => (
//               <td key={item.day}>{item.date}</td>
//             ))}
//           </tr>
//           <tr>
//             <td>In</td>
//             {tableData.map(item => (
//               <td key={item.day}>{item.inTime}</td>
//             ))}
//           </tr>
//           <tr>
//             <td>Out</td>
//             {tableData.map(item => (
//               <td key={item.day}>{item.outTime}</td>
//             ))}
//           </tr>
//           <tr>
//             <td>Accumulated Hours</td>
//             {/* Calculate and display accumulated hours */}
//             {tableData.map(item => (
//               <td key={item.day}>...</td>
//             ))}
//           </tr>
//           <tr>
//             <td colSpan={8}>Working Hours: ...</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dates;

// import React, { useState } from 'react';

// const Dates = () => {
//   const [formData, setFormData] = useState({
//     date: '', // Initial value for the input
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         name="date"
//         id="input-date"
//         className="form-control"
//         value={formData.date}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default Dates;



// import React, { useState } from 'react';
// import moment from 'moment';
// import { DatePicker } from 'antd';

// const { RangePicker } = DatePicker;

// function Dates() {
//   const initialStartDate = moment('2023-08-01'); // Initial start date
//   const initialEndDate = moment('2023-08-15');   // Initial end date

//   const [selectedDates, setSelectedDates] = useState([initialStartDate, initialEndDate]);

//   const handleDateChange = (dates) => {
//     setSelectedDates(dates); // Update the selected dates
//   };

//   return (
//     <div>
//       <RangePicker value={selectedDates} onChange={handleDateChange} />
//     </div>
//   );
// }

// export default Dates;
// import React, { useState } from 'react';
// import moment from 'moment';
// import { DatePicker } from 'antd';

// const { RangePicker } = DatePicker;

// function Dates() {
//   const initialStartDate = moment('2023-08-30T15:43:49.000Z');
//   const initialEndDate = moment('2023-08-31T15:43:49.000Z');

//   const [dates, setDates] = useState([initialStartDate, initialEndDate]);

//   const handleDateChange = (dates) => {
//     setDates(dates);
//   };

//   return (
//     <div>
//       <RangePicker
//         showTime
//         value={dates}
//         onChange={handleDateChange}
//       />
//       <div>
//         Selected Start Date: {dates[0].format('YYYY-MM-DD HH:mm:ss')}
//       </div>
//       <div>
//         Selected End Date: {dates[1].format('YYYY-MM-DD HH:mm:ss')}
//       </div>
//     </div>
//   );
// }

// export default Dates;



// import moment from 'moment';
// import React from 'react';
// import { DatePicker } from 'antd';




// function Dates() {
//   const currentDate = new Date(); // Get the current date

//   // Calculate the start date (e.g., 7 days ago from the current date)
//   const startDate = new Date();
//   startDate.setDate(currentDate.getDate() - 7);

//   return (
//     <div>
//       <h1>Select a Date Range</h1>
//       <DatePicker.RangePicker
//         defaultValue={[moment(startDate), moment(currentDate)]} // Set initial date range
//         format="YYYY-MM-DD" // Format for displaying the date
//       />
//     </div>
//   );
// }

// export default Dates;
// import React, { useState, useEffect } from "react";

// import { DatePicker, Space } from "antd";
// import moment from "moment";
// const { RangePicker } = DatePicker;
// const Dates = () => {
//   const [pickedDates, setPickedDates] = useState([moment('2023-08-30T15:43:49.000Z'), moment('2023-08-30T15:43:49.000Z')]);

// /* if you want to perform an action on state update, you need to use the useEffect hook */

//   useEffect(() => {
//     // action on update of pickedDates
//     console.log("Output from useEffect:",pickedDates); /* here pickedDates will have the latest value*/
//   }, [pickedDates]);

//   const handleDateChange = (dates, dateString) => {
//     if (dates) {
//       let startDate = dateString[0];
//       let endDate = dateString[1];
//       console.log(startDate);
//       console.log(endDate);
//       setPickedDates([startDate, endDate]);
//       console.log("Output from handleDateChange:",pickedDates); /* here pickedDates does not have the latest value */
//     }
//   };

//   return (
//     <Space direction="vertical" size={12}>
//       <RangePicker onChange={handleDateChange} />
//     </Space>
//   );
// };

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { DateRangePicker, Stack } from 'rsuite';
// import 'rsuite/dist/rsuite.css';

// function Dates() {
//   const [value, setValue] = React.useState([
//     new Date('2017-02-01 01:00:00'),
//     new Date('2017-02-02 14:00:00')
//   ]);

//   const handleDateChange = (dates) => {
//     setValue(dates);

//     // Log the value to the console whenever it changes
//     console.log(dates[0]);
//   }
  
//   return (
//     <Stack direction="column" spacing={8} alignItems="flex-start">
//       <DateRangePicker value={value} onChange={handleDateChange} />

//       <DateRangePicker
//         value={value}
//         onChange={setValue}
//         showMeridian
//         format="yyyy-MM-dd HH:mm:ss"
//         defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
//       />
//       <input type="text" name="dates" id="dates" className="form-control date-range-input" placeholder="Date Range" value={value} onChange={handleDateChange}></input>
//     </Stack>
//   );
// }

// export default Dates;

// import React from 'react';
// import { DatePicker } from 'antd';
// import dayjs from 'dayjs';

// function Dates() {
//   // Define your default date range using dayjs
//   const defaultStartDate = dayjs('2022-04-17');
//   const defaultEndDate = dayjs('2022-04-21');

//   return (
//     <div>
//       <h1>Select a Date Range</h1>
//       <DatePicker.RangePicker
//         defaultValue={[defaultStartDate, defaultEndDate]}
//         format="YYYY-MM-DD"
//       />
//     </div>
//   );
// }

// export default Dates;


// import React, { useState } from 'react';
// import { DatePicker } from 'antd';
// import dayjs from 'dayjs';

// function Dates() {
//   // State to manage the selected date
//   const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

//   // Function to handle changes in the date picker
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
    
//   };

//   return (
//     <div>
//       <h1>Select a Date</h1>
//       <DatePicker
//         name="date"
//         value={selectedDate}
//         onChange={handleDateChange}
//         dateFormat="yyyy-MM-dd"
//       />
//     </div>
//   );
// }

// export default Dates;

// import React, { Component } from 'react';

// class Dates extends Component {
//   constructor() {
//     super();
//     this.state = {
//       Dates: new Date(),
//     };
//   }

//   componentDidMount() {
//     // Update the current time every second
//     this.interval = setInterval(() => {
//       this.setState({
//         Dates: new Date(),
//       });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     // Clear the interval when the component is unmounted
//     clearInterval(this.interval);
//   }

//   render() {
//     const { Dates } = this.state;
//     const formattedTime = new Date().toLocaleTimeString();

//     return (
//       <div>
//         <h1>Current Time:</h1>
//         <p>{formattedTime}</p>
//       </div>
//     );
//   }
// }

// export default Dates;



// Function to add months to a date
// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: 'Meeting',
//     start: new Date(2023, 8, 5, 10, 0),
//     end: new Date(2023, 8, 5, 12, 0),
//   },
//   // More events...
// ];

// function Dates() {
//   return (
//     <div style={{ height: '500px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ margin: '10px' }}
//       />
//     </div>
//   );
// }

// export default Dates;
import React from 'react';
import { format, parseISO } from 'date-fns';

function DateFormatter({ dateString }) {
  // Parse the ISO 8601 date string to a JavaScript Date object
  const date = parseISO(dateString);

  // Format the date in the desired format
  const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");

  return (
    <div>
      <p>Original Date String: {dateString}</p>
      <p>Formatted Date: {formattedDate}</p>
    </div>
  );
}

function Dates() {
  return (
    <div className="App">
      <DateFormatter dateString="2023-09-12T04:42:31.000Z" />
    </div>
  );
}

export default Dates;





// import React, { useState } from 'react';
// import { DatePicker, Form } from 'antd';
// import dayjs from 'dayjs';

// const Dates = () => {
//   const [oDate, setoDate] = useState(dayjs(new Date()));

//   // Define the isDateDisabled function to disable dates in the past
//   const isDateDisabled = (currentDate) => {
//     // Disable dates that are before today
//     return currentDate && currentDate < new Date().setHours(0, 0, 0, 0);
//   };

//   const handleDateChange = (date) => {
//     setoDate(date);
//   };

//   return (
//     <div>
//       <DatePicker
//         name="date"
//         value={oDate}
//         onChange={handleDateChange}
//         format="YYYY-MM-DD"
//         disabledDate={isDateDisabled} // Use the isDateDisabled function to disable past dates
//       />
//     </div>
//   );
// };

// export default Dates;

// import React from 'react';
// import { TimePicker } from 'antd';
// import moment from 'moment';
// import dayjs from 'dayjs';

// const Dates = () => {
//   // Create a moment object representing the current time
//   const currentTime = dayjs(moment());

//   return (
//     <div>
//       <h1>Time Picker Example</h1>
//       <TimePicker
//         defaultValue={currentTime} // Set the default value to the current time
//         format="HH:mm:ss" // Specify the time format
//       />
//     </div>
//   );
// };

// export default Dates;
// import React, { useState } from 'react';
// import { TimePicker } from 'antd';
// import moment from 'moment';
// import dayjs from 'dayjs';

// const Dates = () => {
//   // Initialize state for the selected time
//   const [selectedTime, setSelectedTime] = useState(null);

//   // Handle the time change event
//   const handleTimeChange = (time, timeString) => {
//     setSelectedTime(timeString); // Update the selected time state
//   };

//   return (
//     <div>
//       <h1>Time Picker Example</h1>
//       <TimePicker
//         defaultValue={dayjs(moment())} // Set the default value to the current time
//         format="HH:mm:ss" // Specify the time format
//         onChange={handleTimeChange} // Handle the time change event
//       />
//       <p>Selected Time: {selectedTime || 'No time selected'}</p>
//     </div>
//   );
// };

// export default Dates;
// import React from 'react';

// const data = {
//   days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//   in: ['14:25:50', '00:00', '11:11:30', '00:00', '00:00', '00:00', 'CLOSE'],
//   out: ['00:00:00', '00:00', '11:11:39', '00:00', '00:00', '00:00', 'CLOSE']
// };


// function Dates() {
//   return (
//     <div>
//       <h1>Weekly Data</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Week</th>
//             {data.days.map((day, index) => (
//               <th key={index}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Days</td>
//             {data.days.map((day, index) => (
//               <td key={index}>{data.days[index]}</td>
//             ))}
//           </tr>
//           <tr>
//             <td>In</td>
//             {data.in.map((time, index) => (
//               <td key={index}>{time}</td>
//             ))}
//           </tr>
//           <tr>
//             <td>Out</td>
//             {data.out.map((time, index) => (
//               <td key={index}>{time}</td>
//             ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dates;






















