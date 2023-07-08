#   本部分待做：

##  统一化
即将 ```innerCall``` 和 ```outerCall``` 的 ```callList```（即供 ```help``` 调用的指令序列）  、 ```description```（即供 ```help``` 调用的简介）  、```isCall() ``` （ 即指令的tester ）、```noHeaderMode``` （ 即原先的 ```outerConversationStatus``` ，并并入该部分的交互逻辑 ）、 ```isHighLighter()``` （ 即关键字的tester及其样式返回 ）， 还有最关键的 ```coreCallPort()``` （ 即核心逻辑函数的接口 ）统一起来 ， 暴露为一个供调用的类， 置于 ```SystemCall.js``` 中。

##  结构化
即对 ```innerCall``` 和 ```outerCall``` 进行改造， 使前者符合模块内要求，后者形成外部接口的调用固定化。