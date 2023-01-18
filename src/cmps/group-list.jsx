import { Group } from "./group";

export function GroupList({board}){
    console.log('board:', board)

    return <ul className="group-list-container">
        <Group group={board.groups[0]}/>
        {/* <Group/> */}
    </ul>
}