import { useState } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export function DateSelector({ onChangeDate, endDate }) {
  const [date, setDate] = useState(endDate ? endDate : new Date())

  function onSelect(date) {
    setDate(date)
    onChangeDate(date)
  }

  return <>
    <DatePicker selected={date} onChange={onSelect}
      startDate={date} inline showTimeSelect timeFormat="p"
      timeIntervals={15} dateFormat="Pp" />
    <DatePicker selected={date} onChange={onSelect} readOnly />
  </>
}