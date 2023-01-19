import { boardService } from "../services/board.service.js"

export function GroupHeader({ group, setBoard, board }) {

    async function onRemoveGroup(groupId) {
        try {
            const groups = board.groups.filter((group) => group.id !== groupId)
            board.groups = groups
            await boardService.saveBoard(board)
            setBoard({ ...board })
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