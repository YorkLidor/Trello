import { Group } from "./group";

export function GroupList({ groups }) {
    console.log('groups:', groups)

    return <ul className="group-list-container">
        {
            groups.map((group)=><Group group={group} key={group.id} />)
        }
        
    </ul>
}