import { useSelector } from "react-redux"
import { BsPencil } from 'react-icons/bs'

import { useNavigate } from "react-router-dom"
import { SET_ACTIVE_BOARD } from "../store/board.reducer"
import { store } from "../store/store"
import { TaskPreviewIcons } from "./task-preview-icons"

export function TaskPreview({ task, group, boardId, isDragging }) {
    const groupId = group.id
    let style = { background: task?.style?.bgColor }
    if (task.attachments && task.attachments.length && task.attachments[0].url) style = { backgroundImage: `url(${task.attachments[0].url})`, height: '107.8px' }
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const labels = board.labels.filter(label => task?.labelIds?.includes(label.id))

    let isLabelsLarge = board.style.isLabelsLarge


    const toggleLabelsSize = (ev) => {
        ev.stopPropagation()
        board.style.isLabelsLarge = !isLabelsLarge
        const newBoard = { ...board }
        store.dispatch({ type: SET_ACTIVE_BOARD, board: newBoard })
    }

    const labelsStyle = isLabelsLarge ? 'labels-large' : ''

    return <div className={`task-preview-container ${isDragging && 'is-dragging'}`} onClick={() => navigate(`/card/${boardId}/${groupId}/${task.id}`)}>

        {/* <BsPencil /> */}

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


            <section className="task-body" >
                <p>{task.title}</p>
            </section>

            <TaskPreviewIcons board={board} groupId={groupId} task={task} />

        </li>
    </div>
}