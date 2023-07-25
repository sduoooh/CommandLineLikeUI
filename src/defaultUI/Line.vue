<script setup>
import { onMounted, ref, nextTick, computed } from 'vue'
import { outerConversationStatus, outerOperater } from '../call/outerCall/OuterConversation.js'
import { isLoading } from '../data/ShareData'
import { isCall } from '../tools/IsCall.js'
import Conversation from '../data/ConversationData.js'
import { systemCall } from '../call/SystemCall.js'

import OpenAI from '../call/outerCall/aiRes/OpenAI.vue'
import Collections from '../call/outerCall/collections/Collections.vue'

const props = defineProps(['sentense'])
const is = ref(null)
const type = ref([])
const style = ref('')

const userHead = ref(null)
const resHead = ref(null)

const outerStatus = ref(outerConversationStatus.value.outerConversationContinue)
const conversation = new Conversation();
[is.value, type.value, style.value] = isCall(props.sentense[0])
const outerPart = outerOperater(type.value[1])

onMounted(async () => {
    await nextTick();

    const head = userHead.value

    head.textContent = (outerStatus.value) ? '>  ' + props.sentense[0] : props.sentense[0]
    head.nextElementSibling.textContent = props.sentense[1] ? " " + props.sentense[1] : " "
    style.value ? head.classList.add(style.value) : null
    await nextTick();

    if (!outerStatus.value) {
        if (!is.value) {
            console.log('resHead:', resHead.value)
            resHead.value.textContent = 'Warning: '
            resHead.value.classList.add('system-warning')
            resHead.value.nextElementSibling.textContent = 'Pls input a correct command. You can type "help" to get help. You have typed: "' + props.sentense[0] + '".'
            isLoading.value = false
        } else if (type.value[0] === 'system') {
            const response = await systemCall(props.sentense)
            console.log('response:', response.valueOf())
            resHead.value.classList.add(response.valueOf()[2])

            resHead.value.textContent = response.valueOf()[0]
            resHead.value.nextElementSibling.textContent = response.valueOf()[1]

            conversation.addConversationHistory('system', response.valueOf()[0] + response.valueOf()[1])
            isLoading.value = false
        } else {
            outerStatus.value = true
        }
    }else {
        type.value[0] = 'outer'
        type.value[1] = outerConversationStatus.value.outerConversationPart
    }


})

</script>

<template>
    <p>
        <span ref="userHead"></span><span></span>
    </p>

    <p v-if="!outerStatus">
        <span ref="resHead"></span><span></span>
    </p>
    <p v-else>
        <span class="tips"><span class="tips-font">{{ "Powered by Outer-Module " }} <b style="color: black;">{{ type[1]
        }}</b></span></span>
    <p style="margin-left: 0;">
        <component :is="outerPart" :sentense="props.sentense"></component>
    </p>
    </p>
</template>

<style scoped>
p {
    margin: 25px;
    font-family: "Consolas";
}

.tips {
    background-color: red;
}

.tips-font {
    margin-left: 1rem;
    margin-right: 1rem;
    font-family: "Consolas";
    color: #ffffff;
}</style>