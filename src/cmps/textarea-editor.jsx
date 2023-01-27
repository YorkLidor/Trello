import { useState } from "react"
import { IoMdClose } from "react-icons/io"

export function TextareaEditor({ className, defaultText, onTextSubmit, onEditorCancel }) {

    const [text, setText] = useState(defaultText)
    function onTextChange(ev) {
        setText(ev.target.value)
    }


    return <div className={`textarea-editor-box ${className}`}>
        <textarea value={text} className={`textarea-editor ${className}`} onChange={onTextChange} onClick={(ev) => ev.stopPropagation()} />
        <div className='flex row'>
            <button className="save-btn textarea-editor-save" onClick={(ev) => onTextSubmit(ev, text)} >Save</button>
            <IoMdClose className="cancel-editor" onClick={onEditorCancel} />
        </div>
    </div>
}