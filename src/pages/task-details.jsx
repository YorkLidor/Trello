import { useRef, useState } from "react"

export function TaskDetails() {

    const task = {
        "id": "c103",
        "title": "Update team tasks",
        "archivedAt": 1589983468418,
    }
    const [taskToEdit, setTaskToEdit] = useState(task)
    const descToolsRef = useRef()


    function handleEdit({ target }) {
        target.classList.toggle('is-editing')
        if(target.dataset.type === 'desc') {
            descToolsRef.current.classList.toggle('show')
        }
    }

    return taskToEdit && <section className="task-details">
        <div className="task-header flex column">
            <input type='text' className="task-title" defaultValue={task.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
            <span className="header-subtitle">in list {`<group name>`}</span>
        </div>

        <section className="task-main-col flex column">
            <div className="task-description-box flex column">
                <span className="title-main-col">Description</span>
                <textarea type='text' className="task-description" placeholder={'Add a more detailed description...'} onFocus={handleEdit} onBlur={handleEdit} data-type='desc' />
                <div ref={descToolsRef} className="description-editor-tools">
                    <button className="save-btn">Save</button>
                    <button className="cancel-btn">Cancel</button>
                </div>
            </div>


            <div className="task-activity-box flex column">
                <span className="title-main-col">Activity</span>
                <textarea type='text' className="task-activity" placeholder={'Write a comment...'} onFocus={handleEdit} onBlur={handleEdit} />
            </div>

        </section>

        <nav className="window-sidebar flex column">
            <span className="sidebar-title">Add to card</span>
            <a className='button-link' href='#'>Members</a>
            <a className='button-link' href='#'>Labels</a>
            <a className='button-link' href='#'>Checklist</a>
            <a className='button-link' href='#'>Dates</a>
            <a className='button-link' href='#'>Attachment</a>
            <a className='button-link' href='#'>Cover</a>
        </nav>

    </section>
}