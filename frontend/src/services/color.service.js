import { FastAverageColor } from "fast-average-color";

const DYNAMIC_TXT_LIGHT = '#FFFFF'
const DYNAMIC_TXT_DARK = '#172B4D'
const BOARD_HEADER_BG_COLOR_LIGHT = '#ffffff3d'
const BOARD_HEADER_BG_COLOR_DARK = '#0000003d'
const DYNAMIC_TXT_TRANSPARENT_LIGHT = 'hsla(0,0%,100%,0.16)'
const DYNAMIC_TXT_TRANSPARENT_DARK = 'hsla(218,54%,19.6%,0.16)'

export const setThemeColor = async (style) => {
    const fastAveColor = new FastAverageColor()
    let sourceColor = style?.backgroundColor
    let color
    if (style?.backgroundImage) {
        sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
        try {
            color = await fastAveColor.getColorAsync(sourceColor);
            // setStyle({ '--dynamic-background': color.rgba })
            document.documentElement.style.setProperty('--dynamic-background', color.rgba)
            document.documentElement.style.setProperty('--dynamic-text', color.isLight ? DYNAMIC_TXT_DARK : DYNAMIC_TXT_LIGHT)
            document.documentElement.style.setProperty('--board-header-background-color', color.isLight ? BOARD_HEADER_BG_COLOR_LIGHT : BOARD_HEADER_BG_COLOR_DARK)
            document.documentElement.style.setProperty('--dynamic-text-transparent', color.isLight ? DYNAMIC_TXT_TRANSPARENT_DARK : DYNAMIC_TXT_TRANSPARENT_LIGHT)
        } catch (err) {
            console.log(err);
        }
    } else {
        document.documentElement.style.setProperty('--dynamic-text', DYNAMIC_TXT_LIGHT)
        document.documentElement.style.setProperty('--dynamic-background', sourceColor ? sourceColor : '#026AA7')
        document.documentElement.style.setProperty('--board-header-background-color', BOARD_HEADER_BG_COLOR_DARK)
        document.documentElement.style.setProperty('--dynamic-text-transparent', DYNAMIC_TXT_TRANSPARENT_LIGHT)
    }
}

export async function getRandomBgImg() {
    const src = await fetch("https://picsum.photos/1920/1080")

    return src.url;
}