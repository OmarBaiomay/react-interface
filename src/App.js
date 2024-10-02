/**
 * Components
 */

import Search from "./components/Search"


/**
 * React Icons
 */
import {FaCalendar} from "react-icons/fa6"

export default function App() {
  return (
    <>
    <h1 className="text-3xl font-thin text-center py-10">
    <FaCalendar className="inline"/> My Appointments 
    </h1>
    <Search/>
    </>
    
  )
}