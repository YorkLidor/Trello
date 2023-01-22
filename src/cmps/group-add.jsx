import { useRef } from "react"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"


export function GroupAdd({ onAddGroup, handleChange, groupToEdit }) {
    const [isIdleClass, setIsIdle] = useState('is-idle')
    const isLoading = useRef(false)

    async function onSubmitForm(ev) {
        ev.preventDefault()
        if (isLoading.current) return
        isLoading.current = true
        try {
            await onAddGroup(ev)
            setIsIdle('is-idle')
        } catch (err) {
            console.error('somthing went wrong:', err.message)
        } finally {
            isLoading.current = false
        }
    }

    return <li className={`group-item-container mod-add ${isIdleClass}`}>
        <div className={`group-item mod-add ${isIdleClass}`}>
            <span
                className="open-add-group flex justify-center"
                onClick={() => setIsIdle('')}
            >
                <IoMdAdd />
                Add another list
            </span>

            <form
                className="add-list-form"
                onSubmit={onSubmitForm}
            >
                <input
                    className="list-title-input"
                    type="text"
                    name="title"
                    value={groupToEdit.title}
                    placeholder="Enter list title..."
                    autoComplete="off"
                    onChange={handleChange}
                />
                <div className="btn-controls-container">
                    <button
                        className="btn-add"
                        type="submit"
                    >
                        Add list
                    </button>
                    <button
                        className="btn-cancel"
                        onClick={() => setIsIdle('is-idle')}
                        type="button"
                    >
                        X
                    </button>
                </div>
            </form>

        </div>
    </li>
}