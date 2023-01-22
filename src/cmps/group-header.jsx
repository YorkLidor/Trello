import { saveBoard, setBoard } from "../store/board.actions.js"
import { useState } from "react";

export function GroupHeader({ group, board, onRemoveGroup }) {
    const groupId = group.id
    const [groupTitleToSet, setGroupTitleToSet] = useState(group.title)

    

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

    function onClick(){
        
    }

    return <section className="group-header">
        <section
            onInput={handleFormChange}
            onBlur={onSaveTitle}
            onClick={onClick}
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