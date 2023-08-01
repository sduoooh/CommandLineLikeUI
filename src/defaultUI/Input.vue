<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

import { Timer } from '../tools/Timer.js'
import { isLoading } from '../data/ShareData.js'
import { outerConversationStatus } from '../call/outerCall/OuterConversation'
import { isCall } from '../tools/IsCall.js'
import {
    upChange,
    downChange,
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
    keyEnter,
    mouseDown,
} from "../api/input/InputAPI"

const emits = defineEmits(['update'])

const words = ref([])
const timer = new Timer()
const editable = ref(true)
const nowInputIndex = ref(0)
const tempInput = ref('')
const highlight = ref([false, ['', ''], ''])

const focusin = function () {
    const classList = document.getElementsByClassName('lines')[0].classList

    classList.add("inputting-cursor")
    classList.remove("waitting-cursor")
}

const focusout = function () {
    const classList = document.getElementsByClassName('lines')[0].classList

    classList.remove("inputting-cursor")
    classList.add("waitting-cursor")
}

const working = () => {
    editable.value = false

    const classList = document.getElementsByClassName('lines')[0].classList

    document.getElementById('userInput').style.contenteditable = 'false'
    classList.remove("waitting-cursor")
    classList.remove("inputting-cursor")
    classList.remove("no-working-arr")
    classList.add("working-cursor")
    classList.add("working-arr")
}

const noWorking = () => {
    const classList = document.getElementsByClassName('lines')[0].classList
    
    classList.remove("working-cursor")
    classList.remove("working-arr")
    classList.add("no-working-arr")
    editable.value = true
    setTimeout(() => {
        document.getElementById('userInput').focus()
    }, 1);
}

const initArr = () => {
    document.execCommand("selectAll", false, null)
    document.getSelection().collapseToEnd()
}

const moduleMemoryIsolation = (func) => {
    const isContinue = outerConversationStatus.value.outerConversationContinue
    const part = outerConversationStatus.value.outerConversationPart
    const word = words.value[nowInputIndex.value]
    if (isContinue && word.part != part) {
        func()
        return
    } else if (!isContinue && word.part != 'system') {
        func()
        return
    }
    document.getElementById('userInput').textContent = word.text[0] + (word.text[1] === '' ? '' : ' ' + word.text[1])
    initArr()
}

const input = async function () {
    if (timer.getStatus()) {
        console.log('timer is running')
        document.getElementById('userInput').textContent = ''
        return
    } else {
        timer.start(console.log, ['timer start'], 1000)
    }
    isLoading.value = true
    highlight.value = [false, ['', ''], '']
    const userInput = document.getElementById('userInput').textContent
    document.getElementById('userInput').textContent = ''
    words.value.push({
        text: /^\s*$/gm.test(userInput) ?
            ['', ''] :
            [userInput.match(/(\S+)/gm)[0], userInput.match(/(\S+)/gm).slice(1).join(' ')],
        part: outerConversationStatus.value.outerConversationContinue ? outerConversationStatus.value.outerConversationPart : 'system'
    })
    emits('update', words.value)
    nowInputIndex.value = words.value.length
}

const next = () => {
    if (words.value.length === 0) {
        return
    }
    if (nowInputIndex.value === words.value.length - 1) {
        document.getElementById('userInput').textContent = tempInput.value
        nowInputIndex.value = words.value.length
        initArr()
        return
    }
    if (nowInputIndex.value === words.value.length) {
        tempInput.value = document.getElementById('userInput').textContent
        nowInputIndex.value = 0
        moduleMemoryIsolation(next)
        return
    }
    nowInputIndex.value += 1
    moduleMemoryIsolation(next)
}

const prev = () => {
    if (words.value.length === 0) {
        return
    }
    if (nowInputIndex.value === 0) {
        document.getElementById('userInput').textContent = tempInput.value
        initArr()
        nowInputIndex.value = words.value.length
        return
    }
    if (nowInputIndex.value === words.value.length) {
        tempInput.value = document.getElementById('userInput').textContent
    }
    nowInputIndex.value -= 1
    moduleMemoryIsolation(prev)
}

const change = () => {
    const text = document.getElementById('userInput').textContent
    const status = outerConversationStatus.value
    text === '' ? highlight.value[0] = false : highlight.value = isCall(text.match(/(\S+)/gm)[0])
    
    if( highlight.value[0] ) {
        highlight.value[0] = status.outerConversationContinue? highlight.value[1][1] === status.outerConversationPart : true
    }
}

const focus = () => {
    document.getElementById('userInput').focus()
    initArr()
}

// 注册事件
upChange.add('input',change)
downChange.add('input',change)
keyEnter.add('input',input)
keyDown.add('input',next)
keyUp.add('input',prev)
mouseDown.add('input',focus)

// 注销事件

onBeforeUnmount(() => {
    upChange.cancell('input')
    downChange.cancell('input')
    keyEnter.cancell('input')
    keyDown.cancell('input')
    keyUp.cancell('input')
    mouseDown.cancell('input')
})

watch(isLoading, (newVal) => {
    if (newVal) {
        working()
    } else {
        noWorking()
    }
})

</script>

<template>
    <div id="div" class="lines waitting-cursor no-working-arr arr ">
        <div v-if="editable">
            <span v-if="highlight[0]" :class="highlight[2]" style="position: absolute;caret-color: transparent;"
                @click="focus">{{ highlight[1][1] }}</span>
            <p id="userInput" autofocus="true" @focus="focusin" @blur="focusout" contenteditable="true" class="delete-cursor" 
                @keyup="upChange.exec" @keydown="downChange.exec" @keyup.enter.native.prevent="keyEnter.exec"
                @keydown.left.prevent="keyLeft.exec" @keydown.right.prevent="keyRight.exec" @mousedown.prevent="mouseDown.exec"
                @keydown.up.prevent='keyUp.exec' @keydown.down.prevent='keyDown.exec'></p>
        </div>
        <p v-else class="delete-cursor"></p>
    </div>
</template>

<style scoped>
.inputting-cursor p {
    --cursor-content: "|";
    --time: 0.8s;
}

.waitting-cursor p {
    --cursor-content: "_";
    --time: 0.8s;
}

.working-cursor p {
    --cursor-content: "... ...";
    --time: 0.8s;
}

.working-arr p {
    --arr-content: "";
}

.no-working-arr p {
    --arr-content: ">>> ";
    --time: 0.8s;
}

.arr span {
    --arr-content: ">>> ";
    --time: 0.8s;
}

.lines {
    margin: 25px;
    font-family: "Consolas";
}

div.lines ::after {
    color: rgb(204, 204, 204);
    content: var(--cursor-content);
    font-family: "Consolas";
    -webkit-animation: Blink var(--time) ease-in 0s infinite;
    animation: Blink var(--time) ease-in 0s infinite;
    font-weight: bold;
    position: relative;
}

div.lines ::before {
    color: rgb(204, 204, 204);
    content: var(--arr-content);
    font-family: "Consolas";
}

.lines :focus-visible {
    outline: none;
}

.delete-cursor {
    caret-color: transparent;
}

@-webkit-keyframes Blink {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes Blink {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>