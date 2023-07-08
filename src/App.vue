<script setup>
import { ref } from 'vue'
import Line from './ui/Line.vue'
import Conversation from './data/ConversationData.js'
import { Timer } from './tools/Timer.js'

const conversation = new Conversation()
const words = ref([])
const timer = new Timer()
const editable = ref(true)

const input = async function () {
  if (timer.getStatus()) {
    console.log('timer is running')
    return
  } else {
    timer.start(console.log, ['timer start'], 1000)
  }
  working()
  const userInput = document.getElementById('userInput').textContent
  document.getElementById('userInput').textContent = ''
  let te = conversation.addConversationHistory(
    'user', 
    /^\s*$/gm.test(userInput) ? 
          ['', ''] : 
          [userInput.match(/(\S+)/gm)[0], userInput.match(/(\S+)/gm).slice(1).join(' ')]
  )
  console.log(te)
  words.value = te
  let temp = await conversation.runSystemConversation(userInput)
  words.value = temp
  noWorking()
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
</script>


<template>
  <Line v-memo v-for="i in words" :sentense="i.text" :role="i.role"/>
  <div class="lines waitting-cursor no-working-arr">
    <p v-if="editable" id="userInput" autofocus="true" @focus="focusin" @blur="focusout"  contenteditable="true" class="delete-cursor"
      @keyup.enter.native="input"></p>
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