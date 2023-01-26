import { ChecklistPreview } from './checklist-preview'
import { TbCheckbox } from 'react-icons/tb'
import { useRef } from 'react'

export function Checklist({ task, checklist, onSaveChecklist }) {
    const elInputRef = useRef()

    function handleEdit({ target }, state) {
        target.dataset.state = state
        if (!target.value.length) return
        elInputRef.current.classList.toggle('active')
        onSaveTitle()
    }

    function onSaveTitle() {
        console.log(elInputRef.current.value)
        const value = elInputRef.current.value

        elInputRef.current.classList.toggle('active')

        checklist.title = value
        onUpdateChecklist(checklist)

    }

    function onUpdateChecklist() {
        console.log(task, checklist);
        task.checklists = task.checklists.map(list => (list.id !== checklist.id)? list : checklist)
        onSaveChecklist(checklist)
    }


    return <section className="checklist-box">
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container ">
                <input ref={elInputRef} data-state={false} className="checklist-title" defaultValue={checklist.title} onFocus={(ev) => handleEdit(ev, true)} onBlur={(ev) => !ev.target.dataset.state ? '' : handleEdit(ev, false)} />
            </div>
        </div>
        <ChecklistPreview checklist={checklist} onUpdateChecklist={onUpdateChecklist} />
    </section >
}