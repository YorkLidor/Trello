import { GrFormEdit } from 'react-icons/gr'

export function LabelsPicker({ labels, labelIds }) {
    return <>
        <h2>Labels</h2>
        <ul className="labels">
            {
                labels.map(label => {
                    const checked = labelIds.includes(label.id)
                    return <li key={label.id}>
                        <input type='checkbox' checked={checked}/>
                        <div className="label-box">{label.title}</div>
                        <GrFormEdit className="edit-label-button" onClick={() => console.log('editing...', label.title)} />
                    </li>
                })
            }
        </ul>
    </>
}