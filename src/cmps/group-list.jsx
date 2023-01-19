import { useState } from "react";
import { Group } from "./group";
import { IoMdAdd } from "react-icons/io";
import { boardService } from "../services/board.service";
import { saveBoard } from "../store/board.actions";
import { GroupAdd } from "./group-add";

export function GroupList({ groups, setBoard, board }) {
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await saveBoard({ ...board })
        } catch (err) {
            console.log('err', err)
        }
    }

    const handleChange = ev => {
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

        {!isAddCardOpen && <div
            className="add-group-btn"
            onClick={() => setIsAddCardOpen(!isAddCardOpen)}>
            <IoMdAdd />  Add another list
        </div>
        }

        {isAddCardOpen && <form
            onSubmit={onAddGroup}
            className="add-group-form flex group-item editable"
            action=""
        >
            <input className="new-group-title"
                type="text"
                placeholder="Enter list title..."
                onChange={handleChange}
            />

            <div className="btn-container">
                <button className="btn-add">add</button>
                <button
                    className="btn-cancel"
                    onClick={() => setIsAddCardOpen(!isAddCardOpen)}
                >x</button>
            </div>
        </form>
        }
        <GroupAdd/>
    </ul>
}