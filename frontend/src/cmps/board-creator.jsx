import { useForm } from "../customHooks/useForm"
import { boardService } from "../services/board.service"
import { AiOutlineClose } from "react-icons/ai"
import { useEffect, useRef } from "react"
import { closeModal } from "../store/actions/app.actions"
import { useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useSelector } from "react-redux"

export function BoardCreator({ cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(boardService.getEmptyBoard())
    const elTitleInput = useRef()
    const [isRequired, setIsRequired] = useState(true)


    useEffect(() => {
        elTitleInput.current.focus()
    }, [])

    useEffectUpdate(() => {
        setIsRequired(!boardToEdit.title ? true : false)
    }, [boardToEdit])

    function onColorClick(ev) {
        ev.preventDefault()
        const { target } = ev
        const style = {
            backgroundColor: target.style.backgroundColor,
            backgroundImage: target.style.backgroundImage
        }
        setBoardToEdit(board => ({ ...boardToEdit, style: { ...style } }))
    }

    function createBoard(ev) {
        ev.preventDefault()
        cmpProps.onCreateBoard(boardToEdit)
    }

    return <section className="board-creator">
        <header className="creator-header">
            <h2 className="creator-title">Create board</h2>
            <button
                className="btn-remove"

                onClick={() => closeModal(modals, cmpProps.id)}
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
                        <ul className="bg-img-picker clean-list flex">
                            <li>
                                <button
                                    type="button"
                                    className="btn-img"
                                    style={{ backgroundImage: 'url(https://res.cloudinary.com/dk2geeubr/image/upload/v1674753160/ztsiw7jboerwrvuvizgl.jpg)' }}
                                    onClick={onColorClick}
                                />
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-img"
                                    style={{ backgroundImage: 'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg)' }}
                                    onClick={onColorClick}
                                />
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-img"
                                    style={{ backgroundImage: 'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg)' }}
                                    onClick={onColorClick}
                                />
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn-img"
                                    style={{ backgroundImage: 'url(https://res.cloudinary.com/dk2geeubr/image/upload/v1674756348/aj6jsv2ifzu6tq0z9pua.jpg)' }}
                                    onClick={onColorClick}
                                />
                            </li>
                        </ul>
                        <ul className="bg-color-container clean-list flex justify-between">
                            <li>
                                <button
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