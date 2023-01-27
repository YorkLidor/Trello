import { useEffect } from "react"
import { useState } from "react"
import { saveBoard, setBoard } from "../store/actions/board.actions"

export function TaskLabels({ labels, board }) {
    const [isLabelsLarge, setIsLabelLarge] = useState(board?.style.isLabelsLarge)

    useEffect(() => {
        setIsLabelLarge(board?.style.isLabelsLarge)
    }, [board])

    async function toggleLabelsSize(ev) {
        ev.stopPropagation()
        await saveBoard({ ...board, style: { ...board.style, isLabelsLarge: !isLabelsLarge } })
    }

    return <div className="labels-container" >
        {
            labels.map(label =>
                <div
                    style={{ backgroundColor: isLabelsLarge ? label.color + '60' : label.color }}
                    onClick={toggleLabelsSize}
                    className={`labels-preview ${isLabelsLarge ? 'labels-large' : ''}`} >
                    {isLabelsLarge && <>
                        <div className="lable-circle" style={{ backgroundColor: label.color }}></div>
                        <span className='label-title-task-preview' >{label.title}</span>
                    </>
                    }
                </div>
            )
        }
    </div>

}