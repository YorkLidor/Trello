
import { func } from 'prop-types'
import { useState, useRef } from 'react'
import { GrFormEdit } from 'react-icons/gr'
import { boardService } from '../services/board.service'

export function LabelsPicker({ cmpProps }) {
    const { boardId, groupId, task, labels, labelIds } = cmpProps
    const [labelIdsToEdit, setLabelsIds] = useState(labelIds ? labelIds : [])

    const [editorLabel, setEditorLabel] = useState(boardService.getEmptyLabel())
    const labelColors = ['#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1'
    ]

    const labelsScreenRef = useRef()
    const editorScreenRef = useRef()
    const activeColorRef = useRef(null)

    const member = {
        id: 101,
        fullName: 'Gal Zohar',
        imgUrl: 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    }

    function handleChange({ target }) {
        const labelId = target.dataset.id
        let newLabelIds
        let action = ''
        if (!target.checked) {
            newLabelIds = labelIdsToEdit.filter(labelIdToEdit => labelIdToEdit !== labelId)
            action = 'Removed label ' + labels.filter(label => label.id === labelId).title
            setLabelsIds(newLabelIds)
        } else {
            newLabelIds = [...labelIdsToEdit, labelId]
            action = 'Added label ' + labels.filter(label => label.id === labelId).title
            setLabelsIds(newLabelIds)
        }
        task.labelIds = newLabelIds
        saveTask(action)
    }

    function toggleScreens(label = null) {
        editorScreenRef.current.classList.toggle('active')
        labelsScreenRef.current.classList.toggle('active')

        if (label) loadEditor(label)
    }

    function loadEditor(label) {
        setEditorLabel(label)
    }

    function handleEditorChange({ target }, color = null) {
        let action
        if (color) {
            editorLabel.color = color
            action = 'Edited label color ' + labels.filter(label => label.id === editorLabel.id).title

            target.parentNode.classList.toggle('active-color')
            if (activeColorRef.current) activeColorRef.current.parentNode.classList.toggle('active-color')
            activeColorRef.current = target
        }
        else {
            editorLabel.title = target.value
            action = 'Added label title' + labels.filter(label => label.id === editorLabel.id).title
        }
        setEditorLabel(editorLabel)
        task.labelIds = task.labelIds.map(label => label.id === editorLabel.id ? editorLabel : label)
        saveTask(action)

    }


    function saveTask(action) {
        boardService.getActivity(member, { id: task.id, title: task.title }, action)
        boardService.saveTask(boardId, groupId, task, {})
    }

    return labels && <>
        <div className='labels-picker-header flex row'>
            <span className='picker-header'>Labels</span>
        </div>

        <ul className="labels-picker-list active" ref={labelsScreenRef}>
            {
                labels.map(label => {
                    const checked = (labelIdsToEdit.length) ? labelIdsToEdit.includes(label.id) : false
                    const labelStyle = {
                        backgroundColor: label.color
                    }

                    return <li key={label.id} className='label-picker-line flex row'>
                        <input type='checkbox' name='add-label' checked={checked} onChange={handleChange} data-id={label.id} />
                        <div className="label-box-preview" style={labelStyle}>{label.title}</div>
                        <GrFormEdit className="edit-label-button" onClick={() => toggleScreens(label)} />
                    </li>
                })
            }
        </ul>
        <div className='labels-editor' ref={editorScreenRef}>
            <div className='label-editor-preview'>{editorLabel.title}</div>
            <input type='text' value={editorLabel.title} onChange={handleEditorChange} />
            <div className='editor-colors'>
                {
                    labelColors.map(color => {
                        return <div className='color-tab-wrapper'  key={color}>
                            <div className='color-tab' style={{ backgroundColor: color }} onClick={(ev) => handleEditorChange(ev, color)}></div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
}