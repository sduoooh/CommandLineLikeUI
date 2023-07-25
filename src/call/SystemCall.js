import { operater } from "./innerCall/FunctionList"
import { outerConversationStatus, outerOperater } from "./outerCall/OuterConversation"

export const systemCall = function async(text) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([...operater(text)])
                }, 2000 * Math.random())
            })   
}
        // else if (calling[1] !== 'system') {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             outerOperater(textByWords)
        //                 .then((a) => {
        //                     resolve(['system', ...a])
        //                 })
        //         }, 2000 * Math.random())
        //     })

        // }
    

//     else if (outerConversationStatus.value.outerConversationContinue) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 outerOperater([outerConversationStatus.value.outerConversationPart, ...textByWords])
//                     .then((a) => {
//                         console.log(a)
//                         resolve([outerConversationStatus.value.outerConversationPart, ...a])
//                 })
//             }, 2000 * Math.random())
//         })
//     }
//     else {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(['system', 'Warning: ', 'Pls input a correct command. You can type "help" to get help. You have typed: "' + text.match(/(\S+)/gm)[0] + '".'])
//             }, 2000 * Math.random())
//         })
//     }
// }