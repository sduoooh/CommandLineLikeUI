<script setup>
import { ref } from 'vue'
import { ai } from './OpenAI.js'
import { isLoading } from '../../../data/ShareData.js'

const props = defineProps(['sentense'])

const res = ref(['', '', 'system-call'])

ai(props.sentense).then((response) => {
    console.log('response:', response)
    res.value = response
    isLoading.value = false
})
</script>

<template>
    <div><span :class="res[2]">{{ res[0] }}</span>{{ res[1] }}</div>
</template>