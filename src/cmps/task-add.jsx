import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { boardService } from "../services/board.service";

import { saveBoard } from "../store/actions/board.actions";
import { IoCloseOutline } from "react-icons/io5";
import { HiMicrophone } from "react-icons/hi";

export function TaskAdd({ group, isAddCardOpen, setIsAddCardOpen }) {
    let board = useSelector(storeState => storeState.boardModule.board)
    useEffect(() => { textAreaRef.current.focus() }, [isAddCardOpen])
    const textAreaRef = useRef()
    const [taskToSet, setTaskTitleToSet] = useState(boardService.getEmptyTask())
    const { resetTranscript } = useSpeechRecognition()

    const handleChange = ev => {
        const { name, value } = ev.target
        setTaskTitleToSet({ ...taskToSet, [name]: value })
    }

    async function onAddNewTask(ev) {
        ev.preventDefault()
        if (!taskToSet.title) return
        try {
            group.tasks.push(taskToSet)
            setIsAddCardOpen(false)
            resetTranscript()
            board = { ...board, groups: [...board.groups] }
            await saveBoard(board)
            setTaskTitleToSet(boardService.getEmptyTask())
            SpeechRecognition.startListening()
            SpeechRecognition.stopListening()
        } catch (err) {
            console.error('Cannot add new task', err)
        }
    }

    function onblurForm() {
        setTimeout(() => {
            setIsAddCardOpen(false)
        }, 100)
    }

    const commands = [
        {
            command: '*',
            callback: (title) => { setTaskTitleToSet({ id: taskToSet.id, title }) }
        }
    ]

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })


    return <form onSubmit={onAddNewTask} onBlur={onblurForm}
        className={`add-card-form-container ${!isAddCardOpen && 'add-card-close'}`}>
        <div className="task-preview-container">

            <div className="textarea-container">
                <textarea
                    id={group.id}
                    ref={textAreaRef}
                    onChange={handleChange}
                    value={taskToSet.title}
                    name='title'
                    placeholder="Enter a title for this card..."
                    className="form-textarea "
                >

                </textarea>
            </div>
        </div>

        <div className="btn-controls-container">
            <button
                className="add-btn"
                type="submit"
                onClick={onAddNewTask}
            >
                Add card
            </button>
            <button
                className="btn-cancel"
                onClick={() => setIsAddCardOpen(false)}
                type="button"
            >
                <IoCloseOutline />
            </button>

            <HiMicrophone className="btn-cancel" onClick={SpeechRecognition.startListening} />
        </div>

    </form>
}