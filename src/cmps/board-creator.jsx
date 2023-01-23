import { useForm } from "../customHooks/useForm"
import { boardService } from "../services/board.service"
import { CLOSE_MODAL } from "../store/app.reducer"
import { store } from "../store/store"
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { closeModal } from "../store/app.actions";

export function BoardCreator({ cmpProps }) {
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(boardService.getEmptyBoard())
    const elTitleInput = useRef()

    useEffect(() => {
        elTitleInput.current.focus()
    }, [])

    function createBoard(ev) {
        ev.preventDefault()
        closeModal()
        cmpProps.onCreateBoard(ev, boardToEdit)
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
                <form action="" onSubmit={createBoard} className="creator-form">
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
                    <button
                        className="btn-create"
                        disabled={!boardToEdit.title}
                    >
                        Create
                    </button>
                </form>
            </div>
        </main>
    </section>
}