
export function GroupFooter({ setIsAddCardOpen, isAddCardOpen }) {

    return <footer className="group-footer">

        {!isAddCardOpen && <a className="add-card-btn" onClick={() => setIsAddCardOpen(!isAddCardOpen)} href="#">+ Add a card</a>}

        {isAddCardOpen && <div><button className="add-card-btn-second">Add card</button> <button onClick={() => setIsAddCardOpen(!isAddCardOpen)}>X</button></div>}

    </footer>
}