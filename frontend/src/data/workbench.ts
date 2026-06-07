import type { FeatureItem, KpiItem, OperationRecord, BlacklistUser } from "../types";

export const localBlacklist: BlacklistUser[] = [
  {
    "id": "blacklist-1",
    "userName": "张伟",
    "userId": "U10001",
    "violationCount": 3,
    "banTime": "2026-06-01 14:30",
    "unbanTime": "2026-06-15 14:30",
    "status": "banned",
    "reason": "预约后未签到"
  },
  {
    "id": "blacklist-2",
    "userName": "李娜",
    "userId": "U10023",
    "violationCount": 5,
    "banTime": "2026-05-20 09:15",
    "unbanTime": "2026-07-20 09:15",
    "status": "banned",
    "reason": "多次提前离场"
  },
  {
    "id": "blacklist-3",
    "userName": "王芳",
    "userId": "U10045",
    "violationCount": 2,
    "banTime": "2026-06-05 16:45",
    "unbanTime": "2026-06-12 16:45",
    "status": "banned",
    "reason": "损坏设施"
  },
  {
    "id": "blacklist-4",
    "userName": "刘强",
    "userId": "U10067",
    "violationCount": 8,
    "banTime": "2026-04-10 11:00",
    "unbanTime": "永久",
    "status": "permanent",
    "reason": "严重违规屡教不改"
  }
];

export const localFeatures: FeatureItem[] = [
  {
    "id": 1,
    "title": "座位热力图可视化",
    "description": "以楼层平面图形式展示所有座位状态（空闲/已约/使用中/不可用），支持按区域（静音区/讨论区/窗景区）筛选，点击座位查看详情。",
    "status": "已上线",
    "metric": "88%"
  },
  {
    "id": 2,
    "title": "按小时预约与选座",
    "description": "用户选择日期和时段（最小单位1小时），在座位图上点选心仪座位，系统自动检测时段冲突，预约成功后生成二维码。",
    "status": "排期中",
    "metric": "31 单"
  },
  {
    "id": 3,
    "title": "学习时长排行与成就徽章",
    "description": "记录用户累计学习时长，生成日/周/月排行榜，设置成就徽章（如连续7天打卡、学习100小时），增强学习动力。",
    "status": "巡检中",
    "metric": "10 项"
  },
  {
    "id": 4,
    "title": "静音区/讨论区分区管理",
    "description": "将自习室划分为静音区和讨论区，不同区域适用不同规则（静音区禁止交谈），预约时明确标注区域类型。",
    "status": "优化中",
    "metric": "4 级"
  },
  {
    "id": 5,
    "title": "违约黑名单与公告",
    "description": "用户预约后未签到或提前离场超过一定次数记入黑名单，限制预约权限；管理员可发布系统公告和活动通知，首页轮播展示。",
    "status": "可导出",
    "metric": "28 条"
  }
];

export const localKpis: KpiItem[] = [
  {
    "label": "今日处理",
    "value": "108",
    "trend": "+12%",
    "tone": "primary"
  },
  {
    "label": "预约/订单",
    "value": "46",
    "trend": "+8%",
    "tone": "warm"
  },
  {
    "label": "履约率",
    "value": "90%",
    "trend": "+3%",
    "tone": "cool"
  },
  {
    "label": "待处理",
    "value": "5",
    "trend": "需跟进",
    "tone": "neutral"
  }
];

export const operationRecords: OperationRecord[] = [
  {
    "key": "ldstudyroom-1",
    "name": "座位热力图可视化",
    "owner": "运营组",
    "status": "已上线",
    "metric": "88%",
    "priority": "高"
  },
  {
    "key": "ldstudyroom-2",
    "name": "按小时预约与选座",
    "owner": "管理员",
    "status": "排期中",
    "metric": "31 单",
    "priority": "中"
  },
  {
    "key": "ldstudyroom-3",
    "name": "学习时长排行与成就徽章",
    "owner": "服务台",
    "status": "巡检中",
    "metric": "10 项",
    "priority": "低"
  },
  {
    "key": "ldstudyroom-4",
    "name": "静音区/讨论区分区管理",
    "owner": "财务组",
    "status": "优化中",
    "metric": "4 级",
    "priority": "高"
  },
  {
    "key": "ldstudyroom-5",
    "name": "违约黑名单与公告",
    "owner": "审核组",
    "status": "可导出",
    "metric": "28 条",
    "priority": "中"
  }
];
