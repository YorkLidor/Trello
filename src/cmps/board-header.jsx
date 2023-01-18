import { useEffect, useRef, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function BoardHeader() {
    const [editClass, setEditClass] = useState('')
    const elTitleInput = useRef(null)
    const elTitle = useRef(null)

    useEffect(() => {
        setElTitleInputWidth()
    }, [])

    useEffectUpdate(() => {
        setElTitleInputFocus()
    }, [editClass])

    function onHandleChange() {
        //TODO: implement handle change and set to the right object
    }

    function setElTitleInputWidth() {
        const width = elTitle.current.offsetWidth
        elTitleInput.current.style.width = width + 'px'
    }

    function setElTitleInputFocus() {
        elTitleInput.current?.focus()
    }

    return <section className="board-header flex justify-between">
        <div
            className={`title-container ${editClass}`}
        >
            <h1
                className="board-title-header"
                onClick={() => setEditClass('editable')}
                ref={elTitle}
            >
                Sprint 4
            </h1>
            <input
                className="board-title-input"
                type="text"
                value="Sprint 4"
                name="title"
                onChange={onHandleChange}
                ref={elTitleInput}
                onBlur={() => setEditClass('')}
            />
        </div>
        <div className="actions-container">
            <button className="btn btn-filter">Filter</button>
            <span className="btn-divider"></span>
            <button className="btn btn-share">Share</button>
            <span className="btn-divider"></span>
            <button className="btn btn-menu">
                <span>...</span>
            </button>
        </div>
    </section>
}