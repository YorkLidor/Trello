import { boardService } from "../services/board.service"


export async function removeGroup(groupId) {
    try {
        await boardService.remove(groupId)
        // store.dispatch(getActionRemoveGroup(groupId))
    } catch (err) {
        console.log('Cannot remove car', err)
        throw err
    }
}