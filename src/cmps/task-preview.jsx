import { useNavigate } from "react-router-dom"
import { LabelPicker } from "./lable-picker"

export function TaskPreview({ task, group, boardId }) {
    const groupId = group.id
    const coverColor = task?.style?.bgColor
    const navigate = useNavigate()

    return <li className="task-preview-container" onClick={() => navigate(`/card/${boardId}/${groupId}/${task.id}`)}>

        {/* Style */}
        {coverColor &&
            <header className="cover-color" style={{ background: coverColor }}></header>
        }

        {/* Labels */}
        {task?.labelIds?.length &&
            <LabelPicker labelIds={task.labelIds} onUpdate={''} />
        }

        <section className="task-body">
            <p>{task.title}</p>
        </section>
        {/* <section className="task-labels">lorem*5 Create backend service</section>
            <section className="task-content"></section>
            <section className="task-footer"></section> */}

    </li>
}