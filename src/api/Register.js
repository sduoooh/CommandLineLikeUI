const exec = (args) => {
    args.forEach((item) => {
        item()
    }
    )
}

/**
 * @description: 注册器
 */

export class Register {

    funcList = []
    nameList = {}

    /**
     * 
     * @param {function} func 接受一个函数作为参数，将其注册到注册器中
     * @param {string} name  接受一个字符串作为参数，将其标识注册该函数的组件
     */
    add(name, func) {
        if (this.funcList.includes(func)) {
            console.log(func, typeof(this))
            throw new Error("This function has been registed.")
        }
        if (!(name in this.nameList)) {
            this.nameList[name] = []
        }
        this.funcList.push(func)
        this.nameList[name].push(this.funcList.length - 1)
    }

    /**
     *  
     * @return {function[]} 返回注册器中的所有函数
     *  
    */
    show() {
        return this.funcList
    }

    /**
     * 
     * @description 执行注册器中的所有函数
     * 
    */
    exec() {
        exec(this.funcList)
    }

    /**
     * 
     * @param {string} name  接受一个字符串，即希望注销其注册函数的组件的标识符
     * @description 通过组件的标识符，注销其注册的函数
     * 
     */
    cancell(name){
        this.nameList[name].map((item) => {
            this.funcList.splice(item, 1)
        })
        delete this.nameList[name]
    }
    
}

