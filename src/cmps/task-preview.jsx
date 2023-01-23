import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { store } from "../store/store"
import { SET_ACTIVE_BOARD } from "../store/board.reducer"
import { TaskPreviewIcons } from "./task-preview-icons"

export function TaskPreview({ task, group, isDragging }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [isEditShow, setIsEditShow] = useState('')
    const navigate = useNavigate()

    const groupId = group.id
    let style = { background: task?.style?.bgColor }
    const labels = board.labels.filter(label => task?.labelIds?.includes(label.id))
    if (task.attachments && task.attachments.length && task.attachments[0].url) style = { backgroundImage: `url(${task.attachments[0].url})`, height: '107.8px' }

    let isLabelsLarge = board.style.isLabelsLarge
    const labelsStyle = isLabelsLarge ? 'labels-large' : ''


    const toggleLabelsSize = (ev) => {
        ev.stopPropagation()
        board.style.isLabelsLarge = !isLabelsLarge
        const newBoard = { ...board }
        store.dispatch({ type: SET_ACTIVE_BOARD, board: newBoard })
    }

    function onEditClick(ev) {
        ev.stopPropagation()
        alert('click')
    }

    return <div onMouseEnter={() => setIsEditShow('hidden-icon')} onMouseLeave={() => setIsEditShow('')} className={`task-preview-container ${isDragging && 'is-dragging'}`} onClick={() => navigate(`/card/${board._id}/${groupId}/${task.id}`)}>

        {/* EDIT ICON */}
        <section className={`edit-task-icon-container ${isEditShow}`} onClick={onEditClick}>
            <img className='edit-task-icon' src="http://res.cloudinary.com/dk2geeubr/image/upload/v1674474594/xln3wronhmxmwxpucark.svg" alt="" />
        </section>

        {/* COVER COLOR */}
        {((style && style.background) || style.backgroundImage) &&
            <header
                className="cover-color"
                style={style}
            />
        }

        <li className={`task-preview`} >
            {/* LABELS */}
            {(task.labelIds && task.labelIds.length) &&
                <div className="labels-container" >
                    {
                        labels.map(label =>
                            <div className="label-container" key={label.id}>
                                <div
                                    style={{ backgroundColor: isLabelsLarge ? label.color + '60' : label.color }}
                                    onClick={toggleLabelsSize}
                                    className={`labels-preview ${labelsStyle}`} >
                                    {isLabelsLarge && <>
                                        <div className="lable-circle" style={{ backgroundColor: label.color }}></div>
                                        <span className='label-title' >{label.title}</span>
                                    </>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            }

            {/* TASK BODY */}
            <section className="task-body" >
                <p>{task.title}</p>
            </section>

            <TaskPreviewIcons board={board} groupId={groupId} task={task} />


        </li>
    </div>
}