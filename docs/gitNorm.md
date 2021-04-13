---
id: gitNorm
title: git规范
sidebar_label: git规范
---

## commit 提交信息规范

    模板：
    type():text
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
