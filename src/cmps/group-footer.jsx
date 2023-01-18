import { useState } from "react"
import { AddCardForm } from "./group-add-card-form"

export function GroupFooter() {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    return <footer className="group-footer">

        {!isAddCardOpen && <a className="add-card-btn" onClick={()=> setIsAddCardOpen(!isAddCardOpen)} href="#">+ Add a card</a>}

        {isAddCardOpen && <AddCardForm isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen}/>}

    </footer>
}