import { useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service"
import { LabelPicker } from "./lable-picker"

export function TaskPreview({ task, group, boardId }) {
    const groupId = group.id
    const coverColor = task?.style?.bgColor
    const navigate = useNavigate()

    getLabels()
    async function getLabels() {
        try {
            let labels = await boardService.getLabelsById(boardId, task.labelIds)
            const html = labels.map((label) => { return <h1>{label.title}</h1> })
            console.log('html:', html)
            // return labels
        } catch (error) {

        }
    }

    return <li className="task-preview-container" onClick={() => navigate(`/card/${boardId}/${groupId}/${task.id}`)}>

        {coverColor &&
            <header className="cover-color" style={{ background: coverColor }}></header>
        }

        {/* {task?.labelIds?.length && {getLabels().map((label)=>{

            return (<button>{label.title}</button>)
        })}

            // <LabelPicker labelIds={task.labelIds} onUpdate={''} />
        } */}

        <div className="labels-container">
            <div className="label">
                <button className="btn-label"></button>
            </div>
        </div>


        <section className="task-body">
            <p>{task.title}</p>
        </section>

    </li>
}