
export function AddCardForm({setIsAddCardOpen,isAddCardOpen}){

    return <div className="add-card-form">
        <form action="">
                <textarea type="text" placeholder="Enter a title for this card..."></textarea>
                <button>Add card</button>
                <button onClick={()=>setIsAddCardOpen(!isAddCardOpen)}>X</button>
            </form>
    </div>
}