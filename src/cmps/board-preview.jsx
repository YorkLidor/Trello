import { FaRegStar } from 'react-icons/fa'

export function BoardPreview({ board, onBoardClick }) {

    return <li
        className={`board-preview ${!board && 'mod-add'}`}
        onClick={(ev) => onBoardClick(ev, board?._id)}
        style={board && board.style}
    >
        <span className={`board-preview-fade ${!board ? 'add' : ''} flex column justify-between`}>
            {board && <h4 className="board-title">{board.title}</h4>}
            {!board && <p><span>Create new board</span></p>}

            {board && <span className='details-container flex'>
                <span className='star-container flex'>
                    <FaRegStar />
                </span>
            </span>
            }
        </span>
    </li>
}