import { ref } from 'vue'
import axios from 'axios'
import { outerConversationStatus } from '../OuterConversation'

const collectionsList = ref([])
const pagelimit = ref(10)
const nowpage = ref(1)
const response = ref(["colletions: \n", `Here are yours orders (pageLimit : ${pagelimit.value} , nowPage :  ${nowpage.value} ): \n\n`])


export async function collections(arr) {
    if (!outerConversationStatus.value.outerConversationContinue) {
        outerConversationStatus.value.outerConversationContinue = true
        outerConversationStatus.value.outerConversationPart = 'collections'
        let a = response.value
        await axios.get('https://collection.sduoooh.me/dir.json')
            .then((res) => {
                collectionsList.value = res.data.dir
                for (let i = 0; i < pagelimit.value; i++) {
                    if (i < collectionsList.value.length) {
                        a[1] += `第 ${collectionsList.value[i].index + 1} 条：  ${collectionsList.value[i].file_name}: ${collectionsList.value[i].show_content}\n\n`
                    }
                }
            }
        )
        return a
    }
    else {
        if (arr.length === 0) {
            return ["help: ", "You can type 'collections' without nothing to get this tips, or with some sentense to chat with collections. Whatever your mode in the conversation with this part, you can always with one of these commands : 'restart', 'exit' to restart or exit the conversation.Also, you can use 'open' to open the collection you want, 'pagelimit' to set the page limit, 'next' and 'last' to turn the page."]
        } else if (arr[0] === 'restart') {
            response.value = ["colletions: \n", '']
            return ["colletions: ", "Restarted."]
        } else if (arr[0] === 'exit') {
            outerConversationStatus.value.outerConversationContinue = false
            response.value = ["colletions: \n", '']
            return ["colletions: ", "Exited."]
        } else if (arr[0] === 'open' && !isNaN(arr[1]*1) && arr[1]*1 <= collectionsList.value.length && arr[1]*1 > 0) {
            window.open(`https://collection.sduoooh.me/${collectionsList.value[arr[1]*1 - 1].file_name}`)
            return ["colletions: ", `We will open the No.${arr[1]*1} collection for you.`]
        } else if (arr[0] === 'pagelimit' && !isNaN(arr[1]*1) && arr[1]*1 > 0) {
            return ["colletions: ", "We will set the page limit to " + arr[1]*1 + "."]
        } else if (arr[0] === 'next') {
            if (nowpage.value < Math.ceil(collectionsList.value.length / pagelimit.value)) {
                nowpage.value += 1
                let a = response.value
                for (let i = (nowpage.value - 1) * pagelimit.value; i < nowpage.value * pagelimit.value; i++) {
                    if (i < collectionsList.value.length) {
                        a[1] += `第 ${collectionsList.value[i].index + 1} 条：  ${collectionsList.value[i].file_name}: ${collectionsList.value[i].show_content}\n\n`
                    }
                }
                return a
            }
        } else if (arr[0] === 'last') {
            if (nowpage.value > 1) {
                nowpage.value -= 1
                let a = response.value
                for (let i = (nowpage.value - 1) * pagelimit.value; i < nowpage.value * pagelimit.value; i++) {
                    if (i < collectionsList.value.length) {
                        a[1] += `第 ${collectionsList.value[i].index + 1} 条：  ${collectionsList.value[i].file_name}: ${collectionsList.value[i].show_content}\n\n`
                    }
                }
                return a
            }
        }
        else {
            return ["colletions: ", "Warning: The command '" + arr[0] + "' is not defined or has bad used."]
        }
    }
}

