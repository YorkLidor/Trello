import { useState } from "react"
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';


export function DateSelector({ onChangeDate }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onChangeDate(dates)
  }

  return (
    <DatePicker selected={startDate} onChange={onChange}
      startDate={startDate} endDate={endDate} selectsRange inline />
  )
}