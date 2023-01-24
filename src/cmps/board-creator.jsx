import { useForm } from "../customHooks/useForm"
import { boardService } from "../services/board.service"
import { CLOSE_MODAL } from "../store/reducers/app.reducer"
import { store } from "../store/store"
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { closeModal } from "../store/actions/app.actions";
import { useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function BoardCreator({ cmpProps }) {
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(boardService.getEmptyBoard())
    const elTitleInput = useRef()
    const [isRequired, setIsRequired] = useState(true)


    useEffect(() => {
        elTitleInput.current.focus()
    }, [])

    useEffectUpdate(() => {
        setIsRequired(!boardToEdit.title ? true : false)
        console.log('isRequired:', isRequired)
    }, [boardToEdit])

    function onColorClick(ev) {
        ev.preventDefault()
        const { target } = ev
        const bgColor = target.style.backgroundColor
        setBoardToEdit(board => ({ ...boardToEdit, style: { backgroundColor: bgColor } }))
    }

    function createBoard(ev) {
        ev.preventDefault()
        closeModal()
        cmpProps.onCreateBoard(boardToEdit)
    }

    return <section className="board-creator">
        <header className="creator-header">
            <h2 className="creator-title">Create board</h2>
            <button
                className="btn-remove"
                onClick={() => store.dispatch({ type: CLOSE_MODAL })}
            >
                <AiOutlineClose />
            </button>
        </header>

        <main className="creator-body">
            <div className="board-skeleton-container">
                <div className="board-preview-skeleton-background" style={boardToEdit.style}>
                    <img src="https://a.trellocdn.com/prgb/assets/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="" />
                </div>
            </div>

            <div>
                <form
                    action=""
                    onSubmit={createBoard}
                    className={`creator-form ${isRequired ? 'input-required' : ''}`}
                >
                    <div className="bg-picker-container">
                        <label className="bg-label">Background</label>
                        <ul className="bg-img-picker clean-list flex"></ul>
                        <ul className="bg-color-comtainer clean-list flex justify-between">
                            <li><button
                                type="button"
                                className="btn-clr"
                                style={{ backgroundColor: '#0079bf' }}
                                onClick={onColorClick}
                            >
                            </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-clr"
                                    style={{ backgroundColor: '#d29034' }}
                                    onClick={onColorClick}
                                >
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-clr"
                                    style={{ backgroundColor: '#519839' }}
                                    onClick={onColorClick}
                                >
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-clr"
                                    style={{ backgroundColor: '#b04632' }}
                                    onClick={onColorClick}
                                >
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-clr"
                                    style={{ backgroundColor: '#89609e' }}
                                    onClick={onColorClick}
                                >
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-clr"
                                >
                                    <span>...</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <label
                        htmlFor="title"
                        className="creator-label"
                    >
                        Board title
                        <span className="star">*</span>
                    </label>


                    <input
                        onChange={handleChange}
                        className="title-input"
                        id="title" type="text"
                        name="title"
                        value={boardToEdit.title}
                        ref={elTitleInput}

                    />
                    <span className="required">
                        <span>👋</span>
                        Board title is required
                    </span>
                    <button
                        type="submit"
                        className="btn-create"
                        disabled={!boardToEdit.title}
                    >
                        Create
                    </button>
                </form>
            </div>
        </main>
    </section >
}