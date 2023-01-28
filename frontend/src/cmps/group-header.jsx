import { saveBoard } from "../store/actions/board.actions.js"
import { useRef, useState } from "react"
import { useForm } from "../customHooks/useForm.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { MODAL_GROUP_QUICK_EDIT, MODAL_MEMBERS } from "./modal/modal.jsx"

export function GroupHeader({ group, board, onRemoveGroup, onToggleModal, onCopyGroup }) {
    const [groupToEdit, setGroupToEdit, handleChange] = useForm(group)
    const elTitleInput = useRef()
    const elTitle = useRef()
    const [editClass, setEditClass] = useState('')

    useEffectUpdate(() => {
        setElTitleInputFocus()
    }, [editClass])

    function onHandleChange(ev) {
        handleChange(ev)
    }

    function setElTitleInputFocus() {
        elTitleInput.current?.focus()
    }

    async function onSaveTitle() {
        setEditClass('')
        if (!groupToEdit.title) {
            setGroupToEdit(group)
            return
        }
        if (groupToEdit.title === group.title) return
        group.title = groupToEdit.title
        try {
            await saveBoard(board)
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    return <section className="group-header">
        <div
            className={`title-container ${editClass}`}
        >
            <input
                className="group-title-input"
                type="text"
                value={groupToEdit?.title || ''}
                name="title"
                onChange={onHandleChange}
                ref={elTitleInput}
                onBlur={onSaveTitle}
            />
            <h1
                className="group-title-header"
                onClick={() => setEditClass('editable')}
                ref={elTitle}
            >
                {groupToEdit?.title || ''}
            </h1>
        </div>

        <button className="btn-remove" onClick={(ev) => onToggleModal(ev, MODAL_GROUP_QUICK_EDIT, { groupId: group.id, onRemoveGroup, onCopyGroup })}>
            <span>...</span>
        </button>
    </section>
}