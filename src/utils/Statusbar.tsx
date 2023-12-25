import { StatusBar, Style } from "@capacitor/status-bar"

type setStyle = {
    style: Style
}
export default async function Statusbar(setstyle: setStyle) {
    await StatusBar.setStyle({ style: setstyle.style });
}
