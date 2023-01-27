import { useState } from 'react'

import { saveTask, getActivityText, ADD_LABEL, REMOVE_LABEL } from '../../../store/actions/board.actions'

import { boardService } from '../../../services/board.service'

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"
import { BsFillCircleFill } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'

export function LabelPickerList({ member, boardId, task, groupId, labels, onEditLabel }) {

    const [taskLabelIds, setTaskLabels] = useState(task.labelIds ? task.labelIds : [])

    function handleChange({ target }) {
        const labelId = target.dataset.id
        let newLabelIds, action

        if (!target.checked) {
            action = `${getActivityText(REMOVE_LABEL)}`
            newLabelIds = taskLabelIds.filter(labelIdToEdit => labelIdToEdit !== labelId)
            setTaskLabels(newLabelIds)
        } else {
            action = `${getActivityText(ADD_LABEL)}`
            newLabelIds = [...taskLabelIds, labelId]
            setTaskLabels(newLabelIds)
        }

        task.labelIds = newLabelIds
        const activity = boardService.getActivity(member, { id: task.id, title: task.title }, action)
        saveTask(groupId, task, activity)
    }

    return labels.length > 0 && <>
        <span className="modal-label">Labels</span>
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
                                <div className='edit-btn-box' onClick={() => onEditLabel(label)}>
                                    
                                    <BiPencil
                                        className="edit-label-button"
                                    />
                                </div>
                            </div>
                        </label>
                    </li>
                })
            }
        </ul>
        <button className='create-label' onClick={() => onEditLabel()}>Create a new label</button>
    </>
}