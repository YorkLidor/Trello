import { useEffect, useRef, useState } from "react"

export function BoardHeader() {
    const [editClass, setEditClass] = useState('')
    const elTitleInput = useRef(null)
    const elTitle = useRef(null)
    const width = useRef(null)

    useEffect(() => {
        width.current = elTitle.current.offsetWidth
        elTitleInput.current.style.width = width.current + 'px'
    }, [])

    useEffect(() => {
        elTitleInput.current?.focus()
    }, [editClass])

    function onTitleEditToggle(ev, classToSet) {
        setEditClass(classToSet)
        if (classToSet === 'editable') ev.target.focus()
    }

    return <section className="board-header flex justify-between">
        <div
            className={`title-container ${editClass}`}
        >
            <h1
                className="board-title-header"
                onClick={ev => onTitleEditToggle(ev, 'editable')}
                ref={elTitle}
            >
                Sprint 4
            </h1>
            <input
                className="board-title-input"
                type="text"
                value="Sprint 4"
                name="title"
                onChange={console.log}
                ref={elTitleInput}

                onBlur={ev => onTitleEditToggle(ev, '')}
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