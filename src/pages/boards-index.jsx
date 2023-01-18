export function BoardsIndex() {

    return <main className="boards-index flex column">
        <header className="main-header">
            <h3>Recently viewed</h3>
        </header>
        <section className="recently-boards-container">
            <ul className="boards-preview-list clean-list">
                <li className="board-preview">
                    <h4 className="board-title">Sprint 4</h4>
                </li>
                <li className="board-preview">
                    <h4 className="board-title">Demo Data</h4>
                </li>
            </ul>
        </section>
    </main>
}