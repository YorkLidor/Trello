import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import { boardService } from "../services/board.service";
import { saveBoard } from "../store/board.actions";

export function GroupFooter({ group }) {
    let board = useSelector(storeState => storeState.boardModule.board)
    const [isOpenClass, setIsOpenClass] = useState('add-card-close')
    const [taskToSet, setTaskTitleToSet, handleChange] = useForm(boardService.getEmptyTask())

    async function onAddNewTask(ev) {
        ev.preventDefault()
        console.log('taskTitleToSet.title:', taskToSet.title)
        if (!taskToSet.title) return
        try {
            group.tasks.push(taskToSet)
            board = { ...board, groups: [...board.groups] }
            await saveBoard({...board})
            setTaskTitleToSet(boardService.getEmptyTask())
            setIsOpenClass('add-card-close')
        } catch (err) {
            console.error('Cannot add new task', err)
        }

    }

    return <footer className={`group-footer-container ${isOpenClass}`}>

        <div
            className="add-card-container"
            onClick={() => setIsOpenClass('')}
        >
            <span className="add-icon-container">
                <IoAddSharp className="add-icon" />
            </span>
            <span className="add-txt-container">
                Add a card
            </span>
        </div>

        <form onSubmit={onAddNewTask}>

            <div className="textarea-container task-preview-containe">
                <textarea
                    onChange={handleChange}
                    value={taskToSet.title}
                    name='title'
                    placeholder="Enter a title for this card..."
                    className="form-textarea "
                >

                </textarea>
            </div>

            <div className="btn-controls-container">
                <button
                    className="add-btn"
                    type="submit"
                >
                    Add card
                </button>
                <button
                    className="btn-cancel"
                    onClick={() => setIsOpenClass('add-card-close')}
                    type="button"
                >
                    <IoCloseOutline />
                </button>
            </div>
        </form>
    </footer>
}