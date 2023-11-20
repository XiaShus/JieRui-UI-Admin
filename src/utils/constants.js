/**
 * Created by 芋道源码
 *
 * 枚举类
 */
import {beginOfDay, endOfDay} from "@/utils/dateUtils";

export const datePickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      const end = new Date();
      picker.$emit('pick', [beginOfDay(start), endOfDay(end)]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const end = new Date();
      picker.$emit('pick', [beginOfDay(start), endOfDay(end)]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      const end = new Date();
      picker.$emit('pick', [beginOfDay(start), endOfDay(end)]);
    }
  }]
}

// ========== 静态变量 ==========

/**
 * 全局通用状态枚举
 */
export const CommonStatusEnum = {
  ENABLE: 0, // 开启
  DISABLE: 1 // 禁用
}

/**
 * 菜单的类型枚举
 */
export const SystemMenuTypeEnum = {
  DIR: 1, // 目录
  MENU: 2, // 菜单
  BUTTON: 3 // 按钮
}

/**
 * 角色的类型枚举
 */
export const SystemRoleTypeEnum = {
  SYSTEM: 1, // 内置角色
  CUSTOM: 2 // 自定义角色
}

/**
 * 数据权限的范围枚举
 */
export const SystemDataScopeEnum = {
  ALL: 1, // 全部数据权限
  DEPT_CUSTOM: 2, // 指定部门数据权限
  DEPT_ONLY: 3, // 部门数据权限
  DEPT_AND_CHILD: 4, // 部门及以下数据权限
  DEPT_SELF: 5 // 仅本人数据权限
}

/**
 * 代码生成模板类型
 */
export const InfraCodegenTemplateTypeEnum = {
  CRUD: 1, // 基础 CRUD
  TREE: 2, // 树形 CRUD
  SUB: 3, // 主子表 CRUD
}

/**
 * 任务状态的枚举
 */
export const InfraJobStatusEnum = {
  INIT: 0, // 初始化中
  NORMAL: 1, // 运行中
  STOP: 2, // 暂停运行
}

/**
 * API 异常数据的处理状态
 */
export const InfraApiErrorLogProcessStatusEnum = {
  INIT: 0, // 未处理
  DONE: 1, // 已处理
  IGNORE: 2, // 已忽略
}

/**
 * 用户的社交平台的类型枚举
 */
export const SystemUserSocialTypeEnum = {
  DINGTALK: {
    title: "钉钉",
    type: 20,
    source: "dingtalk",
    img: "https://s1.ax1x.com/2022/05/22/OzMDRs.png",
  },
  WECHAT_ENTERPRISE: {
    title: "企业微信",
    type: 30,
    source: "wechat_enterprise",
    img: "https://s1.ax1x.com/2022/05/22/OzMrzn.png",
  }
}
