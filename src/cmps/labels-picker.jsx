
import { useState, useRef, useEffect } from 'react'
import { GrFormEdit } from 'react-icons/gr'
import { boardService } from '../services/board.service'

import { TiDeleteOutline } from 'react-icons/ti'
import { useSelector } from 'react-redux'

export function LabelsPicker({ cmpProps }) {
    const { groupId, task } = cmpProps

    const board = useSelector((storeState) => storeState.boardModule.board)
    const boardId = board._id

    const [taskLabelIds, setTaskLabels] = useState(task.labelIds ? task.labelIds : [])
    const labels = board.labels

    const [editorLabel, setEditorLabel] = useState(boardService.getEmptyLabel())
    const labelColors = ['#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1',
        '#8BBDD9', '#8FDFEB', '#B3F1D0', '#CEA7BF', '#505F79',
        '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#344563',
        '#026AA7', '#00AECC', '#4ED583', '#E568AF', '#091E42'
    ]

    const labelsScreenRef = useRef()
    const editorScreenRef = useRef()
    const deleteScreenRef = useRef()
    const activeColorRef = useRef()

    console.log(taskLabelIds)
    console.log(labels)

    const member = {
        id: 101,
        fullName: 'Gal Zohar',
        imgUrl: 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    }

    function handleChange({ target }) {
        const labelId = target.dataset.id
        let newLabelIds, action
        if (!target.checked) {
            newLabelIds = taskLabelIds.filter(labelIdToEdit => labelIdToEdit !== labelId)
            action = 'Removed label ' + labels.filter(label => label.id === labelId).title
            setTaskLabels(newLabelIds)
        } else {
            newLabelIds = [...taskLabelIds, labelId]
            action = 'Added label ' + labels.filter(label => label.id === labelId).title
            setTaskLabels(newLabelIds)
        }
        task.labelIds = newLabelIds
        saveTask(action)
    }

    function toggleScreens(label = null) {
        editorScreenRef.current.classList.toggle('active')
        labelsScreenRef.current.classList.toggle('active')

        if (label) setEditorLabel(label)
        else setEditorLabel(boardService.getEmptyLabel())
    }

    function toggleDeleteMessage(type) {
        if (type === 'delete') {
            editorScreenRef.current.classList.toggle('active')
            deleteScreenRef.current.classList.toggle('active')
        }
        else if (type === 'deleted') {
            labelsScreenRef.current.classList.toggle('active')
            deleteScreenRef.current.classList.toggle('active')
        }
    }

    function handleEditorChange({ target }, color = null) {
        if (color) {
            editorLabel.color = color
            console.log(editorLabel.color)
            target.parentNode.classList.toggle('active-color')
            if (activeColorRef.current) activeColorRef.current.parentNode.classList.toggle('active-color')
            activeColorRef.current = target
        }
        else editorLabel.title = target.value
        setEditorLabel({ ...editorLabel })
    }
    function resetColor() {
        setEditorLabel((prevEditorLabel) => ({ ...prevEditorLabel, color: boardService.getLabelDeaultColor() }))
    }

    async function saveLabel() {
        await boardService.saveBoardLabel(boardId, editorLabel)
        toggleScreens()
    }

    function saveTask(action) {
        boardService.getActivity(member, { id: task.id, title: task.title }, action)
        boardService.saveTask(boardId, groupId, task, {})
    }

    async function deleteLabel() {
        await boardService.removeBoardLabel(boardId, editorLabel.id)
        setEditorLabel(boardService.getEmptyLabel())
        toggleDeleteMessage('deleted')
    }


    return labels && <>
        <div className='labels-picker-header flex row'>
            <span className='picker-header'>Labels</span>
        </div>
        <div className="labels-picker-home active" ref={labelsScreenRef}>

            <ul className="labels-picker-list" >
                {
                    labels.map(label => {
                        const checked = (taskLabelIds.length) ? taskLabelIds.includes(label.id) : false
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
            <button className='create-label' onClick={() => toggleScreens()}>Create a new label</button>
        </div>

        <div className='labels-editor' ref={editorScreenRef}>
            <div className='label-editor-preview' style={{ backgroundColor: editorLabel.color }}>{editorLabel.title}</div>
            <input type='text' value={editorLabel.title} onChange={handleEditorChange} />
            <div className='editor-colors'>
                {
                    labelColors.map(color => {
                        return <div className='color-tab-wrapper' key={color}>
                            <div className='color-tab' style={{ backgroundColor: color }} onClick={(ev) => handleEditorChange(ev, color)}></div>
                        </div>
                    })
                }
            </div>

            <button className='remove-color' onClick={resetColor}><TiDeleteOutline style={{ fontSize: '18px', verticalAlign: 'top' }} /> Remove color</button>

            <hr />

            <section className='flex row' style={{ justifyContent: 'space-between' }}>
                <button className='save-label' onClick={saveLabel}>{editorLabel.id ? 'Save' : 'Create'}</button>
                <button className='delete-label' onClick={() => toggleDeleteMessage('delete')} style={{ visibility: editorLabel.id ? 'visible' : 'hidden' }}>Delete</button>

            </section>
        </div>
        <div className='delete-label-msg' ref={deleteScreenRef}>
            <p>
                This will remove this label from all cards.
                There is no undo.
            </p>
            <button className='delete-label' onClick={deleteLabel} style={{ width: '100%' }}>Delete</button>
        </div>
    </>
}