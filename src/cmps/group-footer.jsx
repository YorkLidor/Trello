import { IoAddSharp } from "react-icons/io5";

export function GroupFooter({isAddCardOpen,setIsAddCardOpen}) {
    
    return <footer className={`group-footer-container ${isAddCardOpen && 'add-card-close'}`}>
        <div
            className="add-card-container"
            onClick={() => setIsAddCardOpen(true)}
        >
            <span className="add-icon-container">
                <IoAddSharp className="add-icon" />
            </span>
            <span className="add-txt-container">
                Add a card
            </span>
        </div>
    </footer>
}