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
                <div className="label-container" key={label.id}>
                    <div
                        style={{ backgroundColor: isLabelsLarge ? label.color + '60' : label.color }}
                        onClick={toggleLabelsSize}
                        className={`labels-preview ${isLabelsLarge ? 'labels-large' : ''}`} >
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