import { DateSelector } from "../date-selector"
import { ModalHeader } from "./modal-header"

export function DateModal({ cmpProps, id }) {
    
    function onChangeDate(dates) {
        console.log(dates)
    }

    return <div className="modal-members-box">
        <ModalHeader id={id} header={'Dates'} allowBack={false} />
        <DateSelector onChangeDate={onChangeDate}/>
    </div>
}
