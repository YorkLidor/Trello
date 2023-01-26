import { SET_TASK_QUICK_EDIT } from "../store/reducers/app.reducer";
import { store } from "../store/store";
import { TaskPreview } from "./task-preview";
import { BsCardHeading } from 'react-icons/bs'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { BsPerson, BsArchive, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveBoard } from "../store/actions/board.actions";
import { boardService } from "../services/board.service";
import { useEffect, useState } from "react";
import { MODAL_LABELS } from "./modal/modal";
import { useRef } from "react";

export function TaskQuickEdit({ task, groupId, pos, onToggleModal ,onCloseModal}) {
    const navigate = useNavigate()
    const board = useSelector(state => state.boardModule.board)
    const [classIsFadeIn, setClassIsFadeIn] = useState(false)
    const taskPos = { top: pos.top + 'px', left: pos.left + 'px' }
    const elTaskPreview = useRef()

    useEffect(() => {
        setTimeout(() => {
            setClassIsFadeIn(true)
        }, 50);
    }, [])

    function onCloseQuickEdit(ev) {
        onCloseModal(ev)
        store.dispatch({ type: SET_TASK_QUICK_EDIT, taskQuickEdit: null })
    }

    async function onRemoveTask(board, groupId, taskId) {
        try {
            const boardToSave = await boardService.removeTask(board, groupId, taskId)
            await saveBoard(boardToSave)
        } catch (err) {
            console.error('Cannot delete task', err)
        }
    }

    async function onCopyTask(board, groupId, task) {
        try {
            const boardToSave = await boardService.copyTask(board, groupId, task)
            await saveBoard(boardToSave)
        } catch (err) {
            console.error('Cannot delete task', err)
        }
    }

    return <div className="quick-edit-container " onClick={onCloseQuickEdit} >
        <div className="task-preview-container quick-edit-task" style={taskPos} ref={elTaskPreview}>
            <TaskPreview
                task={task}
                groupId={groupId}
                isQuickEdit={true}
            />

            <div className={`quick-edit-buttons ${classIsFadeIn ? 'fade-in' : ''}`} onClick={(ev) => ev.stopPropagation()}>

                <button href="#" onClick={() => { navigate(`/${board._id}/${groupId}/${task.id}`); onCloseQuickEdit() }}>
                    <BsCardHeading />
                    <span>Open card</span>
                </button>

                <button onClick={(ev) => onToggleModal(elTaskPreview, MODAL_LABELS, groupId, task)}>
                    <BiPurchaseTagAlt style={{ transform: `rotate(-90deg)` }} />
                    <span>Edit labels</span>
                </button>

                <button href="#">
                    <BsPerson />
                    <span>Change members</span>
                </button>

                <button href="#">
                    <BsSquareHalf style={{ transform: `rotate(-90deg)` }} />
                    <span>Change cover</span>
                </button>

                <button href="#">
                    <AiOutlineArrowRight />
                    <span>Move</span>
                </button>

                <button href="#" onClick={() => { onCopyTask(board, groupId, task); onCloseQuickEdit() }}>
                    <BsCardHeading />
                    <span>Copy</span>
                </button>

                <button href="#">
                    <MdOutlineWatchLater />
                    <span>Edit dates</span>
                </button>

                <button href="#" onClick={() => { onRemoveTask(board, groupId, task.id); onCloseQuickEdit() }}>
                    <BsArchive />
                    <span>Archive</span>
                </button>
            </div>
        </div>

    </div>

}
