import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "../customHooks/useForm";
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { addNewTask } from "../store/board.actions";

export function GroupFooter({ group, boardId, setBoard }) {
    const groupId = group.id
    const [isOpenClass, setIsOpenClass] = useState('add-card-close')
    const [taskTitleToSet, setTaskTitleToSet, handleChange] = useForm(boardService.getEmptyTask())

    async function onAddNewTask(ev) {
        ev.preventDefault()
        console.log('taskTitleToSet.title:', taskTitleToSet.title)
        if (!taskTitleToSet.title) return
        try {
            const board = await boardService.getById(boardId)
            board.groups.forEach(group => {
                if (group.id === groupId) {
                    console.log('group',group)
                    group.tasks.push(taskTitleToSet)
                    return group
                }
            })
            await boardService.saveBoard(board)
            setBoard(board)
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