import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

export function GroupFooter() {
    // const [isOpenClass, setIsIdle] = useState('is-idle')

    return <footer className="group-footer-container task-preview-container">

        <div className="add-card-container">
            <span className="add-icon-container">
                <IoAddSharp className="add-icon" />
            </span>
            <span className="add-txt-container">
                Add a card
            </span>
        </div>

        <form action="">
            <textarea name="" id="" cols="30" rows="10">

            </textarea>
            <div className="btn-controls-container">
                <button
                    className="btn-add"
                    type="submit"
                >
                    Add list
                </button>
                <button
                    className="btn-cancel"
                    // onClick={() => setIsIdle('is-idle')}
                    type="button"
                >
                    X
                </button>
            </div>
        </form>



        {/* 
        <div className="task-preview-container">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>

        <button className="add-card-btn-second">Add card</button> */}

























        {/* <div className="group-footer-container">
            <div className="add-card-container">
                <span className="add-icon-container"><IoAddSharp className="add-icon" /></span>
                <span className="add-txt-container">Add a card</span>
            </div>
        </div> */}



        {/* <div className="group-footer-container-open">

            <div className="task-preview-container">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>

            <button className="add-card-btn-second">Add card</button>
            <IoAddSharp className="close-btn" onClick={() => setIsAddCardOpen(!isAddCardOpen)} />
        </div> */}

    </footer>
}