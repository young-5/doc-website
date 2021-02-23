---
id: norm
title: 前端规范
sidebar_label: 前端规范
---

## 前言

为提升项目组前端开发效率，提升项目的可维护性，提升项目的稳定性、健壮性，降低项目代码的耦合性，基于目前的前端开发模式，现制定《项目组前端规范文档（草案）》。该文档主要围绕目前存在的前端项目编撰，涵盖但不限于组件编写、插件开发、插件使用、项目结构、模块结构、数据结构、class 使用、Hooks 使用、语法等规范。
命名规范

## 文件命名

1. 项目目录文件命名 一般用小写 多个单词则用 - 链接（单词数量不超过 3 个）
   Eg: body/body-form

2. 项目业务组件 用小驼峰
   Eg: body/body-form

3. 组件文件：
   当文件是一个 tsx 文件：用大驼峰命名
   Eg: SellModal

当文件夹下面是 index.tsx 文件 ：文件夹大驼峰
Eg: FormTableList/index.tsx

## 项目结构

1. constant 用于存变量
2. config 用于存配置
3. server 用于接口定义
4. model 用于局部状态的定义

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
  使用===代替==
  const foo = null;
  const bar = undefined;
  if (foo === bar) {
  // do sth
  }

### React（antd pro）项目语法规范

- 避免直接修改 props
  React 是单向数据流模式，props 由父组件传向子组件，子组件应当避免直接修改 props，直接修改 props 会产生意想不到的 BUG。

          错误的写法：
          const { detail } = this.props; // detail 是依赖于 props 的对象
          detail.visible = false;

          建议的写法：
          const { dispatch } = this.props;
          const payload = { ...this.props.detail };
          payload.visible = false;
          // 假定该 props 来自 redux，如果是直接从父组件传入，可以使用回调的方式修改
          dispatch({
          type: 'update',
          payload,
          })
          React 事件绑定 this
          在构造器中绑定：
          constructor(props) {
          super(props);
          this.myEvent.bind(this);
          }

- 在 JSX 中使用箭头函数：

       <button onClick={e => this.myEvent(e)}>click</button>
       直接使用箭头函数：
       myEvent = e => {
       // do sth
       }

       <button onClick={this.myEvent}>click</button>
       避免直接修改 props sytate
       this.setState({
       visible: false,
       })
       需要在依赖更新后的操作放到 this.setState 的回调，或者使用 hook 监听依赖变化
       setVisible(false);
       useEffect(() => {
       if (!visible) {
       // do sth
       }
       }, [visible]) // 只有在 visible 变化才会触发

- 使用定时器后要在页面卸载时清除

        函数组件中：
                useEffect(() => {
                return function() {
                if (timer) {
                clearTimeout(timer);
                clearInterval(timer);
                }
                }
                }, [])

        或者任何在页面销毁时需要的操作都在这里实现，useEffect 中 return 的 function 就类似于 componentWillUnmount 的作用。

- 列表组件一定要定义唯一确定 key

        <select>
        {
        list.map(item => (

        <option key={item.id}>{item.name}</option> // item.id 是唯一不便的
        ))
        }
        </select>

        注意：尽量减少用 index 做 key

- 页面 loading 效果要及时清除

        错误的写法：
        this.setState({
        loading: true,
        })
        getList().then(res => {
        ...
        this.setState({
        loading: false,
        })
        })

        建议的写法：
        this.setState({
        loading: true,
        })
        getList().then(res => {
        ...
        this.setState({
        loading: false,
        })
        }).catch(err => {
        // 异常的时候也要清除掉 loading
        this.setState({
        loading: false,
        })
        })

- 这些地方要禁用副作用操作
  render：
  render() {
  ...
  this.setState({
  visible: true,
  })
  ...
  }
  componentDidUpdate:
  componentDidUpdate() {
  ...
  this.setState({
  visible: true,
  })
  ...
  }
  componentWillUnmount:
  componentWillUnmount() {
  ...
  this.setState({
  visible: true,
  })
  ...
  }

- 函数组件中：

        function Modal() {
        ...
        setVisible(true);
        useEffect(() => {
        setVisible(true);
        }, [])
        ...
        }

        以上都是错误的操作

## 拆分组件原则

\*　状态组件无渲染，渲染组件无状态。

    1.  尽量将状态全部放在外层组件，子组件使用 props 渲染 dom，这样可以很大程度避免状态逻辑混乱。
    2.  组件嵌套最多不超过三层，如果有超过三层的组件嵌套，请尝试优化拆分逻辑或使用路由渲染。

## svn 开发流程

    • 以迭代为单位从 master 拉取新分支，开发完毕后合并到 test 测试。
    • 测试通过后提交合并请求到 master。
    • 线上 BUG 从 master 拉取新分支解决，合并到 test 分支测试，然后走上述流程。
    • 紧急 BUG 如果影响流程则拉取新分支修改后直接合并到 master 上线，然后再从 master 合并到 test 回归。
