## srtp 前后端部分

> 基于浏览器指纹以及鼠标轨迹识别的无感知验证码

### 运行

1. git clone
2. npm install
3. npm run dev

![20230412140709](https://typora-1309407228.cos.ap-shanghai.myqcloud.com/20230412140709.png)

### 运行逻辑

1. 用户移动鼠标到checkbox,点击checkbox
2. 后端根据以下数据判断访问用户风险等级
   1. 浏览器指纹
   2. 鼠标轨迹
3. 如果判断为有风险,弹出图片&语音验证码的modal,如果没有风险,直接通过

### 更新日志

3.25
1. 鼠标轨迹&时间戳捕捉
2. 浏览器指纹生成
3. 后端逻辑代码
   1. 高频请求ban
   2. 执行本地python模型

4.12
1. 接上了后端python模型
2. 美化了验证码样式

4.21
1. 增加了点击图片验证码

4.22
1. 完善了判断逻辑
### TODO

1. 自定义浏览器指纹
2. ~~接入后端python模型~~
3. 图片&语音验证码
   1. 细化完善
4. **根据浏览器环境判断访问风险**
5. 后端模型似乎还有一点问题(基本上都是fail)
6. ~~完善判断逻辑~~

### 踩坑记录

1. js里对于对象的遍历不是顺序的
2. 事件冒泡问题
3. 记得给每个element加key
4. 使用useReducer代替useState