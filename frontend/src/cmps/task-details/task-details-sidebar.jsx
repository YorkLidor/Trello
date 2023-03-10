import { useSelector } from "react-redux"

import { MODAL_MEMBERS, MODAL_LABELS, MODAL_ATTACH, MODAL_TASK_DATE, MODAL_TASK_COVER, MODAL_CHECKLIST, MODAL_TASK_MOVE, MODAL_TASK_COPY, MODAL_TASK_DELETE } from '../modal/modal'

import { RiAttachment2, RiInboxFill } from "react-icons/ri"
import { IoPricetagOutline } from "react-icons/io5"
import { BsArchive } from "react-icons/bs"
import { TbCheckbox } from "react-icons/tb"
import { HiOutlineUser, HiOutlineClock, HiOutlineArrowRight } from "react-icons/hi"
import { MdContentCopy } from 'react-icons/md'


export function TaskDetailsSideBar({ task, onToggleModal }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)

    function onJoinBoard() {
        try {
            const idx = board.members.findIndex(member => member._id === user._id)
            if (idx === -1) board.members.push(user)
            
            if (task.memberIds) task.memberIds.push(user._id)
            else task.memberIds = [user._id]
        }
        catch (error) {
            console.error('Failed join board')
        }
    }

    return <div className="window-sidebar-box">
        {
            !task.memberIds?.includes(user._id) && <>
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
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_TASK_MOVE)}><HiOutlineArrowRight data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Move</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_TASK_COPY)}><MdContentCopy data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Copy</span></button>
            <button className='button-link' onClick={(ev) => onToggleModal(ev, MODAL_TASK_DELETE)}><BsArchive data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Delete</span></button>
        </nav>
    </div>
}