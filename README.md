## srtp 前后端部分

> 基于浏览器指纹以及鼠标轨迹识别的无感知验证码

### 运行

1. git clone
2. npm install
3. npm run dev

![20230325203931](https://typora-1309407228.cos.ap-shanghai.myqcloud.com/20230325203931.png)

### 更新日志

3.25
1. 鼠标轨迹&时间戳捕捉
2. 浏览器指纹生成
3. 后端逻辑代码
   1. 高频请求ban
   2. 执行本地python模型

### TODO

1. 自定义浏览器指纹
2. 接入后端python模型
3. 图片&语音验证码