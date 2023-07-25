import { ref } from 'vue'

import OpenAI from './aiRes/OpenAI.vue'
import Collections from './collections/Collections.vue'

const outerPartsList = ['openai', 'collections',] // 后续将动态获取该部分

export const outerConversationStatus = ref({
    outerConversationContinue: false,
    outerConversationPart: null
})

export const outerTester = (text) => {
    return outerPartsList.includes(text)
}

export const outerOperater = (text) => {
    if (outerConversationStatus.value.outerConversationContinue) text = outerConversationStatus.value.outerConversationPart
    switch (text) {
        case 'openai':
            return OpenAI
        case 'collections':
            return Collections
    }
}