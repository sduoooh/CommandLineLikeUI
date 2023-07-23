const functionList = ["help", 'show', 'todo', ]

const help = function (attrs) {
    if (attrs.length === 0) {
        return ['Here are the functions you can use: ', "'help', 'show' and 'todo'."]
    }else if (attrs.length !== 1) {
        return ['Warning: ', 'The function \'help\' only takes 0 or 1 arguments.']
    }else if (attrs[0] === 'help') {
        return ['help: ', 'This function will show you the functions you can use.']
    }else if (attrs[0] === 'show') {
        return ['show: ', 'This function will show you the child sites of this dotme hostname.']
    }else if (attrs[0] === 'todo') {
        return ['todo: ', 'This function will show you the todo plans of this dotme hostname’s main site.']
    }
    else {
        return ['Warning: ', 'The function \'' + attrs[0] + '\' is not defined or is outer calling.']
    }
}

const show = function (attrs) {
    if (attrs.length === 0) {
        return ['Here are the child sites of this dotme hostname: ', '"CCT","Postman","upload","DotMeTodo"']
    }else if (attrs.length !== 1) {
        return ['Warning: ', 'The function \'show\' only takes 0 or 1 arguments.']
    }else if (attrs[0] === 'CCT') {
        return ['CCT: ', 'This is a website for deal with the GAME STAR RAIL`s child game. Address: http://sduoooh.me/CCT .']
    }else if (attrs[0] === 'Postman') {
        return ['Postman: ', 'This is a website for testing the API. Address: http://sduoooh.me/Postman .']
    }else if (attrs[0] === 'upload') {
        return ['upload: ', 'This is a website for uploading files. Address: http://upload.sduoooh.me .']
    }else if (attrs[0] === 'DotMeTodo') {
        return ['DotMeTodo: ', 'This is my dotme hostname `s todo list. Address: http://sduoooh.me/DotMeTodo .']
    }else {
        return ['Warning: ', 'The site \'' + attrs[0] + '\' is not defined or is outer calling.']
    }
}

const todo = function (attrs) {
    if (attrs.length === 0) {
        return ['Todo: ', 'realtime input header detecting; \n\nmodelize supporting.']
    }else{
        return ['Warning: ', 'The function \'todo\' only takes 0 or 1 arguments.']
    }
}

const crossing = function(arr){
    switch (arr[0]) {
        case 'help':
            return help(arr.slice(1, arr.length))
        case 'show':
            return show(arr.slice(1, arr.length)) 
        case 'todo':
            return todo(arr.slice(1, arr.length))
    }
}

export const operater = function (arr) {
    return crossing(arr)
}

export const tester = (command) => {
    return functionList.includes(command)
}