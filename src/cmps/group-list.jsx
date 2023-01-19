import { useState } from "react";
import { Group } from "./group";
import { boardService } from "../services/board.service";
import { saveBoard } from "../store/board.actions";
import { GroupAdd } from "./group-add";

export function GroupList({ groups, setBoard, board }) {
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await saveBoard({ ...board })
        } catch (err) {
            console.log('err', err)
        }
    }

    function handleChange(ev) {
        const { value } = ev.target
        setGroupToEdit({ ...groupToEdit, title: value })
    }

    return <ul className="group-list-container">
        {
            groups.map((group) =>
                <Group
                    key={group.id}
                    group={group}
                    setBoard={setBoard}
                    board={board}
                />)
        }

        <GroupAdd onAddGroup={onAddGroup} handleChange={handleChange} />
    </ul>
}