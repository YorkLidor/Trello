import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { boardService } from "../services/board.service";

import { saveBoard } from "../store/actions/board.actions";
import { IoCloseOutline } from "react-icons/io5";

export function TaskAdd({ group, isAddCardOpen, setIsAddCardOpen }) {
    let board = useSelector(storeState => storeState.boardModule.board)
    useEffect(() => { textAreaRef.current.focus() }, [isAddCardOpen])
    const textAreaRef = useRef()
    const [taskToSet, setTaskTitleToSet, handleChange] = useForm(boardService.getEmptyTask())
    const { transcript, resetTranscript,finalTranscript } = useSpeechRecognition()



    async function onAddNewTask(ev) {
        ev.preventDefault()
        if (!taskToSet.title) return
        try {
            group.tasks.push(taskToSet)
            board = { ...board, groups: [...board.groups] }
            await saveBoard(board)
            setTaskTitleToSet(boardService.getEmptyTask())
            setIsAddCardOpen(false)
        } catch (err) {
            console.error('Cannot add new task', err)
        }
    }

    function Dictaphone(){
        SpeechRecognition.startListening()
        setTaskTitleToSet(...taskToSet, {title: finalTranscript})
        console.log('finalTranscript:', finalTranscript)
        console.log('taskToSet:', taskToSet)
        console.log('transcript:', transcript)
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            return <p>Sorry, your browser does not support speech recognition.</p>
        }
    }

    function onblurForm() {
        setTimeout(() => {
            setIsAddCardOpen(false)
        }, 100)
    }

    return <form onSubmit={onAddNewTask} onBlur={onblurForm}
        className={`add-card-form-container ${!isAddCardOpen && 'add-card-close'}`}>
        <div className="task-preview-container">

            <div className="textarea-container">
                <textarea
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

            {/* <button onClick={Dictaphone}>Start</button> */}
        </div>

    </form>
}