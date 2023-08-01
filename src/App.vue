<script setup>
import { ref } from 'vue'

import { isTest } from './data/ShareData.js'

import Line from './defaultUI/Line.vue'
import Input from './defaultUI/Input.vue'
import InputRegisterTest from './test/InputRegisterTest.vue'

const words = ref([])

</script>


<template>
  <InputRegisterTest v-if="isTest"/>
  <Line v-memo="[]" v-for="i in words" :sentense="i.text" />
  <Input @update="(newWords) => words = newWords"/>
</template>