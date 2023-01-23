import { FaRegStar } from 'react-icons/fa'

export function BoardPreview({ board, onBoardClick, onToggleStaredBoard }) {

    return <li
        className={`board-preview ${!board && 'mod-add'}`}
        onClick={(ev) => onBoardClick(ev, board?._id)}
        style={board && board.style}
    >
        <span className={`board-preview-fade ${!board ? 'add' : ''} flex column justify-between`}>
            {board && <h4 className="board-title">{board.title}</h4>}
            {!board && <p><span>Create new board</span></p>}

            {board && <span className='details-container flex' >
                <span
                    className='star-container flex'
                    onClick={(ev) => onToggleStaredBoard(ev, board._Id)}
                >
                    <FaRegStar />
                </span>
            </span>
            }
        </span>
    </li>
}