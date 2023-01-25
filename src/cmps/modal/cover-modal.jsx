import { ModalHeader } from "./modal-header";
import { uploadImg } from "../../services/upload-img.service";
import { useRef } from "react";
import { saveTask } from "../../store/actions/board.actions";
import { boardService } from "../../services/board.service";
import { useState } from "react";
import { useEffect } from "react";
import { useEffectInit } from "../../customHooks/useEffectInit";

export function CoverModal({ id, cmpProps }) {
    const { user, boardId, groupId, task } = cmpProps
    const [activeCover, setActiveCover] = useState(null)
    const activeColorRef = useRef()
    const fontColor = {light: '#fcfcfc', dark: '#293a57'}
    let colorIdx = 0

    useEffect(() => {
        if (activeCover) return
        const activeCoverSet = {}
        if (task.cover?.style?.backgroundColor) activeCoverSet.style = { backgroundColor: task.cover?.style?.backgroundColor }
        else if (task.cover?.style?.backgroundImage) activeCoverSet.style = { backgroundImage: task.cover?.style?.backgroundImage }

        if (task.cover?.fullSize) activeCoverSet.fullSize = true
        else activeCoverSet.fullSize = false

        setActiveCover(activeCoverSet)
    }, [])



    const coverColors = [
        '#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
        '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d'
    ]

    async function onUploadCover(ev) {
        const { url, filename } = await uploadImg(ev)

        if (task.attachments?.length > 0) task.attachments.unshift(boardService.getAttachment(url, filename))
        else task.attachments = [boardService.getAttachment(url, filename)]

        onSetAttachmentCover(url)
    }

    function handleColorPick({ target }) {
        target.parentNode.classList.toggle('active-color')
        if (activeColorRef.current) activeColorRef.current.parentNode.classList.toggle('active-color')

        if (activeColorRef.current === target) {
            activeColorRef.current = null
            removeCover()
        }
        else {
            activeColorRef.current = target
            saveCoverColor(target.dataset.idx)
        }
    }

    async function removeCover() {
        task.cover = null
        setActiveCover(null)
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} removed task ${task.title} cover`))
    }

    async function saveCoverColor(colorIdx) {

        if (!task.cover) task.cover = { fullSize: false, style: null }
        task.cover = { fullSize: task.cover?.fullSize? true : false, style: boardService.getCoverColorStyle(coverColors[colorIdx]) }
        const newCover = { fullSize: activeCover.fullSize, style: boardService.getCoverColorStyle(coverColors[colorIdx]) }

        setActiveCover(newCover)
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} changed task ${task.title} cover color to ${coverColors[colorIdx]}`))
    }

    async function onPickCoverSize(size) {
        if (!task.cover || task.cover.fullSize === size) return
        task.cover.fullSize = size
        setActiveCover((prevCover) => ({ ...prevCover, fullSize: size }))
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} changed task ${task.title} cover color to ${coverColors[colorIdx]}`))
    }

    async function onSetAttachmentCover(url) {
        const filename = url.substring(url.lastIndexOf('/') + 1)
        const action = `Added attachment ${filename} as cover to task ${task.title}`
        const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)

        task.cover = { style: boardService.getCoverAttachStyle(url), fullSize: task.cover?.fullSize ? task.cover.fullSize : false }
        await saveTask(boardId, groupId, task, activity)
    }


    async function onPickTextColor(light) {
        const color = (light) ? fontColor.light : fontColor.dark
        task.cover.style = { ...task.cover.style, color }
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} changed task ${task.title} cover font color to ${color}`))
    }

    return task && <div className="modal-cover-box">
        <ModalHeader id={id} header={'Cover'} allowBack={false} />
        <span className="modal-label">Size</span>

        <div className="size-select flex row">

            <div className="btn-small-cover" onClick={() => onPickCoverSize(false)}>
                <div className="small-cover" style={activeCover?.style}>

                </div>
            </div>

            <div className="btn-full-cover" style={activeCover?.style} onClick={() => onPickCoverSize(true)}>
            </div>
            {task.cover && <button className="btn-remove-cover" onClick={removeCover}>Remove Cover</button>}
        </div>


        {
            (!!task.cover?.fullSize &&
            <div className="choose-text-color-box">
                <div className="color-text-light" onClick={() => onPickTextColor(true)} style={{color: fontColor.light, backgroundColor: fontColor.dark}}>Color Text Light</div>
                <div className="color-text-dark" onClick={() => onPickTextColor(false)} style={{color: fontColor.dark, backgroundColor: fontColor.light}}>Color Text Dark</div>
            </div>)
        }

        <span className="modal-label">Colors</span>
        <div className="colors-tab">
            {
                coverColors.map(color => {
                    colorIdx++
                    return <div className="color-tab-wrapper">
                        <div className="color-tab" style={{ backgroundColor: color }} data-idx={colorIdx - 1} onClick={handleColorPick}>
                        </div></div>
                })
            }
        </div>

        <span className="modal-label">Attachments</span>
        <div className="cover-task-attachments flex row">
            {
                task.attachments?.map(attachment => <div key={attachment.filename} className="attachment-cover-picker" style={boardService.getCoverAttachStyle(attachment.url)} onClick={() => onSetAttachmentCover(attachment.url)} />)
            }
        </div>

        <label className="upload-cover" htmlFor="uploadAttach">Upload a cover image
            <input type='file' id='uploadAttach' name='uploadAttach' onChange={onUploadCover} />
        </label>
    </div>

}