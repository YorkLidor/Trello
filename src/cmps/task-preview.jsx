import { useRef,useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { SET_TASK_QUICK_EDIT } from "../store/reducers/app.reducer"
import { store } from "../store/store"

import { TaskLabels } from "./task-label"

import { TaskPreviewIcons } from "./task-preview-icons"

export function TaskPreview({ task, groupId, isDragging, isQuickEdit }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [isEditBtnShow, setIsEditBtnShow] = useState('')
    const elTaskPreview = useRef()
    const navigate = useNavigate()
    const taskStyle = getStyle()
    const taskLabels = getLabels()


    function getLabels() {
        return boardService.getLabelsById(board.labels, task.labelIds)
    }

    function getStyle() {
        let style = { background: task?.style?.bgColor }
        if (task.attachments && task.attachments.length && task.attachments[0].url) {
            style = { backgroundImage: `url(${task.attachments[0].url})`, height: '107.8px' }
        }
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
            ref={elTaskPreview}
            onMouseEnter={() => setIsEditBtnShow('hidden-icon')}
            onMouseLeave={() => setIsEditBtnShow('')} className={`task-preview-container ${isDragging && 'is-dragging'}`}
            onClick={() => navigate(`/${board._id}/${groupId}/${task.id}`)}
            onContextMenu={onTaskQuickEdit}
        >

            {/* EDIT ICON */}
            <section
                className={`edit-task-icon-container ${isEditBtnShow}`}
                onClick={onTaskQuickEdit}
            >
                <img className='edit-task-icon' src="http://res.cloudinary.com/dk2geeubr/image/upload/v1674474594/xln3wronhmxmwxpucark.svg" alt="" />
            </section>

            {/* COVER */}
            {((taskStyle && taskStyle.background) || taskStyle.backgroundImage) &&
                <header
                    className="cover-color"
                    style={taskStyle}
                />
            }

            <li className="task-preview" >
                {/* LABELS */}
                {taskLabels && <TaskLabels labels={taskLabels} board={board} />}

                {/* BODY */}
                <section className="task-body" >
                    <p>{task.title}</p>
                </section>

                {/* ICONS */}
                <TaskPreviewIcons board={board} task={task} />
            </li>

        </div>
    </>
}