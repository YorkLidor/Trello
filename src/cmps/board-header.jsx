import { useEffect, useRef, useState } from "react"

export function BoardHeader() {
    const [editClass, setEditClass] = useState('')
    const elTitleContainer = useRef(null)

    function onTitleEditToggle(classToSet) {
        setEditClass(classToSet)
        elTitleContainer.current.className.add('editable')
    }

    return <section className="board-header flex justify-between">
        <div
            className={`title-container ${editClass}`}
            ref={elTitleContainer}
        >
            <h1
                className="board-title-header"
                onClick={() => onTitleEditToggle('editable')}
            >
                Sprint 4
            </h1>
            <input
                className="board-title-input"
                type="text"
                value="Sprint 4"
                name="title"
                onChange={console.log}
                onBlur={() => onTitleEditToggle('')}
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