// import React from 'react'

import { useContext } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { useEffect } from "react"

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments } = useContext(DoctorContext)

  useEffect(()=>{
    if (dToken) {
      getAppointments()
    }
  },[dToken])

  return (
    <div>

      <p>All Appointments</p>

    </div>
  )
}

export default DoctorAppointments