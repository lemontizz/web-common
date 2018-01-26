# EVM-web
======================================

> A Vue.js project

Build Setup
======================================

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9004
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



文件及文件夹命名规范
======================================

文件夹及文件都采用驼峰式
--------------------------------------
例如：floatIp

文件夹内部文件划分
--------------------------------------

> 层级关系很重要，请将层级关系展现在文件位置上

例如：
    floatIp(folder)
        → list
            → main.vue
            → dialog
                → bind.vue
                → unbind.vue
        → detail (folder)
            → main.vue
            → dialog


### HTML内容说明
    仅允许使用小写标签



### CSS文件说明

> 所有全局css/svg/image都放在styles文件夹中

#### images
    仅仅放image文件

#### svg
    仅仅放svg文件

#### btn.scss
    全局btn的css样式

#### frame.scss
    框架css样式：menu/header/cont-container

#### modal.scss
    默认弹层css样式

#### common.scss
    cont组件相关样式



JS文件说明
--------------------------------------

> src/scripts

#### config.js

    isDev: '${isDev}',
    rootPath: '${rootPath}',

    在webpack打包之前编译了isDev/rootPath信息
    项目每个ajax请求都由rootPath + '/xxxx'，是为了后端cros替换ip时使用

#### request.js
    封装了ajax请求

#### storage.js
    封装了获取localStorage方法

#### taskMessage.js
    封装了任务列表内容显示方法

> 此文件与vuex/common.js/ADD_TASK及socketIo一起使用

#### utils.js
    封装了项目中公共的小工具方法




#### 文本缩进：一次缩进四个空格，也就是一个Tab

> HTML

<code>
    <ul>
        <li>EVM</li>
        <li>xView</li>
        <li>
            <a href="#">XOS</a>
        </li>
    </ul>
</code>


> CSS

<code>
    .page-menu {
        .menu-icon {
            color: #fff;
        }
        .menu-text {
            color: #ddd;
        }
    }
</code>

> JS

<code>
    var VM = new Vue({
        data() {
            return {};
        }
    });
</code>



CSS规范
======================================
### 不允许出现4级以上嵌套，会导致遇到需要覆盖此css的业务时，需要写n层嵌套

### 非公共文件不允许出现!important

### 本项目采用OOCSS模式命名
<code>

</code>



JS规范
======================================

#### ！！！！！本项目支持ES6/ES2017语法，请不要在本项目中使用ES5语法！！！！！
    ES6语法参考：[ES6-阮一峰](http://es6.ruanyifeng.com/)







For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
