import { useState } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export function DateSelector({ onChangeDate, endDate }) {
  const [date, setDate] = useState(endDate ? endDate : new Date())

  function onSelect(date) {
    try {
      setDate(date)
      onChangeDate(date)
    }
    catch (err) {
      console.error('Failed handle date changes')
    }
  }

  return <>
    <DatePicker selected={date} onChange={onSelect}
      startDate={date} inline showTimeSelect timeFormat="p"
      timeIntervals={15} dateFormat="Pp" />
    <DatePicker selected={date} onChange={onSelect} readOnly />
  </>
}