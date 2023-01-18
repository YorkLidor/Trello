import { useRef, useState } from "react"

import { FaPager } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { FiList } from "react-icons/fi";

import { HiOutlineUser } from 'react-icons/hi'
import { IoPricetagOutline } from 'react-icons/io5'
import { TbCheckbox } from 'react-icons/tb'
import { GoClock } from 'react-icons/go'
import { GrAttachment } from 'react-icons/gr'
import { MdWallpaper } from 'react-icons/md'
import userEvent from "@testing-library/user-event";


export function TaskDetails() {
    const userIcon = 'assets/styles/img/profileDefault.png'
    const task = {
        "id": "c103",
        "title": "Update team tasks",
        "archivedAt": 1589983468418,
    }
    const [taskToEdit, setTaskToEdit] = useState(task)
    const descToolsRef = useRef()
    const elCommentRef = useRef()
    const commentBtnRef = useRef()


    function handleEdit({ target }) {
        console.log(target.dataset.type)
        target.classList.toggle('is-editing')
        if (target.dataset.type === 'desc') descToolsRef.current.classList.toggle('show')
        else if (target.dataset.type === 'comment') {
            elCommentRef.current.classList.toggle('comment-typing')
            commentBtnRef.current.classList.toggle('show')
        }
    }

    return taskToEdit && <section className="task-window flex">
        <section className="task-details">
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
                    <FiList className="activity-icon task-icon" />

                    <div className="activity-header">
                        <span className="title-main-col">Activity</span>
                        <a className='button-link-header' href='#'>Show Details</a>
                    </div>
                    <img className="user-logo" src='https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png' />
                    <div className="task-activity" ref={elCommentRef}>
                        <textarea type='text' className="task-activity-input" placeholder={'Write a comment...'} data-type='comment' onFocus={handleEdit} onBlur={handleEdit} />
                        <button className="save-btn comment-btn" ref={commentBtnRef}>Save</button>
                    </div>
                </div>

            </section>
            <div className="window-sidebar-box">
                <nav className="window-sidebar flex column">
                    <span className="sidebar-title">Add to card</span>
                    <a className='button-link' href='#'><HiOutlineUser /> Members</a>
                    <a className='button-link' href='#'><IoPricetagOutline /> Labels</a>
                    <a className='button-link' href='#'><TbCheckbox /> Checklist</a>
                    <a className='button-link' href='#'><GoClock /> Dates</a>
                    <a className='button-link' href='#'><GrAttachment /> Attachment</a>
                    <a className='button-link' href='#'><MdWallpaper /> Cover</a>
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
        </section>
    </section >
}