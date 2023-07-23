import { systemCall } from "../call/SystemCall.js"

/**
 *   @class Conversation
 *  @description Data class for conversation
 * @property {Array} conversationHistory - Array of conversation history
 * @property {Date} lastedUpdate - Lasted update date
 * @method {Array} getConversationHistoryAll - Get all conversation history
 * @method {Array} getConversationHistoryByRole - Get conversation history by role
 * @method {Array} addConversationHistory - Add conversation history
 * @method {Array} runSystemConversation - Run system conversation
 * @method {Array} clearConversationHistory - Clear conversation history
 * @example
 * const conversation = new Conversation()
 * conversation.getConversationHistoryAll()
 * conversation.getConversationHistoryByRole('user')
 * conversation.addConversationHistory('user', 'Hello')
 * conversation.runSystemConversation('Hello')
 * conversation.clearConversationHistory()
 *  @returns {Object} Conversation
 * 
*/
class Conversation {

    
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