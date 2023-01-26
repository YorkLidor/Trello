
import { FaStar, FaRegStar } from 'react-icons/fa'

export function BoardPreview({ boardId = null, board, onBoardClick, onToggleStaredBoard, isStarred }) {


    return <li
        className={`board-preview ${!board && 'mod-add'}`}
        onClick={(ev) => onBoardClick(ev, board?._id)}
        style={board && board.style}
    >
        <span 
        data-type="icon"
        className={`board-preview-fade
         ${!board ? 'add' : ''} ${board?.isStarred ? 'light' : ''} flex column justify-between`}
         >
            {board && <h4 className="board-title">{board.title}</h4>}
            {!board && <p data-type="icon"><span data-type="icon">Create new board</span></p>}

            {board && <span className='details-container flex' >
                <span
                    className='star-container flex'
                    onClick={(ev) => onToggleStaredBoard(ev, board, isStarred, boardId)}
                >
                    {isStarred ? <FaStar /> : <FaRegStar />}
                </span>
            </span>
            }
        </span>
    </li>
}