import { ref } from 'vue'

import { ai } from './aiRes/openai'
import { collections } from './collections/Collections.js'


const outerPartsList = ['openai', 'collections',] // 后续将动态获取该部分

export const outerConversationStatus = ref({
    outerConversationContinue: false,
    outerConversationPart: null
})

export const outerTester = (text) => {
    return outerPartsList.includes(text)
}

export const outerOperater = (text) => {
    switch (text[0]) {
        case 'openai':
            return ai(text.slice(1, text.length))
        case 'collections':
            return collections(text.slice(1, text.length))
    }
}