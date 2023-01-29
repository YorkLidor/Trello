import { Link, NavLink, useParams } from "react-router-dom";
import { SiTrello } from 'react-icons/si'
import { FastAverageColor } from "fast-average-color";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, USER_QUICK_MENU } from "./modal/modal";
import { utilService } from "../services/util.service";
import { modalService } from "../services/modal.service";
import { closeModal, toggleModal } from "../store/actions/app.actions";

export function AppHeader() {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const [modal, setModal] = useState(null)
    const elModal = useRef()


    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)
    const elHeader = useRef()
    const [style, setStyle] = useState({})
    const fastAveColor = new FastAverageColor()

    useEffect(() => {
        setModal(modalService.addNewModal(modals))
        if (board) setThemeColor()
        else {
            setStyle({ '--dynamic-background': '#026AA7' })
            setStyle({ '--dynamic-text': '#FFFF' })
        }
    }, [board])

    async function setThemeColor() {
        const { style } = board
        let sourceColor
        let color
        if (style.backgroundImage) {
            sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
            try {
                color = await fastAveColor.getColorAsync(sourceColor);
                setStyle({ '--dynamic-background': color.rgba })
                document.documentElement.style.setProperty('--dynamic-text', color.isLight ? '#172B4D' : '#FFFFF')
                document.documentElement.style.setProperty('--board-header-background-color', color.isLight ? '#ffffff3d' : '#0000003d')
            } catch (err) {
                console.log(err);
            }
        } else {
            sourceColor = style.backgroundColor
            setStyle({ '--dynamic-background': 'hsla(0,0%,0%,0.16)' })
            document.documentElement.style.setProperty('--dynamic-text', '#FFFFF')
        }
    }

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

    return <header className="app-header-regular flex justify-between" ref={elHeader} style={style}>
        <nav className="main-nav flex">
            <div className="logo-container">
                <Link to={!user ? "/" : "/workspace"} className="logo">
                    <img src="https://www.linkpicture.com/q/Untitled-Artwork_1.png" alt="" />
                </Link>
            </div>
            <nav className="navlinks-container">
                <NavLink to="/workspace">Workspaces</NavLink>
            </nav>
        </nav >

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
    </header >
}