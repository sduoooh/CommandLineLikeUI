import { systemCall } from "../call/SystemCall.js"

class Conversation {

    //
    // a sample:
    //       [{ role: 'system', text: ['Hello', 'how can I help you?'], date : new Date() }, }].
    //
    #conversationHistory = []
    lastedUpdate = new Date()

    constructor() {
        this.#conversationHistory = []
        this.lastedUpdate = new Date()
    }

    getConversationHistoryAll() {
        return this.#conversationHistory
    }

    getConversationHistoryByRole(role) {
        return this.#conversationHistory.filter((item) => item.role === role)
    }

    addConversationHistory(role, text) {
        console.log(role, text)
        this.#conversationHistory.push({ role: role, text: text, date: new Date() })
        this.lastedUpdate = new Date()
        return this.#conversationHistory
    }

    async runSystemConversation(text) {
        const response = await systemCall(text)
        return this.addConversationHistory(response.valueOf()[0],response.valueOf().slice(1, response.valueOf().length)) 
    }

    clearConversationHistory() {
        this.#conversationHistory = []
        this.lastedUpdate = new Date()
        return this.#conversationHistory
    }

}

export default Conversation