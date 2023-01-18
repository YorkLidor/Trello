import { useState } from "react";
import { Group } from "./group";
import { IoMdAdd } from "react-icons/io";
import { boardService } from "../services/board.service";

export function GroupList({ groups, setBoard, board }) {
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await boardService.saveBoard(board)
            setBoard({ ...board })
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
            groups.map((group) => <Group
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
            className="add-group-form flex group-item"
            action=""
        >
            <input className="aaa"
                type="text"
                placeholder="Enter list title..."
                onChange={handleChange}
            />

            <div className="bbb">
                <button>add</button>
                <button onClick={() => setIsAddCardOpen(!isAddCardOpen)}>x</button>
            </div>
        </form>
        }
    </ul>
}