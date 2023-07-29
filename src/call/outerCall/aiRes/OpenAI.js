import { ref } from 'vue'
import { outerConversationStatus } from '../OuterConversation'
import { Configuration, OpenAIApi } from "openai"

const configuration = ref()
const openai = ref()
const apiKey = ref()
export const model = ref("gpt-3.5-turbo-0613")
const history = ref([
    { role: "system", content: "你的交流必须是使用中文的。你是一个可靠的助手。" },
])

/**
 * 
 * @param {string} text 
 * @returns {[role : string, content : string]} history style response
 */
async function chat(text) {
    history.value.push({ role: 'user', content: text })
    const response = await openai.value.createChatCompletion({
        model: model.value,
        messages: history.value,
    })
    history.value.push({ role: 'AI', content: response.data.choices[0].message })
    console.log(response.data.choices[0].message.content)
    return ["openai: ", response.data.choices[0].message.content, 'outer-openai']
}


/**
 * 
 * @param {string[]} arr 
 * @returns {[role : string, content : string]} history style response
 */
export const ai = async (arr) => {
    if (!outerConversationStatus.value.outerConversationContinue) {
        outerConversationStatus.value.outerConversationContinue = true
        outerConversationStatus.value.outerConversationPart = 'openai'
        if (arr[0] === 'openai' && !/sk-[0-9a-zA-Z]{48}/gm.test(arr[1])) {

            return ["Warning: ", "Pls input your api key first.", 'system-warning']
        } else {
            apiKey.value = arr[1]
            configuration.value = new Configuration({ apiKey: apiKey.value })
            openai.value = new OpenAIApi(configuration.value)
            outerConversationStatus.value.outerConversationContinue = true
            outerConversationStatus.value.outerConversationPart = 'openai'
            return ["openai: ", "Your api key has been set.", 'outer-openai']
        }
    } else {
        if (arr[0] === 'openai'){
            const temp = arr[1].match(/(\S+)/gm) || [""]
            console.log(temp)
            switch (temp[0]) {
                case '': 
                    return ["Help: ", "You can type 'openai' without nothing to get this tips, or with some sentense to chat with openai. Whatever your mode in the conversation with this part, you can always with one of these commands : 'restart', 'exit' to restart or exit the conversation.", 'outer-openai']
                case 'restart':
                    history.value = [{ "role": "system", "content": "你的交流必须是使用中文的。你是一个可靠的助手。" },]
                    return ["openai: ", "Restarted.", 'outer-openai']
                case 'exit':
                    outerConversationStatus.value.outerConversationContinue = false
                    history.value = [{ "role": "system", "content": "你的交流必须是使用中文的。你是一个可靠的助手。" },]
                    apiKey.value = null
                    return ["openai: ", "Exited.", 'outer-openai']
                case "setmodel":
                    if (temp[1] === 'gpt-3.5-turbo-0613') {
                        model.value = temp[1]
                        return ["openai: ", "The model has been set to " + model.value, 'outer-openai']
                    } 
                    else if(temp[1] === 'gpt-4-0613'){
                        return ["Warning: ", "GPT-4 is unsupported now.", 'system-warning']
                    }
                    else {
                        return ["Warning: ", "Pls input a correct model.", 'system-warning']
                    }
                }
        }
        if (!apiKey.value) {
            if (/sk-[0-9a-zA-Z]{48}/gm.test(arr[0])) {
                apiKey.value = arr[0]
                configuration.value = new Configuration({ apiKey: apiKey.value })
                openai.value = new OpenAIApi(configuration.value)
                outerConversationStatus.value.outerConversationContinue = true
                outerConversationStatus.value.outerConversationPart = 'openai'
                return ["openai: ", "Your api key has been set.", 'outer-openai']
            } else {
                return ["Warning: ", "Pls input a correct api key.", 'system-warning']
            }
        } else {
            return chat(arr[0])
        }
    }
}