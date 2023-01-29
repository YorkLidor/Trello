import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "../customHooks/useForm"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { saveBoard } from "../store/actions/board.actions"
import { SET_TASK_QUICK_EDIT } from "../store/reducers/app.reducer"
import { store } from "../store/store"

import { TaskLabels } from "./task-label"

import { TaskPreviewIcons } from "./task-preview-icons"

export function TaskPreview({ task, groupId, isDragging, isQuickEdit }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [taskToSet, setTaskTitleToSet, handleChange] = useForm({ title: task.title })
    const [isEditBtnShow, setIsEditBtnShow] = useState('')
    const elTaskPreview = useRef()
    const navigate = useNavigate()
    const taskStyle = getStyle()
    const taskLabels = getLabels()

    const textAreaRef = useRef()

    useEffect(() => {
        textAreaRef.current?.select()
    }, []);

    async function onChangeTitle(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        try {
            task.title = taskToSet.title
            const boardToSave = await boardService.saveTaskTitle(board, groupId, task)
            store.dispatch({ type: SET_TASK_QUICK_EDIT, taskQuickEdit: null })
            await saveBoard(boardToSave)

        } catch (err) {
            console.log('cannot set new title', err)
        }
    }


    function getLabels() {
        return boardService.getLabelsById(board.labels, task.labelIds)
    }

    function getStyle() {
        let style = task?.cover?.style
        if (style?.backgroundImage) style = { ...style, height: '107.8px' }
        if (task.cover?.fullSize) style = { ...style, color: task.cover.isDark ? '#273b5b' : '#fcfcfc' }
        return style
    }

    function onTaskQuickEdit(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        const pos = utilService.getElementPosition(elTaskPreview.current)
        store.dispatch({ type: SET_TASK_QUICK_EDIT, taskQuickEdit: { task, groupId, pos } })
    }

    return <>
        <div
            className={`task-preview-container ${isDragging && 'is-dragging'} ${task?.cover?.fullSize ? 'full' : ''} ${task?.cover?.style?.backgroundImage ? 'img' : ''} ${task?.cover?.isDark ? 'dark' : ''}`}
            ref={elTaskPreview}
            onMouseEnter={() => setIsEditBtnShow('hidden-icon')}
            onMouseLeave={() => setIsEditBtnShow('')}
            onClick={() => navigate(`/${board._id}/${groupId}/${task.id}`)}
            onContextMenu={onTaskQuickEdit}
            style={task?.cover?.fullSize && !isQuickEdit ? task?.cover?.style : {}}

        >


            <section
                className={`edit-task-icon-container ${isEditBtnShow}`}
                onClick={onTaskQuickEdit}
            >
                <img
                    className='edit-task-icon'
                    src="http://res.cloudinary.com/dk2geeubr/image/upload/v1674474594/xln3wronhmxmwxpucark.svg"
                    alt=""
                />
            </section>


            {taskStyle &&
                <header
                    className="cover-color"
                    style={task?.cover?.fullSize && !isQuickEdit ? { backgroundColor: "transparent", height: taskStyle.height } : taskStyle}
                />
            }

            <li
                className={`task-preview ${task?.cover?.fullSize && !isQuickEdit ? 'full' : ''}`}
                style={{ color: taskStyle?.color && task.cover.fullSize ? taskStyle.color : '' }}

            >
                {(taskLabels && !task?.cover?.fullSize) &&
                    <TaskLabels
                        labels={taskLabels}
                        board={board}

                    />}

                {!isQuickEdit && (
                    <span className={`task-body `} >
                        {task.title}
                    </span>
                )
                }

                {isQuickEdit && (
                    <form onSubmit={onChangeTitle} className="add-card-form-container" onClick={(ev) => ev.stopPropagation()}>
                        <div className="task-preview-container">
                            <div className="textarea-container">
                                <textarea
                                    ref={textAreaRef}
                                    onChange={handleChange}
                                    value={taskToSet.title}
                                    name='title'
                                    placeholder="Enter a title for this card..."
                                    className="form-textarea"
                                >
                                </textarea>
                            </div>
                        </div>
                        <button className="add-btn" type="submit">Save</button>
                    </form>
                )
                }

                {!task?.cover?.fullSize && <TaskPreviewIcons board={board} task={task} />}
            </li>

        </div>
    </>
}