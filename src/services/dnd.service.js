import { utilService } from "./util.service"

export const dndService = {
    swapItemBetweenLists
}

function swapItemBetweenLists(souorceList, destinationList, sourceIdx, destinationIdx) {
    const deletedItem = souorceList.tasks.splice(sourceIdx, 1)
    destinationList.tasks.push(...deletedItem)
    return utilService.reorder(destinationList.tasks, destinationList.tasks.length - 1, destinationIdx)
}