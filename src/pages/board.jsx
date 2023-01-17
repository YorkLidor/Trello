import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { TaskList } from "../cmps/task-list";

export function Board() {

    return <main>
        <BoardHeader />
        <GroupList />
    </main>
}