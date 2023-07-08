<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { isCall } from '../call/SystemCall.js'
import { outerConversationStatus } from '../call/outerCall/OuterConversation.js'

const props = defineProps(['sentense', 'role'])

const headRef = ref(null)

const outerStatus = outerConversationStatus.value.outerConversationContinue

onMounted(async () => {
    await nextTick()
    const head = headRef.value
    // 丑陋的妥协
    head.textContent = ((props.role === 'user') && outerStatus) ? '>  ' + props.sentense[0] : props.sentense[0]
    // 丑陋的妥协x2，破坏了完整性。应该使用伪元素， 待我做完其他优化再来改它
    head.nextElementSibling.textContent = props.sentense[1] ? " " + props.sentense[1] : " "

    if (props.role === 'user') {
        if (props.sentense[0] && isCall(props.sentense[0])[0]) {
            head.classList.add('user-call')
        }
    } else if (props.role === 'system') {
        if (props.sentense[0] === 'Warning: ') {
            head.classList.add('system-warning')
        } else {
            head.classList.add('system-call')
        }
    } else {
        if (props.sentense[0] === 'openai: ') {
            head.classList.add('system-call')
        }
    }
})

</script>

<template>
    <p>
        <span ref="headRef"></span><span></span>
    </p>
</template>

<style scoped>
p {
    margin: 25px;
    font-family: "Consolas";
}
</style>