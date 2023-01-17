import { BoardHeader } from "../cmps/board-header";
import { TaskList } from "../cmps/task-list";

export function Board() {

    return <main>
        <BoardHeader />
        <TaskList />
    </main>
}