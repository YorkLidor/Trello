import { useForm } from "../customHooks/useForm"
import { boardService } from "../services/board.service"
import { CLOSE_MODAL } from "../store/app.reducer"
import { store } from "../store/store"

export function BoardCreator({ cmpProps }) {
    const [boardToEdit, setBoardToEdit, handleChange] = useForm(boardService.getEmptyBoard())
    console.log('onCreateBoard:', cmpProps.onCreateBoard)
    function createBoard(ev){
        store.dispatch({ type: CLOSE_MODAL })
        console.log('boardToEdit:', boardToEdit)
        ev.preventDefault()
        cmpProps.onCreateBoard(ev, boardToEdit)
    }

    return <section className="board-creator">
        <header className="creator-header">
            <h2 className="creator-title">Create board</h2>
            <button className="btn-remove">X</button>
        </header>
        <div>
            <div>
                <img src="" alt="" />
            </div>
            <form action="" onSubmit={createBoard} className="creator-form">
                <label htmlFor="title" className="creator-label">Board title</label>
                <input onChange={handleChange} className="title-input" id="title" type="text" name="title" value={boardToEdit.title} />
                <button className="btn-create">Create</button>
            </form>
        </div>
    </section>
}