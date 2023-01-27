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
    const [taskToEdit, setTaskToEdit, handleChange] = useForm(boardService.getEmptyTask())
    const { resetTranscript } = useSpeechRecognition()
    const startListening = SpeechRecognition.startListening

    const commands = useRef([
        {
            command: '*',
            name: "fdsf",
            callback: console.log
        }
    ]
    )

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    useEffect(() => {
        console.log(group.id, transcript)
    }, [transcript])


    async function onAddNewTask(ev) {
        ev.preventDefault()
        if (!taskToEdit.title) return
        try {
            setIsAddCardOpen(false)
            resetTranscript()
            group.tasks.push(taskToEdit)
            board = { ...board, groups: [...board.groups] }
            await saveBoard(board)
            setTaskToEdit(boardService.getEmptyTask())
        } catch (err) {
            console.error('Cannot add new task', err)
        }
    }

    function onblurForm() {
        setTimeout(() => {
            setIsAddCardOpen(false)
        }, 100)
    }

    async function onStartListening() {
        const what = await SpeechRecognition.startListening()
        console.log('what:', what)
    }

    return <form onSubmit={onAddNewTask}
        className={`add-card-form-container ${!isAddCardOpen && 'add-card-close'}`}>
        <div className="task-preview-container">

            <div className="textarea-container">
                <textarea
                    ref={textAreaRef}
                    onChange={handleChange}
                    // value={transcript}
                    value={taskToEdit.title}
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

            <HiMicrophone className="btn-cancel" onClick={onStartListening} />
        </div>

    </form>
}