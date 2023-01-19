import { useState } from "react"


export function GroupAdd() {
    const [isIdleClass, setIsIdle] = useState('is-idle')

    return <li className={`group-item-container mod-add ${isIdleClass}`}>
        <div className="group-item">
            <span
                className="open-add-group"
                onClick={() => setIsIdle('')}
            >
                Add another list
            </span>
            <form
                className="add-list-form"
                action="">
                <input
                    className="list-title-input"
                    type="text"
                    name="title"
                    placeholder="Enter list title..."
                    autoComplete="off"
                />
                <div className="btn-controls-container">
                    <button
                        className="btn-add"
                    >
                        Add list
                    </button>
                    <button
                        className="btn-cancel"
                        onClick={() => setIsIdle('is-idle')}
                    >
                        X
                    </button>
                </div>
            </form>
        </div>
    </li>
}