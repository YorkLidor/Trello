import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";

export function Board() {

    return <main className="board flex column">
        <BoardHeader />
        <GroupList />
    </main>
}