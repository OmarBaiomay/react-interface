
import { useState ,useCallback, useEffect, useReducer} from "react"


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
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return(
        item.petName.toLowerCase().includes(query.toLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLowerCase()) || 
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;

    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? order * -1 : 1 * order
    )
  })

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
    <Search
      query={query} 
      onQueryChange={myQuery => setQuery(myQuery)}
      orderBy={orderBy}
      onOrderByChange={myOrder => setOrderBy(myOrder)}
      sortBy={sortBy}
      onSortByChange={mySort => setSortBy(mySort)}
    />

    <AddAppointment 
      onSendAppointment={
        myAppointment => setAppointmentList([...appointmentList, myAppointment])
      }

      lastId={appointmentList.reduce(
        (max, item) => Number(item.id) > max ? Number(item.id) : max, 0 )}
    />

    <ul>
      {filteredAppointments.map(appointment => (
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