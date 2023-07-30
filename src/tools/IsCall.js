import { tester } from "../call/innerCall/FunctionList"
import { outerTester } from "../call/outerCall/OuterConversation"

/**
 * 
 * @param {string} head 
 * @returns {[boolean, string[], string]} [is, type, style]
 * @example
 * isCall('help')  // help is a system call
 * // [true, ['system', 'help'], 'system-call']
 * isCall('openai') // openai is a outer call
 * // [true, ['outer', 'openai'], 'outer-openai']
 */
export const isCall = (head) => {
    let is = false
    let type = []
    let style = ''

    if (tester(head)) {
        is = true
        type = ['system', head]
        style = 'system-call'
    } else if (outerTester(head)) {
        is = true
        type = ['outer', head]
        style = 'outer-' + head
    }
    else {
        is = false
        type = ["system","error"]
        style = ''
    }
    return [is, type, style]
}