import { useState, useRef } from 'react'

import { boardService } from "../../../services/board.service"

import { IoMdClose } from "react-icons/io"
import { BsFillCircleFill } from 'react-icons/bs'
import { PAGE_DELETE } from './label-picker'

export function LabelPickerEditor({ editorLabel, onSaveLabel, setModalPage }) {

    const [label, setLabel] = useState(editorLabel)

    const activeColorRef = useRef()
    const labelColors = ['#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1',
        '#8BBDD9', '#8FDFEB', '#B3F1D0', '#CEA7BF', '#505F79',
        '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#344563',
        '#026AA7', '#00AECC', '#4ED583', '#E568AF', '#091E42'
    ]
    const deleteButtonClass = ('delete-label delete-label-editor' + (label.id ? ' visible' : ''))

    function resetColor() {
        setLabel((prevEditorLabel) => ({ ...prevEditorLabel, color: boardService.getLabelDeaultColor() }))
    }

    function handleEditorChange({ target }, color = null) {
        if (color) {
            label.color = color
            target.parentNode.classList.toggle('active-color')
            if (activeColorRef.current) activeColorRef.current.parentNode.classList.toggle('active-color')
            activeColorRef.current = target
        }
        else label.title = target.value
        setLabel({ ...label })
    }

    return <>
        <div className='label-editor-preview-box'>

            <div className='label-editor-preview' style={{ backgroundColor: label.color + '55' }}>
                <BsFillCircleFill className='label-circle' style={{ color: label.color }} />
                <span className='label-title-editor-preview'>
                    {label.title}
                </span>
            </div>

        </div>

        <label className='label-title' htmlFor='label-title'>Title</label>
        <input className="label-editor-title" type='text' id="label-title" value={label.title? label.title : ''} onChange={handleEditorChange} />

        <label className='label-title' htmlFor='label-title'>Select a color</label>
        <div className='editor-colors'>
            {
                labelColors.map(color => {
                    return <div className='color-tab-wrapper' key={color} style={{ backgroundColor: label.color + '25' }}>
                        <div className='color-tab' style={{ backgroundColor: color }} onClick={(ev) => handleEditorChange(ev, color)}></div>
                    </div>
                })
            }
        </div>

        <button className='remove-color' onClick={resetColor}><IoMdClose className='remove-color-icon' /> Remove color</button>

        <hr />

        <section className='label-editor-tools flex row'>
            <button className='save-label' onClick={() => onSaveLabel(label)}>{label.id ? 'Save' : 'Create'}</button>
            <button className={deleteButtonClass} onClick={() => setModalPage(PAGE_DELETE)} >Delete</button>
        </section>
    </>
}