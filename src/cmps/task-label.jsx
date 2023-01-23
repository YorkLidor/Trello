import { setBoard } from "../store/actions/board.actions"

export function TaskLabels({ labels, board }) {
    let isLabelsLarge = board?.style.isLabelsLarge
    const labelsStyle = isLabelsLarge ? 'labels-large' : ''

    function toggleLabelsSize(ev) {
        ev.stopPropagation()
        board.style.isLabelsLarge = !isLabelsLarge
        setBoard({ ...board })
    }

    return <div className="labels-container" >
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