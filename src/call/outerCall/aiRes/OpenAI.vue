<script setup>
import { ref } from 'vue'
import { ai, model } from './OpenAI.js'
import { isLoading } from '../../../data/ShareData.js'

const props = defineProps(['sentense'])

const res = ref(['', '', 'system-call'])
const tips = ref(false)
const information = ref(false)

ai(props.sentense).then((response) => {
    res.value = response
    isLoading.value = false
})
</script>

<template>
    <span class="tips" v-if="information">
        <span class="tips-font">The current model is <b style="color:black;">{{ model + " " }}</b>, the <b class="system-warning">{{ 'unsupported' }}</b> token has been consumed.</span>
        <button @click="tips = !tips">Why?</button>
    </span>
    <button style="margin-bottom: 1rem;" @click="information = !information">Information {{" "+ (information ? 'off' : 'on') }}</button>
    <span style="display: block;margin-bottom: 1rem;" v-if="tips && information">The tiktoken is powered by OpenAI.</span>
    <div><span :class="res[2]">{{ res[0] }}</span>{{ res[1] }}</div>
</template>

<style scoped>
.tips{
    display: inline-block;
    background-color: green;
    margin-bottom: 1rem;
}
.tips-font {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;   
    font-family: "Consolas";
    color: #ffffff;
}
</style>