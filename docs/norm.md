---
id: norm
title: 前端规范
sidebar_label: 前端规范
---

## 前言

为提升项目组前端开发效率，提升项目的可维护性，提升项目的稳定性、健壮性，降低项目代码的耦合性，基于目前的前端开发模式，现制定《项目组前端规范文档（草案）》。该文档主要围绕目前存在的前端项目编撰，涵盖但不限于组件编写、插件开发、插件使用、项目结构、命名规范、模块结构、数据结构、class 使用、Hooks 使用、语法等规范

借鉴 [airbnb](https://github.com/airbnb/javascript),[Airbnb 中文](https://github.com/BingKui/javascript-zh)，

## 文件命名

1.  目录小写（英文命名,多英文-连接，语义化）
2.  tsx 文件大驼峰 或者 components 文件下文件目录/小驼峰+index.tsx
3.  函数，变量小驼峰，类大驼峰
4.  常量大写, \_ 拼接
5.  等等

## 函数命名（动词+名词 区分单复数 小驼峰命名）

    get 获取/set 设置,
    add 增加/remove 删除
    create 创建/destory 移除
    start 启动/stop 停止
    open 打开/close 关闭,
    read 读取/write 写入
    load 载入/save 保存,
    create 创建/destroy 销毁
    begin 开始/end 结束,
    backup 备份/restore 恢复
    import 导入/export 导出,
    split 分割/merge 合并
    inject 注入/extract 提取,
    attach 附着/detach 脱离
    bind 绑定/separate 分离,
    view 查看/browse 浏览
    edit 编辑/modify 修改,
    select 选取/mark 标记
    copy 复制/paste 粘贴,
    undo 撤销/redo 重做
    insert 插入/delete 移除,
    add 加入/append 添加
    clean 清理/clear 清除,
    index 索引/sort 排序
    find 查找/search 搜索,
    increase 增加/decrease 减少
    play 播放/pause 暂停,
    launch 启动/run 运行
    compile 编译/execute 执行,
    debug 调试/trace 跟踪
    observe 观察/listen 监听,
    build 构建/publish 发布
    input 输入/output 输出,
    encode 编码/decode 解码
    encrypt 加密/decrypt 解密,
    compress 压缩/decompress 解压缩
    pack 打包/unpack 解包,
    parse 解析/emit 生成
    connect 连接/disconnect 断开,
    send 发送/receive 接收
    download 下载/upload 上传,
    refresh 刷新/synchronize 同步
    update 更新/revert 复原,
    lock 锁定/unlock 解锁
    check out 签出/check in 签入,
    submit 提交/commit 交付
    push 推/pull 拉,
    expand 展开/collapse 折叠
    begin 起始/end 结束,
    start 开始/finish 完成
    enter 进入/exit 退出,
    abort 放弃/quit 离开
    obsolete 废弃/depreciate 废旧,
    collect 收集/aggregate 聚集

## 语法：es6 + H5 语义化标签

## ts

1. 避免 anyScript，类型具体化
2. 禁止随意进行类型的 export
3. 类型加上属性

   interface StateType {
   number: number;
   }

   enum StatusEnum {
   Failed,
   Loading,
   Success,
   }

## css: style modul 结合 BEM

    BEM（block__element--modifier 多单词-连接）

    例如：

    import style from './ReactUse.less'
    className={style['root__div--x']}
    style.root__div

样式统一：

通过引入全局样式文件，使用全局变量进行设置

    @import '~antd/es/style/themes/default.less';
    .TabsNmg-gray {
        border: 1px solid #fff;
        min-height: 300px;
        box-shadow: 1px 1px 1px #fff;
    }
    或者自定义变量 引入：

    @import '~@/global.less';

弹性布局：
px em rem % vh vw vm(可视窗口的宽度或高度中较小的那个)

    浏览器宽度1200px, 1 vw = 1200px/100 = 12 px。

## 注释（jsDoc）

    语义化命名 结合 必要的注释（文件（文件头注释（File Header相关插件）说明），函数等）

使用 JSDoc 注释规范。
JSDoc 是一个根据 JavaScript 文件中注释信息，生成 JavaScript 应用程序或模块的 API 文档的工具。用于导出 API 文档和明确代码类型，辅助代码提示。

注：去除不需要的注释代码

### JSDoc 格式

    /*
    **一段简单的 JSDoc 注释。
    */

例如：

        /**
        * 去除对象属性为[]的属性
        *@param obj 待处理对象
        *@returns newobj
        */
        export const filterObj = (obj: Object) => {
                Object.keys(obj).map((key: string) => {
                if (obj[key] === []) {
                obj[key] = undefined
                }
        })
        return obj
        }

### JSDoc 标签

- @constructor 构造函数声明注释
- @param 参数注释
- @return 返回值注释
- @description 描述变量或者函数的描述信息
- @example 示例内容
- @extends {Type} 用于标识继承于某个类型
- @property 描述一个对象的属性
- @type {IDString} 定义某个变量的类型
- 特殊类型 EventString ImageURIString ClassString 等

## 遵循 dva 与 umi 的开发模式

## 代码格式化 prettierrc

    下载安装编辑器Prettier插件

## svn commit 规范：

commit 前必须先 updata，并进行修改内容的检查

### 模板：

        type(file):text
        例如：
        feat(index.js):新增注册功能

    	type:
    	feat：新增功能（feature）
    	fix：修补bug
    	docs：仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
    	style： 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
    	refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    	test：增加测试，包括单元测试、集成测试等
    	chore：构建过程或辅助工具的变动
    	type：代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。
    	perf: 优化相关，比如提升性能、体验
    	revert: 回滚到上一个版本
    	ci：自动化流程配置修改

## 通用语法规范

- 对于只读变量用(如 props,state 的相关变量)，常量使用 const 定义，其它变量使用 let 定义

        const pi = 3.14; const { name } =props; const [data,setData] = useState()…
        let str = '';

- 对于多次使用的对象属性，使用解构赋值对象属性
  const { history } = this.props;
- 使用深拷贝对象
  使用 loash 的 cloneDeep 函数

- 避免直接修改依赖对象的属性，应重新拷贝一份数据使用

- 声明变量按照类型初始化

        const str = '';
        let num = 0;
        let bool = false;
        使用 === 代替 ==
        const foo = null;
        const bar = undefined;
        if (foo === bar) {
        // do sth
        }

## 拆分组件原则

\*　状态组件无渲染，渲染组件无状态。

    1.  尽量将状态全部放在外层组件，子组件使用 props 渲染 dom，这样可以很大程度避免状态逻辑混乱。
    2.  组件嵌套最多不超过三层，如果有超过三层的组件嵌套，请尝试优化拆分逻辑或使用路由渲染。

## svn 开发流程

    • 以迭代为单位从 master 拉取新分支，开发完毕后合并到 test 测试。
    • 测试通过后提交合并请求到 master。
    • 线上 BUG 从 master 拉取新分支解决，合并到 test 分支测试，然后走上述流程。
    • 紧急 BUG 如果影响流程则拉取新分支修改后直接合并到 master 上线，然后再从 master 合并到 test 回归。

## 插件规范

1. 删除无用插件引入
