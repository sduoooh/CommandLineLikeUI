import { ref } from 'vue'


const outerPartsList = ['openai', 'collections',] // 后续将动态获取该部分

export const outerConversationStatus = ref({
    outerConversationContinue: false,
    outerConversationPart: null
})

export const outerTester = (text) => {
    return outerPartsList.includes(text)
}

export const outerOperater = (text) => {
    switch (text) {
        case 'openai':
            return 'OpenAI'
        case 'collections':
            return 'Collections'
    }
}