
import { useState ,useCallback, useEffect} from "react"


/**
 * Components
 */

import Search from "./components/Search"
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo"

/**
 * React Icons
 */
import {BiCalendar} from "react-icons/bi"

export default function App() {

  let [appointmentList, setAppointmentList] = useState([]);

  let fetchData = useCallback(
    () => {
      fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      })
    },
    [],
  )

  useEffect(()=>{
    fetchData()
  }, [fetchData])
  

  return (
    <div className="container">
    <h1 className="text-3xl font-thin text-center py-10">
    <BiCalendar className="inline"/> My Appointments 
    </h1>
    <Search/>

    <AddAppointment />

    <ul>
      {appointmentList.map(appointment => (
        <AppointmentInfo 
          key={appointment.id}  
          appointment={appointment} 
          onDeleteAppointment={
            appointmentId => {
              setAppointmentList(appointmentList.filter(
                appointment => appointment.id !== appointmentId
              ))
            }
          }/>
      ))}
      
    </ul>
    </div>
    
  )
}