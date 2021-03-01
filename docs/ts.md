---
id: ts
title: TypeSceipt
sidebar_label: TypeSceipt
---

## 前言

为啥用 Ts?

[TypeScript](https://www.tslang.cn/docs/handbook/advanced-types.html)（下文统称 TS）是 JavaScript 的超级，提供可选的静态类型系统，类和接口等。可对值所具有的结构进行静态类型检查。

优点:

约束编码，规避 bug,更好注释，更高效的开发（IDE 功能），并且 相关框架,三方都已实现对 Ts 的支持。

## 数据类型

boolean, number, string, null, undefined, symbol, any, void, never, enum, tuple, Array\<\string\>\/string[], object

1.  基础 es 数据类型：boolean number string null undefined symbol
    注意：null 和 undefined 是其它类型（包括 void）的子类型，可以赋值给其它类型（ tsconfig.json 需要放开相关配置 "strict": true, ）

2.  新增数据类型：any void never enum tuple  
    any： 任意类型，不指定, 可是任何类型的值，并访问任何属性方法（声明未赋值，未声明类型默认为 any）

    void： 空类型的变量，只能赋予 undefined 和 null 一般定义函数返回值

    never：没有值的类型 （是抛出异常(error(message: string): never )，死循环 ture ==== fales）switch default 里面定义

    enum：枚举（可修改 index,非字符串枚举不可双向映射，）

        enum _ENUM {
            星期1,
            星期2,
            星期3,
            星期4,
        }

    tuple：元组(与数组相比，类型与长度固定，不可越界)

        let tuple:[number,string]

3.  复杂数据类型：Array\<\string>/string[],object

## 变量类型

- 一般数据类型 （number string...）

  一般数据包括对基础变量的定义。

  let name:string = '';

- 联合（满足其中一个）/交叉数据类型（两者都包含 一般对对象联合） （| & ）

       let name:string | underfind = '';
       let name:string | number = 3;(typeof进行区分，或访问共同属性方法)

         function fun(name: string | number ) :void{
         if(typeof name === 'string'){
           console.log(name.length)
         }else{
           console.log(name.toFixed(2))
         }
         let d2 = (name as string).charAt(0)
       }

## 接口

- 复杂数据类型 （interface type）
  接口：行为的抽象,对类部分行为抽象，描述对象结构。（一般接口前加 I 的前缀）
  普通接口

          interface IInterface{
              name:string
              getName : (id:number) => string
          }
      函数接口

           interface IInterface{
              (price:number):number
          }

      别名

          type Add = (x: number, y: number) => number
          let add: Add = (a: number, b: number) => a + b

  注： interface 与 type 区别
  类型别名 type
  interface 可以接口合并，
  type 可以声明基本类型别名，联合类型，元组

## 对象 数组类型定义

###数组：Array\<\string>/string[]

        let arry:number[] = [1,2,3]
        let Array<string> = ['q','e']
        或者使用接口描述
        interface NumberArray {
            [index: number]: number;
        }
        类数组
        interface IArguments {
            [index: number]: any;
            length: number;
            callee: Function;
        }
    注：与元祖(tuple)区分

###对象：interface

        interface IObject {
          name:string,
          old?:number,
          readonly sex:boolen
        }

注： 可选？ 只读 readonly（只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候） 类型别名 as

## 函数

###函数声明：
function fun(something:string|number):number{
return data  
 }

###函数表达式（类型推断）
const fun= function(data: string)：void {}

###函数表达式
Let addFun: (x: number, y: number) => number
= function (x: number, y: number): number
{
return x + y;
};

###箭头函数
const fun= (data: string):void => {}

###接口定义方法
interface Fun {
(source: string, subString: string): boolean;
}
注：结合 ?(可选参数，放最后面), <-参数默认赋值,... 剩余参数，函数重载

    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return   Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }

## 类

