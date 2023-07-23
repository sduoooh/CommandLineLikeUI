
/**
 *  这是一个定时器类，其具有 start, stop, getStatus 三个方法
 *  其封装了 setTimeout 方法，可定时于某个时间后执行某个函数，并随时获取其运行状态
 *  @class Timer
 *
*/
export class Timer {


    /**
     * start是  Timer 类的一个方法， 用于开始定时器
     * @method start
     * @param {Function} func - 需要定时执行的函数
     * @param {Array} attr - 需要传入的参数
     * @param {Number} time - 定时时间
    */
    start(func, attr, time) {
        this.status = true
        this.timer = setTimeout(() => {
            func(...attr)
            this.status = false
        }
            , time)
    }

    /**
     * stop是  Timer 类的一个方法， 用于停止定时器
     * @method stop
    */
    stop() {
        this.status = false
        clearTimeout(this.timer)
    }

    /**
     * getStatus是  Timer 类的一个方法， 用于获取定时器的状态
     * @method getStatus
     * @return {Boolean} status - 定时器的状态
    */
    getStatus() {
        return this.status
    }
}