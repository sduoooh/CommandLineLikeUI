export class Timer {
    
    start(func,attr, time) {
        this.status = true
        this.timer = setTimeout(() => {
            func(...attr)
            this.status = false
        }
        , time)
    }

    stop() {
        clearTimeout(this.timer)
    }

    getStatus() {
        return this.status
    }
}