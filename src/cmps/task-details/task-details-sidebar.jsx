import { HiOutlineUser } from "react-icons/hi"
import { RiAttachment2 } from "react-icons/ri"
import { IoPricetagOutline } from "react-icons/io5"

import { MODAL_MEMBERS, MODAL_LABELS, MODAL_ATTACH } from '../modal/modal'

export function TaskDetailsSideBar({ onToggleModal }) {
    return <div className="window-sidebar-box">
        <span className="sidebar-title">Add to card</span>
        <nav className="window-sidebar flex column">
            <a className='button-link' href='#' onClick={(ev) => onToggleModal(ev, MODAL_MEMBERS)}><HiOutlineUser data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Members</span></a>
            <a className='button-link' href='#' onClick={(ev) => onToggleModal(ev, MODAL_LABELS)}><IoPricetagOutline data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Labels</span></a>
            <a className='button-link' href='#' onClick={(ev) => onToggleModal(ev, MODAL_ATTACH)}><RiAttachment2 data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Attachment</span></a>
            {/* <a className='button-link' href='#'><MdWallpaper data-type='icon' /> Cover</a> */}
        </nav>
    </div>
}