import { Register } from "../Register"

export const [
    upChange,
    downChange,
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
    keyEnter,
    mouseDown
] = (new Array(8)).fill(null).map(() => new Register())