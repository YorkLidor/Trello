export function TaskPreview({ task }) {
    console.log('task:', task)

    const coverColor = task.style?.bgColor

    return <li className="task-preview-container">

        {/* Style */}
        {coverColor &&
            <header className="cover-color" style={{background: coverColor}}></header>
        }

        {/* Labels */}
        {task.labelIds?.length &&

            // <LabelPicker info={} onUpdate={} />

            task.labelIds.map((labelId)=>
            {
                return 'color'
            })
        }

        <section className="task-body">
            <p>{task.title}</p>
        </section>
        {/* <section className="task-labels">lorem*5 Create backend service</section>
            <section className="task-content"></section>
            <section className="task-footer"></section> */}

    </li>
}