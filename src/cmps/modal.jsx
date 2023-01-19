import { useRef } from "react"
import { LabelsPicker } from "./labels-picker"
import { useState } from "react"
import { useSelector } from "react-redux"

export function Modal({ props, type }) {

    const state = useSelector((storeState) => storeState.appModule.app.isModalOpen)
    console.log(state)
    
    const className = 'modal ' + (state? 'is-open' : '')

    return  <div className={className}>
        <GetCmp props={props} type={type} />
    </div>
        
}

function GetCmp({props, type}) {
    switch (type) {
        case 'labels-picker':
            return <LabelsPicker props={props} />

    }
    return ''
}