import { FastAverageColor } from "fast-average-color";

const DYNAMIC_TXT_LIGHT = '#FFFFF'
const DYNAMIC_TXT_DARK = '#172B4D'
const BOARD_HEADER_BG_COLOR_LIGHT = '#ffffff3d'
const BOARD_HEADER_BG_COLOR_DARK = '#0000003d'

export const setThemeColor = async (style) => {
    const fastAveColor = new FastAverageColor()
    let sourceColor = style?.backgroundColor
    let color
    console.log('color:', style?.backgroundColor)
    if (style) {
        sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
        try {
            color = await fastAveColor.getColorAsync(sourceColor);
            // setStyle({ '--dynamic-background': color.rgba })
            document.documentElement.style.setProperty('--dynamic-background', color.rgba)
            document.documentElement.style.setProperty('--dynamic-text', color.isLight ? DYNAMIC_TXT_DARK : DYNAMIC_TXT_LIGHT)
            document.documentElement.style.setProperty('--board-header-background-color', color.isLight ? BOARD_HEADER_BG_COLOR_LIGHT : BOARD_HEADER_BG_COLOR_DARK)
        } catch (err) {
            console.log(err);
        }
    } else {
        // setStyle({ '--dynamic-background': BOARD__BG_COLOR })
        console.log('hi');
        document.documentElement.style.setProperty('--dynamic-text', DYNAMIC_TXT_LIGHT)
        document.documentElement.style.setProperty('--dynamic-background', '#026AA7')
    }
}

