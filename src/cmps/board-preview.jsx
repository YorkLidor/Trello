export function BoardPreview({ board, onBoardClick }) {

    return <li
        className="board-preview"
        onClick={() => onBoardClick(board?._id)}
        style={board && { backgroundImage: `url(${board.style.bg})` }}
    >
        <span className="board-preview-fade">
            {board && <h4 className="board-title">{board.title}</h4>}
            {!board && <p><span>Create Board</span></p>}
        </span>
    </li>
}