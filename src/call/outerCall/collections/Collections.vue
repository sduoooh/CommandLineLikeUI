<script setup>
import { ref } from 'vue'
import { collections } from './Collections.js'
import { isLoading } from '../../../data/ShareData.js'
import { outerConversationStatus } from '../OuterConversation';

const props = defineProps(['sentense'])

const res = ref([])

const next = () => {
    collections(['next']).then((response) => {
        res.value = response
    })
}
const last = () => {
    collections(['last']).then((response) => {
        res.value = response
    })
}

if (props.sentense[0] !== 'next' && props.sentense[0] !== 'last') {
    collections(props.sentense).then((response) => {
        console.log('response:', props.sentense)
        res.value = response
    })
    isLoading.value = false
} else {
    res.value = ['collections', 'Try to change the page by buttons.']
    isLoading.value = false
}
</script>

<template>
    <div>
        <p>
            <button @click="last">last</button>
            <button @click='next'>next</button>
        </p>
        <div style="white-space: pre-wrap;">
            {{ res[1] }}
        </div>
    </div>
</template>