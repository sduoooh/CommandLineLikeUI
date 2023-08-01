<script setup>
import { ref,onBeforeUnmount } from "vue"
import { keyEnter } from "../api/input/InputAPI"

keyEnter.add('help', () => {
    console.log('test')
})

console.log('enter will console.log "test"')

onBeforeUnmount(() => {
    console.log('cancelled the testize enter\' register.')
    keyEnter.cancell('help')
})

const cancel = ref(false)
</script>

<template>
    <button @click="cancel = true">on</button>
    <button v-if="cancel" @click="cancel = false">cancell me!</button>
</template>