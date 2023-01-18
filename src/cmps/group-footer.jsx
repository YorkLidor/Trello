import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

export function GroupFooter({ setIsAddCardOpen, isAddCardOpen }) {

    return <footer className="group-footer">

        {!isAddCardOpen &&
            <div className="group-footer-close">
                <IoMdAdd className="add-icon" />
                <a className="add-card-btn" onClick={() => setIsAddCardOpen(!isAddCardOpen)} href="#"> Add a card</a>
            </div>
        }

        {isAddCardOpen &&
            <div className="group-footer-open">
                <button className="add-card-btn-second">Add card</button>
                <IoMdClose className="close-btn" onClick={() => setIsAddCardOpen(!isAddCardOpen)} />
            </div>
        }

    </footer>
}