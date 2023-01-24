
import { TiStarOutline, TiStar } from 'react-icons/ti'

export function BoardPreview({ boardId, board, onBoardClick, onToggleStaredBoard, isStared }) {


    return <li
        className={`board-preview ${!board && 'mod-add'}`}
        onClick={(ev) => onBoardClick(ev, board?._id)}
        style={board && board.style}
    >
        <span className={`board-preview-fade ${!board ? 'add' : ''} ${board?.isStared ? 'light' : ''} flex column justify-between`}>
            {board && <h4 className="board-title">{board.title}</h4>}
            {!board && <p><span>Create new board</span></p>}

            {board && <span className='details-container flex' >
                <span
                    className='star-container flex'
                    onClick={(ev) => onToggleStaredBoard(ev, board, isStared)}
                >
                    {isStared ? <TiStar /> : <TiStarOutline />}
                </span>
            </span>
            }
        </span>
    </li>
}