import {
    createCliRenderer,
    GroupRenderable,
    type CliRenderer,
} from "../index"
import { ScrollBarEvents, ScrollBarRenderable } from "../renderables/ScrollBar"
import { setupCommonDemoKeys } from "./lib/standalone-keys"

let Vscroll: ScrollBarRenderable | null = null
let renderer: CliRenderer | null = null

export function run(rendererInstance: CliRenderer): void {
    renderer = rendererInstance
    renderer.setBackgroundColor("#001122")

    const parentContainer = new GroupRenderable("parent-container", {
        zIndex: 10,
        visible: true,
    })
    renderer.root.add(parentContainer)

    const contentSize = { width: 500, height: 500 }

    Vscroll = new ScrollBarRenderable("demo-scrollbar", {
        position: "absolute",
        left: 0,
        top: 0,
        width: renderer.terminalWidth,
        height: renderer.terminalHeight,
        zIndex: 100,
        orientation: "vertical",
        contentSize: contentSize,
    })

    renderer.root.add(Vscroll)

    Vscroll.on(ScrollBarEvents.USER_SCROLL, (e) => console.log(e))
    Vscroll.focus()
}

export function destroy(rendererInstance: CliRenderer): void {
    if (Vscroll) {
        rendererInstance.root.remove(Vscroll.id)
        Vscroll.destroy()
        Vscroll = null
    }

    rendererInstance.root.remove("parent-container")

    renderer = null
}

if (import.meta.main) {
    const renderer = await createCliRenderer({
        exitOnCtrlC: true,
    })

    run(renderer)
    setupCommonDemoKeys(renderer)
    renderer.start()
}
