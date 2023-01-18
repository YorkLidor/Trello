import { removeGroup } from "../store/group.action"

export function GroupHeader({group}) {

    async function onRemoveGroup(groupId) {
        try {
            await removeGroup(groupId)
        } catch (err) {
            // showErrorMsg('Cannot remove group')
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