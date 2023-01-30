import { useSelector } from "react-redux"
import { ModalHeader } from "./modal-header"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useEffectInit } from "../../customHooks/useEffectInit"

import { loadBoards, saveBoard } from "../../store/actions/board.actions"
import { boardService } from "../../services/board.service"
import { closeModal } from "../../store/actions/app.actions"
import { modalService } from "../../services/modal.service"
import { utilService } from "../../services/util.service"


export function ModalTaskMove({ task, groupId, id, modals, isCopy }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const currBoard = useSelector((storeState) => storeState.boardModule.board)

    const [selectedBoardId, setSelectedBoardId] = useState(currBoard._id)
    const [selectedGroupId, setSelectedGroupId] = useState(groupId)

    const [selectedBoard, setSelectedBoard] = useState(currBoard)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedPos, setSelectedPos] = useState(null)

    const boardRef = useRef()
    const groupRef = useRef()
    const posRef = useRef()

    const navigate = useNavigate()

    let posIndexCounter = 0

    useEffectInit(async () => {
        if (!boards.length) await loadBoards()
    }, [])

    // when selectedBoardId changed
    useEffect(() => {
        async function getBoard() {
            setSelectedBoard(await boardService.getById(selectedBoardId))
        }
        if (!selectedBoard || selectedBoard._id !== selectedBoardId) getBoard()
    }, [selectedBoardId])

    // selectedBoard is changed
    useEffect(() => {
        if (selectedBoard.groups?.length > 0) setSelectedGroupId(selectedBoard.groups[0].id)
        else {
            setSelectedGroup(null)
            setSelectedGroupId(null)
        }
    }, [selectedBoard])

    useEffect(() => {
        if (selectedGroupId !== null) setSelectedGroup(selectedBoard.groups.find(group => group.id === selectedGroupId))
    }, [selectedGroupId])

    // When selectedGroup changed
    useEffect(() => {
        if (selectedGroup && groupId === selectedGroupId) {
            const idx = selectedGroup.tasks?.findIndex(t => t.id === task.id)
            setSelectedPos(idx + 1)
        } else setSelectedPos(selectedGroup?.tasks?.length)
    }, [selectedGroup])

    async function onMoveTask() {
        if (!selectedBoard || !selectedGroup || !selectedPos) return

        const currGroup = currBoard.groups.find(group => group.id === groupId)

        let newTask = task
        if (isCopy) newTask = { ...task, id: 'ta-' + utilService.makeId(8) }
        selectedGroup.tasks.splice(selectedPos, 0, newTask)
        await saveBoard(selectedBoard)

        if (!isCopy) {
            currGroup.tasks = currGroup.tasks.filter(t => t.id !== task.id)
            currBoard.groups = currBoard.groups.map(group => group.id === groupId ? currGroup : group)
            await saveBoard(currBoard)
        }

        closeModal(modals, id)
        modalService.removeModal(modals, id)
        navigate(`/${selectedBoard._id}`)

    }

    return <div className="modal-task-action-box">
        <ModalHeader header={isCopy ? 'Copy card' : 'Move card'} id={id} />
        <div className="modal-actions-mainbox flex column">
            <span className="modal-label">Select destination</span>
            {
                selectedBoard &&
                <label className="board-select-box">

                    <span className="modal-label select-label">Board</span>
                    <span className="board-label">{selectedBoard.title}</span>
                    <select className="board-select" ref={boardRef} onChange={(ev) => setSelectedBoardId(ev.target.value)} defaultValue={selectedBoardId}>
                        {
                            boards.map(board => {
                                if (currBoard._id === board._id)
                                    return <option key={board._id} className="selected" value={board._id} >{board.title} (Current)</option>
                                else
                                    return <option key={board._id} value={board._id} >{board.title}</option>
                            })
                        }
                    </select>
                </label>
            }
            <div className="group-pos-select flex row">

                {selectedGroup &&
                    <label className="group-select-box">

                        <span className="modal-label select-label">List</span>
                        <span className="group-label">{selectedGroup.title}</span>
                        <select className="group-select" ref={groupRef} onChange={(ev) => setSelectedGroupId(ev.target.value)} defaultValue={selectedGroupId}>
                            {
                                selectedBoard.groups.map(group => {
                                    if (selectedGroup === group.id)
                                        return <option key={group.id} className="selected" value={group.id} >{group.title} (Current)</option>
                                    else
                                        return <option key={group.id} value={group.id} >{group.title}</option>
                                })
                            }

                        </select>
                    </label>
                }

                {selectedPos >= 0 &&
                    <label className="pos-select-box">
                        <span className="modal-label select-label">Position</span>
                        <span className="pos-label">{+selectedPos + 1}</span>
                        <select className="pos-select" ref={posRef} onChange={(ev) => setSelectedPos(ev.target.value)} defaultValue={selectedGroupId}>
                            {
                                selectedGroup?.tasks?.map(() => <option key={++posIndexCounter} value={posIndexCounter}>{(posIndexCounter) + 1}</option>)
                            }
                            <option key={++posIndexCounter} value={posIndexCounter}>{(posIndexCounter) + 1}</option>

                        </select>
                    </label>

                }
            </div>
            <button className="save-btn task-copy-move-btn" onClick={onMoveTask}>{isCopy ? 'Copy' : 'Move'}</button>
        </div>
    </div>
}