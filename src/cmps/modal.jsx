import { LabelsPicker } from "./labels-picker"
import { useSelector } from "react-redux"

export const MODAL_LABELS = 'MODAL_LABELS'
export const MODAL_ATTACH = 'MODAL_ATTACH'

export function Modal({ cmpProps, cmpType, className }) {
    const isModalOpen = useSelector((storeState) => storeState.appModule.app.isModalOpen)

    return isModalOpen && <div className={className ? className : 'modal' }>
        <GetCmp cmpProps={cmpProps} cmpType={cmpType} />
    </div>
}

function GetCmp({ cmpProps, cmpType }) {
    switch (cmpType) {
        case MODAL_LABELS:
            return <LabelsPicker cmpProps={cmpProps} />
        case MODAL_ATTACH:
            return <div></div>

    }
    return ''
}