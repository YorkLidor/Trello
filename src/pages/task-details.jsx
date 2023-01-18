import { useRef, useState } from "react"
import { FaPager } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { MdFormatListBulleted } from "react-icons/md";


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
        if (target.dataset.type === 'desc') {
            descToolsRef.current.classList.toggle('show')
        }
    }

    return taskToEdit && <section className="task-details">
        <div className="task-header">
            <FaPager className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={task.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
            <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{`In development`}</span></p>
        </div>


        <section className="task-main-col">
            <section className="task-info">

                <div className="task-labels-box">

                </div>
                <div className="task-members-box">

                </div>
            </section>


            <div className="task-description-box flex column">
                <GrTextAlignFull className="desc-icon task-icon" />

                <div className="description-header">
                    <span className="title-main-col">Description</span>
                </div>


                <textarea type='text' className="task-description" placeholder={'Add a more detailed description...'} onFocus={handleEdit} onBlur={handleEdit} data-type='desc' />
                <div ref={descToolsRef} className="description-editor-tools">
                    <button className="save-btn">Save</button>
                    <button className="cancel-btn">Cancel</button>
                </div>
            </div>


            <div className="task-activity-box flex column">
                <MdFormatListBulleted className="activity-icon task-icon" />

                <div className="activity-header">
                    <span className="title-main-col">Activity</span>
                </div>
                
                <textarea type='text' className="task-activity" placeholder={'Write a comment...'} onFocus={handleEdit} onBlur={handleEdit} />
            </div>

        </section>
        <div className="window-sidebar-box">
            <nav className="window-sidebar flex column">
                <span className="sidebar-title">Add to card</span>
                <a className='button-link' href='#'>Members</a>
                <a className='button-link' href='#'>Labels</a>
                <a className='button-link' href='#'>Checklist</a>
                <a className='button-link' href='#'>Dates</a>
                <a className='button-link' href='#'>Attachment</a>
                <a className='button-link' href='#'>Cover</a>
            </nav>

            <nav className="window-sidebar flex column">
                <span className="sidebar-title">Actions</span>
                <a className='button-link' href='#'>Move</a>
                <a className='button-link' href='#'>Copy</a>
                <a className='button-link' href='#'>Make template</a>
                <a className='button-link' href='#'>Watch</a>
                <a className='button-link' href='#'>Archive</a>
                <a className='button-link' href='#'>Share</a>
            </nav>
        </div>

    </section >
}