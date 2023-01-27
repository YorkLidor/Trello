import { useState } from "react"


export function TextareaEditor({ className, defaultText, onTextSubmit }) {

    const [text, setText] = useState(defaultText)
    function onTextChange(ev) {
        setText(ev.target.value)
    }


    return <div className={`textarea-editor-box ${className}`}>
        <textarea value={text} className={`textarea-editor ${className}`} onChange={onTextChange} />
        <button className="save-btn textarea-editor-save" onClick={() => onTextSubmit(text)} >Save</button>
    </div>
}