import { useState } from "react";
import { Group } from "./group";
import { IoMdAdd } from "react-icons/io";



export function GroupList({ groups, setBoard, board }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    return <ul className="group-list-container">
        {
            groups.map((group) => <Group group={group} key={group.id} setBoard={setBoard} board={board} />)
        }


        {/* <div className="add-group-btn">
            <IoMdAdd />  Add another list

        </div> */}

        <form className="add-group-btn flex" action="">
            <input className="aaa" type="text" placeholder="Enter list title..." />
            
            <div className="bbb">
                <button>add</button>
                <button>x</button>
            </div>
        </form>





    </ul>
}