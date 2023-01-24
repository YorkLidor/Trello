import { useEffect, useRef } from "react"


export const useEffectInit = (callBack, dependencies) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            callBack()
            isFirstRender.current = false
            return
        }        
    }, dependencies)
}