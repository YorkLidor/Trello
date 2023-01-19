
import { useState } from 'react'
import { GrFormEdit } from 'react-icons/gr'
import { boardService } from '../services/board.service'

export function LabelsPicker({ cmpProps }) {
    const { boardId, groupId, task, labels, labelIds } = cmpProps
    const [labelIdsToEdit, setLabelsIds] = useState(labelIds ? labelIds : [])

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

        // temporary until user service will be up

        task.labelIds = newLabelIds
        boardService.getActivity(member, { id: task.id, title: task.title }, action)
        boardService.saveTask(boardId, groupId, task, {})
    }

    return labels && <>
        <span className='picker-header'>Labels</span>
        <ul className="labels-picker-list" onClick={(ev) => ev.stopPropagation()}>
            {
                labels.map(label => {
                    const checked = (labelIdsToEdit.length) ? labelIdsToEdit.includes(label.id) : false
                    const labelStyle = {
                        backgroundColor: label.color
                    }

                    return <li key={label.id} className='label-picker-line flex row'>
                        <input type='checkbox' name='add-label' checked={checked} onChange={handleChange} data-id={label.id} />
                        <div className="label-box-preview" style={labelStyle}>{label.title}</div>
                        <GrFormEdit className="edit-label-button" onClick={() => console.log('editing...', label.title)} />
                    </li>
                })
            }
        </ul>
    </>
}