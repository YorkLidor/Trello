import { useEffect, useRef, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useForm } from "../customHooks/useForm"
import { saveBoard } from "../store/board.actions"
import { FaRegStar } from 'react-icons/fa';

export function BoardHeader({ board, onDeleteBoard }) {
    const [editClass, setEditClass] = useState('')
    const elTitleInput = useRef(null)
    const elTitle = useRef(null)
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(board)

    useEffect(() => {
        setElTitleInputWidth()
    }, [boardToEdit])

    useEffectUpdate(() => {
        setElTitleInputFocus()
    }, [editClass])

    function onHandleChange(ev) {
        setElTitleInputWidth()
        handleChange(ev)
    }

    function setElTitleInputWidth() {
        const width = elTitle.current.offsetWidth
        elTitleInput.current.style.width = width + 'px'
    }

    function setElTitleInputFocus() {
        elTitleInput.current?.focus()
    }

    async function onSaveTitle() {
        setEditClass('')
        if (!boardToEdit.title) {
            setBoardToEdit(board)
            return
        }
        try {
            await saveBoard(boardToEdit)
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    return <section className="board-header flex justify-between">
        <div
            className={`title-container ${editClass}`}
        >
            <input
                className="board-title-input"
                type="text"
                value={boardToEdit?.title || ''}
                name="title"
                onChange={onHandleChange}
                ref={elTitleInput}
                onBlur={onSaveTitle}
            />
            <h1
                className="board-title-header"
                onClick={() => setEditClass('editable')}
                ref={elTitle}
            >
                {boardToEdit?.title || ''}
            </h1>
            <button className="btn-star">
                <FaRegStar />
            </button>
        </div>
        <div className="actions-container">
            <button className="btn-filter">Filter</button>
            <span className="btn-divider"></span>
            <button className="btn btn-share">Share</button>
            <span className="btn-divider"></span>
            <button
                className="btn btn-delete"
                onClick={onDeleteBoard}
            >
                Delete
            </button>
            <span className="btn-divider"></span>
            <button className="btn btn-menu">
                <span>...</span>
            </button>
        </div>
    </section>
}