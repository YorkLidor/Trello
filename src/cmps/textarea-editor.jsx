import { useState } from "react"


export function TextareaEditor({ defaultText, onTextSubmit }) {

    const [text, setText] = useState(defaultText)
    function onTextChange(ev) {
        setText(ev.target.value)
    }


    return <div className="textarea-editor-box">
        <textarea value={text} className="textarea-editor" onChange={onTextChange} />
        <button className="save-btn textarea-editor-save" onClick={(ev) => onTextSubmit(text)} >Save</button>
    </div>
}