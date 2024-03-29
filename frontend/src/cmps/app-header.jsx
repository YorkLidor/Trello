import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiTrello } from 'react-icons/si'
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, USER_QUICK_MENU } from "./modal/modal";
import { utilService } from "../services/util.service";
import { modalService } from "../services/modal.service";
import { closeModal, toggleModal } from "../store/actions/app.actions";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { BsPeopleFill, BsPerson, } from "react-icons/bs";
import { RxShare2 } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import { MemberList } from "./task-details/member-list";
import { BiArrowBack } from "react-icons/bi";


export function AppHeader() {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)
    const [modal, setModal] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState('')
    const elModal = useRef()
    const navigate = useNavigate()


    useEffect(() => {
        setModal(modalService.addNewModal(modals))
    }, [board])



    function onToggleModal(ev, modalType) {
        console.log('toggle');
        if (!modal) return
        let element
        if (ev) {
            ev.stopPropagation()
            element = ev.target
        }
        if (ev?.target.dataset?.type === 'icon' || modalType === USER_QUICK_MENU) element = ev.target.parentNode

        let props
        let pos = utilService.getElementPosition(element)

        switch (modalType) {
            case USER_QUICK_MENU:
                props = { user }
                elModal.current.style.top = pos.bottom + 6 + 'px'
                elModal.current.style.right = 4 + 'px'
                break;
            default:
                break;
        }
        if (window.visualViewport.width < 550) {
            elModal.current.style.left = '0px'
            elModal.current.style.top = '0px'
        }

        setModal(modalService.setModalData(modals, modal.id, modalType, props))
        toggleModal(modals, modal.id)
    }

    return <>
        <header className={`app-header-regular ${!board ? 'workspace-mobile' : ''}`}>
            <nav className="main-nav flex">
                <div className="logo-container">
                    <Link to={!user ? "/" : "/workspace"} className="logo">
                        <img src="https://www.linkpicture.com/q/Shmello-logo-white.png" alt="" />
                    </Link>
                </div>

                <nav className="navlinks-container">
                    <NavLink to="/workspace">Workspaces</NavLink>
                </nav>

                {board && (
                    <div className="board-name-mobile">
                        <BiArrowBack onClick={() => navigate("/workspace")} />
                        <span>{board?.title}</span>
                    </div>
                )}

            </nav >

            {!board &&
                <div className="img-logo-mobail-container">
                    <img className="img-logo-mobail" src="https://www.linkpicture.com/q/Shmello-logo-white.png" alt="" />
                </div>
            }

            {user &&
                <button className="btn-user">
                    <img
                        alt={user.fullname}
                        src={user.imgUrl}
                        className='list-member'
                        onClick={(ev) => onToggleModal(ev, USER_QUICK_MENU)}
                    />
                </button>
            }

            {board &&
                <HiOutlineDotsHorizontal
                    className="mobail-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
            }



            <div ref={elModal} className='modal-container'>
                {
                    modal?.isOpen && <>
                        <Modal
                            modal={modal}
                            cmpProps={modal.modalData.props}
                            cmpType={modal.modalData.cmpType}
                            className={modal.modalData.className}
                        />
                        <div className="all-screen-modal" onClick={() => closeModal(modals, modal.id)} />

                    </>
                }
            </div>


            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobail-menu-open' : ''}`}>

                <div className="board-header">
                    <MdClose onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    <span>Board Menu</span>
                </div>

                <div className="icons-container">
                    <button><AiOutlineStar /></button>
                    <button><BsPeopleFill /></button>
                    <button><RxShare2 /></button>
                    <button><MdOutlineContentCopy /></button>
                </div>

                <div className="members-container">
                    <div className="title-container">
                        <BsPerson />
                        <span className="title">Members</span>
                    </div>

                    <div className="members-contant-container">
                        <div className="mambers-icons">
                            {board?.members && <MemberList members={board.members} isBoardCall={true} />}
                        </div>
                        <button className="btn-add">Invite</button>

                    </div>
                </div>

            </div>
        </header >
    </>
}