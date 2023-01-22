import { saveBoard } from "../store/board.actions.js"
import { useRef, useState } from "react"

export function GroupHeader({ group, board, onRemoveGroup }) {
    const groupId = group.id
    const [groupTitleToSet, setGroupTitleToSet] = useState(group.title)
    const contentEditableRef = useRef(null)

    function handleFormChange(ev) {
        setGroupTitleToSet(ev.target.innerHTML)
    }

    async function onSaveTitle() {
        group.title = groupTitleToSet
        board.groups.forEach(group => { (group.id === groupId) && (group.title = groupTitleToSet) })
        try {
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    function handleClick() {
        document.execCommand('selectAll', false, null);
    }

    // function toggleModal(ev){

    // }

    return <section className="group-header">
        <section
            tabIndex={0}
            className="group-title focused"
            onInput={handleFormChange}
            onBlur={onSaveTitle}
            onClick={handleClick}
            ref={contentEditableRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{ __html: group.title }}
            name="title"
        >
        </section>

        <button onClick={() => onRemoveGroup(group.id)}>...</button>
    </section>
}