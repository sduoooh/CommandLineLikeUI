import { ref } from 'vue'
import { outerConversationStatus } from '../OuterConversation'
import { Configuration, OpenAIApi } from "openai"

const configuration = ref()
const openai = ref()
const apiKey = ref()
const history = ref([
    { role: "system", content: "你的交流必须是使用中文的。你是一个可靠的助手。" },
])

async function chat(text) {
    history.value.push({ role: 'user', content: text })
    const response = await openai.value.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: history.value,
    })
    console.log(response)
    history.value.push(response.data.choices[0].message)
    console.log(response.data.choices[0].message.content)
    return ["openai: ", response.data.choices[0].message.content]
}

export const ai = async (arr) => {
    if (!outerConversationStatus.value.outerConversationContinue) {
        if (!apiKey.value) {
            if (arr.length !== 1) {
                return ["Warning: ", "Pls input your api key first."]
            } else {
                apiKey.value = arr[0]
                configuration.value = new Configuration({ apiKey: apiKey.value })
                openai.value = new OpenAIApi(configuration.value)
                outerConversationStatus.value.outerConversationContinue = true
                outerConversationStatus.value.outerConversationPart = 'openai'
                return ["openai: ", "Your api key has been set."]
            }
        }
    } else {
        if (arr.length === 0) {
            return ["Help: ", "You can type 'openai' without nothing to get this tips, or with some sentense to chat with openai. Whatever your mode in the conversation with this part, you always can with command : 'restart', 'exit' to restart or exit the conversation."]
        } else if (arr[0] === 'restart') {
            history.value = [{ "role": "system", "content": "你的交流必须是使用中文的。你是一个可靠的助手。" },]
            return ["openai: ", "Restarted."]
        } else if (arr[0] === 'exit') {
            outerConversationStatus.value.outerConversationContinue = false
            history.value = [{ "role": "system", "content": "你的交流必须是使用中文的。你是一个可靠的助手。" },]
            apiKey.value = null
            return ["openai: ", "Exited."]
        } else {
            return chat(arr[0])
        }
    }
}