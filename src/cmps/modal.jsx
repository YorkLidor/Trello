
import { LabelsPicker } from "./labels-picker"
import { useSelector } from "react-redux"

export function Modal({ cmpProps, cmpType }) {

    const isModalOpen = useSelector((storeState) => storeState.appModule.app.isModalOpen)

    const className = 'modal'
    console.log(isModalOpen)
    return isModalOpen && <div className={className}>
        <GetCmp cmpProps={cmpProps} cmpType={cmpType} />
    </div>

}

function GetCmp({ cmpProps, cmpType }) {
    switch (cmpType) {
        case 'labels-picker':
            return <LabelsPicker cmpProps={cmpProps} />

    }
    return ''
}