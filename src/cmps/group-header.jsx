import { saveBoard } from "../store/board.actions.js"

export function GroupHeader({ group, board }) {

    async function onRemoveGroup(groupId) {
        try {
            const boardToEdit = { ...board }
            const groups = boardToEdit.groups.filter((group) => group.id !== groupId)
            boardToEdit.groups = groups
            await saveBoard(boardToEdit)
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    return <section className="group-header">
        <section
            contentEditable={true}
            suppressContentEditableWarning={true}
        >
            <section>{group.title}</section>
        </section>

        <button onClick={() => onRemoveGroup(group.id)}>...</button>
    </section>
}