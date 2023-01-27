import { ModalHeader } from "./modal-header";
import { uploadImg } from "../../services/upload-img.service";
import { useState, useEffect, useRef } from "react";

import { boardService } from "../../services/board.service";
import { saveTask, CHANGE_COVER_ATTACH, CHANGE_COVER_COLOR, REMOVE_COVER, getActivityText, CHANGE_COVER_SIZE, CHANGE_COVER_TEXT_COLOR } from "../../store/actions/board.actions";

export function CoverModal({ id, cmpProps }) {
    const { user, boardId, groupId, task } = cmpProps
    const [activeCover, setActiveCover] = useState(null)
    const activeAttachRef = useRef()
    const activeColorRef = useRef()
    const activeSizeRef = useRef()
    const activeFontColorRef = useRef()

    const fontColor = { light: '#fcfcfc', dark: '#293a57' }
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

        const attachment = boardService.getAttachment(url, filename)
        if (task.attachments?.length > 0) task.attachments.unshift(attachment)
        else task.attachments = [attachment]

        onSetAttachmentCover(attachment)
    }

    function handleColorPick({ target }) {
        if (activeAttachRef.current) {
            activeAttachRef.current.parentNode.classList.toggle('active')
            activeAttachRef.current = null
        }

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
        clearActiveButtons()

        task.cover = null
        setActiveCover(null)
        const action = `${getActivityText(REMOVE_COVER)} ${task.title}`
        await saveTask(groupId, task, boardService.getActivity(user, task, action))
    }


    function clearActiveButtons() {
        if (activeAttachRef.current) {
            activeAttachRef.current.parentNode.classList.toggle('active')
            activeAttachRef.current = null
        }

        if (activeColorRef.current) {
            activeColorRef.current.parentNode.classList.toggle('active-color')
            activeColorRef.current = null
        }

        if (activeSizeRef.current) {
            activeSizeRef.current.parentNode.classList.toggle('active')
            activeSizeRef.current = null
        }

        if (activeFontColorRef.current) {
            activeFontColorRef.current.parentNode.classList.toggle('active')
            activeFontColorRef.current = null
        }
    }

    async function saveCoverColor(colorIdx) {

        if (!task.cover) task.cover = { fullSize: false, style: null }
        task.cover = { fullSize: task.cover?.fullSize ? true : false, style: boardService.getCoverColorStyle(coverColors[colorIdx]) }
        const newCover = { fullSize: task.cover.fullSize, style: boardService.getCoverColorStyle(coverColors[colorIdx]) }

        setActiveCover(newCover)
        await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(CHANGE_COVER_COLOR)}`))
    }

    async function onPickCoverSize(ev, size) {
        if (!task.cover || task.cover.fullSize === size) return
        if (activeSizeRef.current) activeSizeRef.current.parentNode.classList.toggle('active')
        if (ev.target.classList.contains('small-cover')) ev.target = ev.target.parentNode
        ev.target.parentNode.classList.toggle('active')
        activeSizeRef.current = ev.target


        task.cover = { ...task.cover, fullSize: size }
        setActiveCover((prevCover) => ({ ...prevCover, fullSize: size }))
        await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(CHANGE_COVER_SIZE)} ${task.title}`))
    }

    function onPickAttachCover(ev, attachment) {
        if (activeAttachRef.current) activeAttachRef.current.parentNode.classList.toggle('active')
        if (activeColorRef.current) {
            activeColorRef.current.parentNode.classList.toggle('active-color')
            activeColorRef.current = null
        }

        activeAttachRef.current = ev.target
        activeAttachRef.current.parentNode.classList.toggle('active')

        onSetAttachmentCover(attachment)
    }

    async function onSetAttachmentCover(attachment) {
        const url = attachment.url
        const filename = url.substring(url.lastIndexOf('/') + 1)
        const action = `${getActivityText(CHANGE_COVER_ATTACH)} ${filename}`
        const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)

        const newTask = boardService.setCoverImage(task, attachment)
        setActiveCover(newTask.cover)
        await saveTask(groupId, newTask, activity)
    }


    async function onPickTextColor(ev, light) {
        if (activeFontColorRef.current) activeFontColorRef.current.parentNode.classList.toggle('active')
        ev.target.parentNode.classList.toggle('active')
        activeFontColorRef.current = ev.target

        const color = (light) ? fontColor.light : fontColor.dark
        task.cover.style = { ...task.cover.style, color }
        await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(CHANGE_COVER_TEXT_COLOR)} ${color}`))
    }

    return task && <div className="modal-cover-box">
        <ModalHeader id={id} header={'Cover'} allowBack={false} />
        <span className="modal-label">Size</span>

        <div className="size-select flex row">

            <div className="button-wrapper">
                <div className="btn-small-cover" onClick={(ev) => onPickCoverSize(ev, false)}>
                    <div className="small-cover" style={activeCover?.style} onClick={(ev) => onPickCoverSize(ev, false)}></div>
                </div>
            </div>

            <div className="button-wrapper">
                <div className="btn-full-cover" style={activeCover?.style} onClick={(ev) => onPickCoverSize(ev, true)}> </div>
            </div>
            {task.cover && <button className="btn-remove-cover" onClick={removeCover}>Remove Cover</button>}
        </div>


        {
            (!!task.cover?.fullSize && <>
                <span className="modal-label">Font color</span>
                <div className="choose-text-color-box">
                    <div className="button-wrapper">
                        <div className="color-text-light" onClick={(ev) => onPickTextColor(ev, true)} style={{ color: fontColor.light, backgroundColor: fontColor.dark }}>Color Text Light</div>
                    </div>
                    <div className="button-wrapper">
                        <div className="color-text-dark" onClick={(ev) => onPickTextColor(ev, false)} style={{ color: fontColor.dark, backgroundColor: fontColor.light }}>Color Text Dark</div>
                    </div>
                </div>
            </>)
        }

        <span className="modal-label">Colors</span>
        <div className="colors-tab">
            {
                coverColors.map(color => {
                    colorIdx++
                    return <div key={`color-${colorIdx - 1}`}
                        className="color-tab-wrapper"
                    >
                        <div
                            className="color-tab"
                            style={{ backgroundColor: color }}
                            data-idx={colorIdx - 1}
                            onClick={handleColorPick}>
                        </div></div>
                })
            }
        </div>

        <span className="modal-label">Attachments</span>
        <div className="cover-task-attachments flex row">
            {
                task.attachments?.map(attachment =>
                    <div
                        key={attachment.filename}
                        className="attach-tab-wrapper"
                    >
                        <div c
                            lassName="attachment-cover-picker"
                            style={boardService.getCoverAttachStyle(attachment.url)}
                            onClick={(ev) => onPickAttachCover(ev, attachment)}
                        />
                    </div>)
            }
        </div>

        <label className="upload-cover" htmlFor="uploadAttach">Upload a cover image
            <input type='file' id='uploadAttach' name='uploadAttach' onChange={(ev) => onUploadCover(ev)} />
        </label>
    </div>

}