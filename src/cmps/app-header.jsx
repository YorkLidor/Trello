import { Link, NavLink } from "react-router-dom";
import { SiTrello } from 'react-icons/si'
import { FastAverageColor } from "fast-average-color";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

export function AppHeader() {
    const board = useSelector(state => state.boardModule.board)
    const elHeader = useRef()
    const [style, setStyle] = useState({})

    useEffect(() => {
        if (board) setThemeColor()
        else {
            setStyle({ '--dynamic-background': '#026AA7' })
            setStyle({ '--dynamic-text': '#FFFF' })
        }
    }, [board])

    const fac = new FastAverageColor()
    async function setThemeColor() {
        const { style } = board
        let sourceColor
        let color
        if (style.backgroundImage) {
            sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
            try {
                color = await fac.getColorAsync(sourceColor);
                setStyle({ '--dynamic-background': color.rgba })
                document.documentElement.style.setProperty('--dynamic-text', color.isLight ? '#172B4D' : '#FFFFF')
            } catch (err) {
                console.log(err);
            }
        } else {
            sourceColor = style.backgroundColor
            setStyle({ '--dynamic-background': 'hsla(0,0%,0%,0.16)' })
            document.documentElement.style.setProperty('--dynamic-text', '#FFFFF')
        }
    }

    return <header className="app-header-regular" ref={elHeader} style={style}>
        <nav className="main-nav flex">
            <div className="logo-container">
                <Link to="/" className="logo">
                    <SiTrello />
                    <span>Shmello</span>
                </Link>
            </div>
            <nav className="navlinks-container">
                <NavLink to="/workspace">Workspaces</NavLink>
            </nav>
        </nav >
    </header >
}