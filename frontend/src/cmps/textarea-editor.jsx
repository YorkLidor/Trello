import { useState } from "react"
import { IoMdClose } from "react-icons/io"

export function TextareaEditor({ className, defaultText, onTextSubmit, onEditorCancel }) {

    const [text, setText] = useState(defaultText)
    function onTextChange(ev) {
        ev.stopPropagation()
        setText(ev.target.value)
    }


    return <div className={`textarea-editor-box ${className}`}>
        <textarea value={text} className={`textarea-editor ${className}`} onChange={onTextChange} onMouseDown={(ev) => ev.stopPropagation()} />
        <div className='flex row'>
            <button className="save-btn textarea-editor-save" onMouseDown={(ev) => onTextSubmit(ev, text)} >Save</button>
            <IoMdClose className="cancel-editor" onMouseDown={onEditorCancel} />
        </div>
    </div>
}