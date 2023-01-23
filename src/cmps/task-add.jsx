import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import { boardService } from "../services/board.service";
import { saveBoard } from "../store/board.actions";
import { useRef } from "react";
import { useEffect } from "react";

export function TaskAdd({ group, isAddCardOpen, setIsAddCardOpen }) {
    let board = useSelector(storeState => storeState.boardModule.board)
    const [taskToSet, setTaskTitleToSet, handleChange] = useForm(boardService.getEmptyTask())
    const textAreaRef = useRef();

    useEffect(() => { textAreaRef.current.focus() }, [isAddCardOpen])

    async function onAddNewTask(ev) {
        ev.preventDefault()
        if (!taskToSet.title) return
        try {
            group.tasks.push(taskToSet)
            board = { ...board, groups: [...board.groups] }
            await saveBoard({ ...board })
            setTaskTitleToSet(boardService.getEmptyTask())
            setIsAddCardOpen(false)
        } catch (err) {
            console.error('Cannot add new task', err)
        }
    }

    function onblurForm(){
        setTimeout(() => {
            setIsAddCardOpen(false)
        }, 100)
    }

    return <form onSubmit={onAddNewTask} onBlur={onblurForm}
        className={`add-card-form-container ${!isAddCardOpen && 'add-card-close'}`}>
        <div className="task-preview-container">

            <div className="textarea-container">
                <textarea
                    ref={textAreaRef}
                    onChange={handleChange}
                    value={taskToSet.title}
                    name='title'
                    placeholder="Enter a title for this card..."
                    className="form-textarea "
                >

                </textarea>
            </div>
        </div>

        <div className="btn-controls-container">
            <button
                className="add-btn"
                type="submit"
                onClick={onAddNewTask}
            >
                Add card
            </button>
            <button
                className="btn-cancel"
                onClick={() => setIsAddCardOpen(false)}
                type="button"
            >
                <IoCloseOutline />
            </button>
        </div>

    </form>
}