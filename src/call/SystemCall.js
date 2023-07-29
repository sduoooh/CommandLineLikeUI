import { operater } from "./innerCall/FunctionList"
import { outerConversationStatus, outerOperater } from "./outerCall/OuterConversation"

export const systemCall = function async(text) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([...operater(text)])
                }, 2000 * Math.random())
            })   
}