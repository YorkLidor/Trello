import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SET_ACTIVE_BOARD } from "../store/board.reducer"
import { store } from "../store/store"

export function TaskPreview({ task, group, boardId }) {
    const groupId = group.id
    const coverColor = task?.style?.bgColor
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const labels = board.labels.filter(label => task?.labelIds?.includes(label.id))

    let isLabelsLarge = board.style.isLabelsLarge


    const toggleLabelsSize = (ev) => {
        ev.preventDefault()
        board.style.isLabelsLarge = !isLabelsLarge
        const newBoard = { ...board }
        store.dispatch({ type: SET_ACTIVE_BOARD, board: newBoard })
    }

    const labelsStyle = isLabelsLarge ? 'labels-large' : ''

    return <li className="task-preview-container" >

        {coverColor &&
            <header className="cover-color" style={{ background: coverColor }}></header>
        }

        {labels.length > 0 &&
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

        <section className="task-body" onClick={() => navigate(`/card/${boardId}/${groupId}/${task.id}`)}>
            <p>{task.title}</p>
        </section>

    </li>
}