import { saveBoard } from "../store/board.actions.js"
import { useForm } from "../customHooks/useForm";
import { useState } from "react";

export function GroupHeader({ group, board }) {
    const groupId = group.id
    const [groupTitleToSet, setGroupTitleToSet] = useState(group.title)

    async function onRemoveGroup(groupId) {
        try {
            const groups = board.groups.filter((group) => group.id !== groupId)
            board.groups = groups
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    function handleFormChange(ev) {
        console.log('ev.target.innerHTML:', ev.target.innerHTML)
        setGroupTitleToSet(ev.target.innerHTML)
    }

    async function onSaveTitle() {
        group.title = groupTitleToSet
        board.groups.forEach(group => { (group.id === groupId) && (group.title = groupTitleToSet) })
        try {
            console.log('board:', board)
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    return <section className="group-header">
        <section
            onInput={handleFormChange}
            onBlur={onSaveTitle}
            className="group-title focused"
            contentEditable={true}
            suppressContentEditableWarning={true}
            value={groupTitleToSet}
            dangerouslySetInnerHTML={{ __html: group.title }}
            name="title"
        >
        </section>
            {/* <section>{group.title}</section> */}

        <button onClick={() => onRemoveGroup(group.id)}>...</button>
    </section>
}