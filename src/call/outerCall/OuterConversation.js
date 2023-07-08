import { ref } from 'vue'

import { ai } from './aiRes/openai'


const outerPartsList = ['openai',] // 后续将动态获取该部分

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
    }
}