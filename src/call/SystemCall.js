import { operater, tester } from "./innerCall/FunctionList"
import { outerConversationStatus, outerOperater, outerTester } from "./outerCall/OuterConversation"

export const isCall = (head) => {
    let is = false
    let type = ''
    if (tester(head)) {
        is = true
        type = 'system'
    } else if (outerTester(head)) {
        is = true
        type = head
    }
    else {
        is = false
        type = ''
    }
    return [is, type]
}

export const systemCall = function async(text) {
    if (/^\s*$/gm.test(text)) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(['system', 'Warning: ', 'We don\'t accept empty command.'])
            }, 2000 * Math.random())
        })
    }
    const textByWords = text.match(/(\S+)/gm)
    const calling = isCall(textByWords[0])
    if (calling[0]) {
        if (calling[1] === 'system') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(['system', ...operater(textByWords)])
                }, 2000 * Math.random())
            })
        } else if (calling[1] !== 'system') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    outerOperater(textByWords)
                        .then((a) => {
                            resolve(['system', ...a])
                        })
                }, 2000 * Math.random())
            })

        }
    }
    else if (outerConversationStatus.value.outerConversationContinue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                outerOperater([outerConversationStatus.value.outerConversationPart, ...textByWords])
                    .then((a) => {
                        console.log(a)
                        resolve([outerConversationStatus.value.outerConversationPart, ...a])
                })
            }, 2000 * Math.random())
        })
    }
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(['system', 'Warning: ', 'Pls input a correct command. You can type "help" to get help. You have typed: "' + text.match(/(\S+)/gm)[0] + '".'])
            }, 2000 * Math.random())
        })
    }
}