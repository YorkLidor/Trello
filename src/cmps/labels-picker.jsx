
import { useState, useRef, useEffect } from 'react'
import { GrFormEdit } from 'react-icons/gr'

import { boardService } from '../services/board.service'

import { AiOutlineClose } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'


import { useSelector } from 'react-redux'
import { store } from '../store/store'
import { CLOSE_MODAL } from '../store/app.reducer'


export function LabelsPicker({ cmpProps }) {
    const { groupId, task } = cmpProps

    const board = useSelector((storeState) => storeState.boardModule.board)
    const boardId = board._id

    const labelsScreenRef = useRef()
    const editorScreenRef = useRef()
    const deleteScreenRef = useRef()
    const activeColorRef = useRef()

    const [taskLabelIds, setTaskLabels] = useState(task.labelIds ? task.labelIds : [])
    const [editorLabel, setEditorLabel] = useState(boardService.getEmptyLabel())
    const [pickerHeader, setPickerHeader] = useState(getPickerHeader())


    const labels = board.labels
    const labelColors = ['#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1',
        '#8BBDD9', '#8FDFEB', '#B3F1D0', '#CEA7BF', '#505F79',
        '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#344563',
        '#026AA7', '#00AECC', '#4ED583', '#E568AF', '#091E42'
    ]


    useEffect(() => {
        setPickerHeader(getPickerHeader())
    }, [editorLabel])

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

    function getPickerHeader() {
        if (editorScreenRef?.current?.classList.contains('active')) return editorLabel.id ? 'Edit label' : 'Create label'
        if (labelsScreenRef?.current?.classList.contains('active')) return 'Labels'
        if (deleteScreenRef?.current?.classList.contains('active')) return 'Delete label'
        return 'Labels'
    }

    function modalGoBack() {
        if (pickerHeader === 'Edit label' || pickerHeader === 'Create label') toggleScreens()
        if (pickerHeader === 'Delete label') toggleDeleteMessage('delete')
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
        setPickerHeader(getPickerHeader())
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
        await boardService.saveBoardLabel(board, editorLabel)
        toggleScreens()
    }

    function saveTask(action) {
        const activity =  boardService.getActivity(member, { id: task.id, title: task.title }, action)
        boardService.saveTask(boardId, groupId, task, activity)
    }

    async function deleteLabel() {
        await boardService.removeBoardLabel(board, editorLabel.id)
        setEditorLabel(boardService.getEmptyLabel())
        toggleDeleteMessage('deleted')
    }


    return labels && <div className='modal-label-picker'>
        <div className='picker-header-container flex row'>
            {
                getPickerHeader() !== 'Labels' ? <IoIosArrowBack className='back-modal' onClick={modalGoBack} /> : <span />
            }
            <span className='picker-header'>{pickerHeader}</span>
            <AiOutlineClose className='close-modal' onClick={() => store.dispatch({ type: CLOSE_MODAL })} />
        </div>

        <div className="labels-picker-home active" ref={labelsScreenRef}>

            <ul className="labels-picker-list" >
                {
                    labels.map(label => {
                        const checked = (taskLabelIds.length) ? taskLabelIds.includes(label.id) : false
                        const labelStyle = {
                            backgroundColor: label.color + '55'
                        }

                        return <li key={label.id} className='label-picker-line row'>
                            <label htmlFor={`add-label-${label.id}`} className='flex row label-line-container'>
                                <input type='checkbox' name='add-label' id={`add-label-${label.id}`} checked={checked} onChange={handleChange} data-id={label.id} />
                                <span className='checkbox-container'>
                                    {
                                        checked ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />

                                    }
                                </span>
                                <div className='flex row label-picker-row'>
                                    <div
                                        className="label-box-preview"
                                        style={labelStyle}

                                    >
                                        <BsFillCircleFill
                                            style={{ color: label.color }}
                                        />
                                        {label.title}
                                    </div>
                                    <GrFormEdit
                                        className="edit-label-button"
                                        onClick={() => toggleScreens(label)}
                                    />
                                </div>
                            </label>
                        </li>
                    })
                }
            </ul>
            <button className='create-label' onClick={() => toggleScreens()}>Create a new label</button>
        </div>

        <div className='labels-editor' ref={editorScreenRef}>
            <div className='label-editor-preview-box'>
                <div className='label-editor-preview' style={{ backgroundColor: editorLabel.color + '55' }}>
                    <BsFillCircleFill className='label-circle' style={{ color: editorLabel.color }} />
                    <span className='label-title-editor-preview'>
                        {editorLabel.title}
                    </span>
                </div>

            </div>

            <label className='label-title' htmlFor='label-title'>Title</label>
            <input className="label-editor-title" type='text' id="label-title" value={editorLabel.title} onChange={handleEditorChange} />

            <label className='label-title' htmlFor='label-title'>Select a color</label>
            <div className='editor-colors'>
                {
                    labelColors.map(color => {
                        return <div className='color-tab-wrapper' key={color}>
                            <div className='color-tab' style={{ backgroundColor: color }} onClick={(ev) => handleEditorChange(ev, color)}></div>
                        </div>
                    })
                }
            </div>

            <button className='remove-color' onClick={resetColor}><AiOutlineClose className='remove-color-icon' /> Remove color</button>

            <hr />

            <section className='label-editor-tools flex row'>
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
    </div>
}