定义了一件事物的抽象特点，包含它的属性和方法，而对象（Object）：是类的实例，通过 new 生成（面向对象（OOP）的三大特性：封装、继承、多态）

    class Person{
        name:string;
        getName():void{
           console.log(this.name);
        }
    }
    let p1 = new Person();
    p1.name = 'aaa';
    p1.getName();
    注：结合readonly ？ extend等

## 类型断言

    const data = 1(自动判断为number)
    data = false;(错误)
    也可以将一个联合类型的变量，指定为一个更加具体的类型
      function fun(name: string | number ) :void{
      let d2 = (name as string).charAt(0)
      let d2 = (<string>name).charAt(0)(tsx无效)
    }

不能将联合类型断言为不存在的类型

    作用：

        联合类型可以被断言为其中一个类型
        父类可以被断言为子类
        任何类型都可以被断言为 any
        any 可以被断言为任何类型
        要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可

## 泛型

泛型（传入的类型与返回的类型相同的情况下）通过外部\<\T>定义明确的类型对内部进行约束

    function Fun(arg: number): number {
        return arg;
    }

### 定义函数

    function Fun<T>(arg: T): T {
        return arg;
    }
    使用：
    let output = Fun<string>("myString")
    let output = Fun("myString");(类型断言)

### 定义接口

    interface IInterface {
        <T>(arg: T): T;
    }
    使用：
    let myInterface: IInterface = Fun;

    升级
    interface IInterface<U> {
        <U>(arg: U): U;
    }

### 定义类

    未完待续

## 继承 extends

    接口，类可以通过extends实现继承

## 命名空间 模块声明

1.  namespace （局部定义）

定义

            // utils.ts
            namespace Utils {
                export interface IPerson {
                    name: string;
                    age: number;
                }
            }

使用三斜线指令

        /// <reference path="utils.ts" />
        const me: Utils.IPerson = {
            name: 'funlee',
            age: 18
        }

或者：

        import './const me: Utils.IPerson = {
            name: 'funlee',
            age: 18
        }

2.  modul declare
    declaration.d.ts 里面声明外部引入的模块，变量，方法类型等等(d.ts 文件)

         declare module 'js-cookie';

注：

1.  Omit（Omit\<User, 'token'>）提出不需要
2.  import \* as React from 'react' 和 import React from 'react'
    ...

## TS 与 react hoos 结合

props 的定义
state 的定义
方法定义
组件属性
具体的类型查找 （React.xxx,antd/lib 下引入）

未完待续

eg:

      // useEffect(() => {
      //   //定义魔法值
      //   enum _ENUM {
      //     星期1,
      //     星期2,
      //     星期3,
      //     星期4,
      //   }
      //   //正常的映射
      //   console.log(_ENUM.星期1)
      //   console.log(_ENUM[0])

      //   enum _ENUM2 {
      //     星期1,
      //     星期2 = 5,
      //     星期3,
      //     星期4,
      //   }
      //   console.log(_ENUM2.星期3)
      //   console.log(_ENUM2.星期2)
      //   console.log(_ENUM[1])
      //   console.log(_ENUM[2])
      //   enum _ENUM3 {
      //     星期1 = '1',
      //     星期2 = '2',
      //     星期3 = '3',
      //     星期4 = '4',
      //   }
      //   console.log(_ENUM3.星期3)
      //   console.log(_ENUM2['2'])
      // }, [])
      // useEffect(() => {
      //   let tuple: [string, number]
      //   tuple = ['Xcat Liu', 25]
      //   tuple.push(false)
      // }, [])
      // useEffect(() => {
      //   function fun(name: string | number ) :void{
      //     if(typeof name === 'string'){
      //       console.log(name.length)
      //     }else{
      //       console.log(name.toFixed(2))
      //     }
      //     let d2 = (name as string).charAt(0)
      //   }

      // })
      // useEffect(() => {
      //   let data = 1
      //   data = false
      // }, [])
      // function identity<T>(arg: T): T {
      //   return arg
      // }
      // let output = identity<string>('myString')
      // let output2 = identity('myString')
