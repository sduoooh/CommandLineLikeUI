<script setup>
import { ref, watch } from 'vue'
import Line from './defaultUI/Line.vue'
import { Timer } from './tools/Timer.js'
import { isLoading } from './data/ShareData.js'
import { outerConversationStatus } from './call/outerCall/OuterConversation'

const words = ref([])
const timer = new Timer()
const editable = ref(true)
const nowInputIndex = ref(0)
const tempInput = ref('')

const input = async function () {
  if (timer.getStatus()) {
    console.log('timer is running')
    return
  } else {
    timer.start(console.log, ['timer start'], 1000)
  }
  isLoading.value = true
  const userInput = document.getElementById('userInput').textContent
  document.getElementById('userInput').textContent = ''
  words.value.push({
    text: /^\s*$/gm.test(userInput) ?
      ['', ''] :
      [userInput.match(/(\S+)/gm)[0], userInput.match(/(\S+)/gm).slice(1).join(' ')],
    part: outerConversationStatus.value.outerConversationContinue ? outerConversationStatus.value.outerConversationPart : 'system'
  })
  nowInputIndex.value = words.value.length
}

const focusin = function () {
  document.getElementsByClassName('lines')[0].classList.add("inputting-cursor")
  document.getElementsByClassName('lines')[0].classList.remove("waitting-cursor")
}

const focusout = function () {
  document.getElementsByClassName('lines')[0].classList.remove("inputting-cursor")
  document.getElementsByClassName('lines')[0].classList.add("waitting-cursor")
}

const working = () => {
  editable.value = false
  document.getElementById('userInput').style.contenteditable = 'false'
  document.getElementsByClassName('lines')[0].classList.remove("waitting-cursor")
  document.getElementsByClassName('lines')[0].classList.remove("inputting-cursor")
  document.getElementsByClassName('lines')[0].classList.remove("no-working-arr")
  document.getElementsByClassName('lines')[0].classList.add("working-cursor")
  document.getElementsByClassName('lines')[0].classList.add("working-arr")
}

const noWorking = () => {
  document.getElementsByClassName('lines')[0].classList.remove("working-cursor")
  document.getElementsByClassName('lines')[0].classList.remove("working-arr")
  document.getElementsByClassName('lines')[0].classList.add("no-working-arr")
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
  if (outerConversationStatus.value.outerConversationContinue && words.value[nowInputIndex.value].part != outerConversationStatus.value.outerConversationPart) {
    func()
    return
  }else if (!outerConversationStatus.value.outerConversationContinue && words.value[nowInputIndex.value].part != 'system') {
    func()
    return
  }
  document.getElementById('userInput').textContent = words.value[nowInputIndex.value].text[0] + (words.value[nowInputIndex.value].text[1] === '' ? '' : ' ' + words.value[nowInputIndex.value].text[1])
  initArr()
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


watch(isLoading, (newVal) => {
  if (newVal) {
    working()
  } else {
    noWorking()
  }
})

</script>


<template>
  <div>{{ words }}</div>
  <Line v-memo="[]" v-for="i in words" :sentense="i.text" />
  <div id="div" class="lines waitting-cursor no-working-arr">
    <p v-if="editable" id="userInput" autofocus="true" @focus="focusin" @blur="focusout" contenteditable="true"
      class="delete-cursor" @keyup.enter.native="input" @keydown.left.prevent @keydown.right.prevent
      @mousedown.prevent="(event) => event.target.focus()" @keydown.up.prevent='prev' @keydown.down.prevent='next'></p>
    <p v-else class="delete-cursor"></p>
  </div>
</template>

<style scoped>
.inputting-cursor {
  --cursor-content: "|";
  --time: 0.8s;
}

.waitting-cursor {
  --cursor-content: "_";
  --time: 0.8s;
}

.working-cursor {
  --cursor-content: "... ...";
  --time: 0.8s;
}

.working-arr {
  --arr-content: "";
}

.no-working-arr {
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