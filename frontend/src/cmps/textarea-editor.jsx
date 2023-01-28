import { useState } from "react"
import { IoMdClose } from "react-icons/io"

export function TextareaEditor({ className, defaultText, onTextSubmit, onEditorCancel }) {

    const [text, setText] = useState(defaultText)
    function onTextChange(ev) {
        try {
        ev.stopPropagation()
        setText(ev.target.value)
        }
        catch(err) {
            console.error('Failed handle changes in text editor')
        }
    }


    return <div className={`textarea-editor-box ${className}`}>
        <textarea value={text} className={`textarea-editor ${className}`} onChange={onTextChange} onMouseDown={(ev) => ev.stopPropagation()} />
        <div className='text-editor-tools flex row'>
            <button className="save-btn textarea-editor-save" onMouseDown={(ev) => onTextSubmit(ev, text)} >Save</button>
            <IoMdClose className="cancel-editor" onMouseDown={onEditorCancel} />
        </div>
    </div>
}