export function BoardHeader() {

    return <section className="board-header flex justify-between">
        <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            multiline={false}
        >
            <h1 className="title">Sprint 4</h1>
        </div>
        <div className="actions-container">
            <button className="btn btn-filter">Filter</button>
            <span className="btn-divider"></span>
            <button className="btn btn-share">Share</button>
            <span className="btn-divider"></span>
            <button className="btn btn-menu">
                <span>...</span>
            </button>
        </div>
    </section>
}