import { isTest } from "../../data/ShareData"
const functionList = ["help", 'show', 'todo', 'system-information', 'test', ]

const help = function (attrs) {
    if (attrs.length !== 1) {
        return ['Warning: ', 'The function \'help\' only takes 0 or 1 arguments.', 'system-warning']
    }else if (attrs[0] === ''){
        return ['help-tips: ', 'This function will show something about the system call what you input with the "help". You can type with these attrs: ' + functionList + '.', 'system-call']
    }
    else if (attrs[0] === 'help') {
        return ['help: ', 'This function will show you the functions you can use.', 'system-call']
    }else if (attrs[0] === 'show') {
        return ['show: ', 'This function will show you the child sites of this dotme hostname.', 'system-call']
    }else if (attrs[0] === 'todo') {
        return ['todo: ', 'This function will show you the todo plans of this dotme hostname’s main site.', 'system-call']
    }else if (attrs[0] === 'system-information') {
        return ['system-information: ', 'This function will show you the system information of this dotme hostname’s main site.', 'system-call']
    }else if (attrs[0] === 'test') {
        return ['test: ', 'This function will control the test model.', 'system-call']
    }
    else {
        return ['Warning: ', 'The function \'' + attrs[0] + '\' is not defined or is outer calling.', 'system-warning']
    }
}

const show = function (attrs) {
    if (attrs[0] === '') {
        return ['Here are the child sites of this dotme hostname: ', '"CCT","Postman","upload","DotMeTodo"', 'system-call']
    }else if (attrs.length !== 1) {
        return ['Warning: ', 'The function \'show\' only takes 0 or 1 arguments.', 'system-warning']
    }else if (attrs[0] === 'CCT') {
        return ['CCT: ', 'This is a website for deal with the GAME STAR RAIL`s child game. Address: http://www.sduoooh.me/CCT .', 'system-call']
    }else if (attrs[0] === 'Postman') {
        return ['Postman: ', 'This is a website for testing the API. Address: http://www.sduoooh.me/Postman .', 'system-call']
    }else if (attrs[0] === 'upload') {
        return ['upload: ', 'This is a website for uploading files. Address: http://upload.sduoooh.me .',   'system-call']
    }else if (attrs[0] === 'DotMeTodo') {
        return ['DotMeTodo: ', 'This is my dotme hostname `s todo list. Address: http://www.sduoooh.me/DotMeTodo .', 'system-call']
    }else if (attrs[0] === 'system-information') {
        return ['system-information: ', 'This function will show you the system information of this dotme hostname’s main site.', 'system-call']
    }
    else {
        return ['Warning: ', 'The site \'' + attrs[0] + '\' is not defined or is outer calling.', 'system-warning']
    }
}

const todo = function (attrs) {
    if (attrs[0] === '') {
        return ['Todo: ', 'modelize supporting.', 'system-call']
    }else{
        return ['Warning: ', 'The function \'todo\' only takes 0 or 1 arguments.', 'system-warning']
    }
}

const systemInformation = function (attrs) {
    if (attrs[0] === '') {
        return ['System Information: ', 'via 0.0.2 , updated in 2023/08/01 19:** , renice the realtime detecting and, renice the Input component struct to support easy registering function. ', 'system-call']
    }else{
        return ['Warning: ', 'The function \'system-information\' only takes 0 arguments.', 'system-warning']
    }
}

const test = function (attrs) {
    if (attrs[0] === '') {
        return ['Test: ', 'With the attrs \'on\' or \'off\' to control the test mode, with \'show\' to get the realtime test-model status.', 'system-call']
    }else if (attrs[0] === 'on') {
        isTest.value = true
        return ['Test: ', 'The test mode is on.', 'system-call']
    }else if (attrs[0] === 'off') {
        isTest.value = false
        return ['Test: ', 'The test mode is off.', 'system-call']
    }else if (attrs[0] === 'show') {
        return ['Test: ', 'The test mode is ' + isTest.value + '.', 'system-call']
    }else{
        return ['Warning: ', 'The function \'test\' only takes 0 or 1 arguments, and pls input the attrs correctly.', 'system-warning']
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
        case 'system-information':
            return systemInformation(arr.slice(1, arr.length))
        case 'test':
            return test(arr.slice(1, arr.length))
    }
}

export const operater = function (arr) {
    return crossing(arr)
}

export const tester = (command) => {
    return functionList.includes(command)
}