
export function AddCardForm({setIsAddCardOpen,isAddCardOpen}){

    return <div className="add-card-container">
        <form className="add-card-form" action="">

                <div><textarea type="text" placeholder="Enter a title for this card..."></textarea></div>

                <div>
                    <button>Add card</button>
                    <button onClick={()=>setIsAddCardOpen(!isAddCardOpen)}>X</button>
                </div>
            </form>
    </div>
}