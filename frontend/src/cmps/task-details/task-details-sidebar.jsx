import { HiOutlineUser } from "react-icons/hi"
import { RiAttachment2 } from "react-icons/ri"
import { IoPricetagOutline } from "react-icons/io5"
import { HiOutlineClock } from "react-icons/hi"
import { RiInboxFill } from 'react-icons/ri'
import { TbCheckbox } from "react-icons/tb"

import { MODAL_MEMBERS, MODAL_LABELS, MODAL_ATTACH, MODAL_TASK_DATE, MODAL_TASK_COVER, MODAL_CHECKLIST } from '../modal/modal'
import { useSelector } from "react-redux"

export function TaskDetailsSideBar({ task, onToggleModal }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)

    function onJoinBoard() {
        try {
            task.memberIds.push(user._id)
        }
        catch (error) {
            console.error('Failed join board')
        }
    }

    return <div className="window-sidebar-box">
        {
            board.members.find(member => member._id === user._id) && !task.memberIds.includes(user._id) && <>
                <span className="sidebar-title">Suggested</span>
                <nav className="window-sidebar flex column">
                    <button className='button-link' onClick={onJoinBoard}><HiOutlineUser data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Join</span></button>
                </nav>
            </>
        }

        <span className="sidebar-title">Add to card</span>
        <nav className="window-sidebar flex column">
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_MEMBERS)}><HiOutlineUser data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Members</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_LABELS)}><IoPricetagOutline data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Labels</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_CHECKLIST)}><TbCheckbox data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Checklist</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_TASK_DATE)}><HiOutlineClock data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Dates</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_ATTACH)}><RiAttachment2 data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Attachment</span></button>
            {!task?.cover && <button className="button-link btn-cover" onClick={(ev) => onToggleModal(ev, MODAL_TASK_COVER)}><RiInboxFill data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Cover</span></button>}
        </nav>
            <span className="sidebar-title">Actions</span>
        <nav className="window-sidebar flex column">
            <a className='button-link' href='#'>Move</a>
        </nav>
    </div>
}