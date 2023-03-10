import { useEffect, useRef, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useForm } from "../customHooks/useForm"
import { saveBoard } from "../store/actions/board.actions";

import { useSelector } from "react-redux";
import { FaStar, FaRegStar } from 'react-icons/fa'
import { MemberList } from "./task-details/member-list";

export function BoardHeader({ onDeleteBoard, onToggleModal }) {
    const board = useSelector(state => state.boardModule.board)
    const [editClass, setEditClass] = useState('')
    const elTitleInput = useRef(null)
    const elTitle = useRef(null)
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(board)

    useEffect(() => {
        setElTitleInputWidth()
    }, [boardToEdit])

    useEffectUpdate(() => {
        setElTitleInputFocus()
        setElTitleInputWidth()
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

    function toggleisStarred() {
        board.isStarred = !board.isStarred
        saveBoard(board)
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
            <button
                className={`btn-star ${board?.isStarred ? 'active' : ''}`}
                onClick={toggleisStarred}
            >
                {!board.isStarred ? <FaRegStar /> : <FaStar />}
            </button>
        </div>
        <div className="actions-container">
            <button className="btn-filter">
                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z" fill="currentColor"></path></svg>
                Filter
            </button>
            <span className="btn-divider"></span>
            {board.members && <MemberList members={board.members} isBoardCall={true} toggleModal={onToggleModal} />}
            <button className="btn btn-share">
                <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" fill="currentColor"></path><path d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z" fill="currentColor"></path></svg>
                Share
            </button>

            <span className="btn-divider"></span>
            <button className=" btn-menu">


                <svg viewBox="561.701 313.485 16 4" width="16" height="4">
                    <path fillRule="evenodd" clipRule="evenodd" d="M 563.479 317.485 C 564.461 317.485 565.257 316.589 565.257 315.485 C 565.257 314.381 564.461 313.485 563.479 313.485 C 562.497 313.485 561.701 314.381 561.701 315.485 C 561.701 316.589 562.497 317.485 563.479 317.485 Z M 569.701 317.485 C 570.683 317.485 571.479 316.589 571.479 315.485 C 571.479 314.381 570.683 313.485 569.701 313.485 C 568.719 313.485 567.924 314.381 567.924 315.485 C 567.924 316.589 568.719 317.485 569.701 317.485 Z M 577.701 315.485 C 577.701 316.589 576.905 317.485 575.924 317.485 C 574.942 317.485 574.146 316.589 574.146 315.485 C 574.146 314.381 574.942 313.485 575.924 313.485 C 576.905 313.485 577.701 314.381 577.701 315.485 Z" fill="currentColor"></path>
                </svg>
            </button>
        </div>
    </section>
}