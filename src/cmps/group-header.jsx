import { saveBoard } from "../store/board.actions.js"
import { useForm } from "../customHooks/useForm";

export function GroupHeader({ group, board }) {
    const groupId = group.id
    const [groupTitleToSet, setGroupTitleToSet, handleChange] = useForm({ title: group.title })

    async function onRemoveGroup(groupId) {
        try {
            const groups = board.groups.filter((group) => group.id !== groupId)
            board.groups = groups
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    async function onSaveTitle() {
        group.title = groupTitleToSet.title
        console.log('groupt:', groupTitleToSet)
        board.groups.forEach(group => { (group.id === groupId) && (group.title = groupTitleToSet.title) })
        try {
            console.log('board:', board)
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    return <section className="group-header">
        <section
            onInput={console.log}
            onBlur={onSaveTitle}
            className="group-title focused"
            contentEditable={true}
            suppressContentEditableWarning={true}
            value={groupTitleToSet.title}
            name="title"
        >
            <section>{group.title}</section>
        </section>

        <button onClick={() => onRemoveGroup(group.id)}>...</button>
    </section>
}