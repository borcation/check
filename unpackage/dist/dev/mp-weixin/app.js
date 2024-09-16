"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/check/check.js";
  "./pages/target/target.js";
  "./pages/me/me.js";
  "./pages/award/award.js";
  "./pages/log/log.js";
  "./pages/set/set.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
    console.log("checkForUpdate");
    var lastResetTimestamp = common_vendor.index.getStorageSync("lastResetTimestamp");
    if (!lastResetTimestamp) {
      common_vendor.index.setStorageSync("lastResetTimestamp", (/* @__PURE__ */ new Date()).toLocaleString());
      lastResetTimestamp = common_vendor.index.getStorageSync("lastResetTimestamp");
      console.log("第一次启动，将当前时间作为重置时间");
      common_vendor.index.setStorageSync("userInfo", this.globalData.userInfo);
      console.log("第一次启动，储存初始用户信息");
    }
    console.log(lastResetTimestamp);
    this.resetDataIfNeeded(lastResetTimestamp, (/* @__PURE__ */ new Date()).toLocaleString());
    this.load_userinfo();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    load_userinfo() {
      this.globalData.userInfo = common_vendor.index.getStorageSync("userInfo");
    },
    async log_upload(type, event) {
      const LM = common_vendor.Vs.importObject("log_manager");
      let log_timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      let data = this.globalData.userInfo.data;
      const res = await LM.log_add(log_timestamp, type, event, data);
      console.log(res);
      common_vendor.index.setStorageSync("userInfo", this.globalData.userInfo);
    },
    async resetDaylyData() {
      console.log("每日数据重置");
      this.globalData.userInfo.data.key_data.score.num_day = 0;
      this.globalData.userInfo.data.key_data.flower.num_day = 0;
      this.globalData.userInfo.data.key_data.diamond.num_day = 0;
      this.globalData.userInfo.data.regular_target_list.forEach((item) => {
        item.target_checked = false;
      });
      this.globalData.userInfo.data.day_target_list.forEach((item) => {
        item.target_checked = false;
        item.target_now = 0;
      });
      await this.log_upload("system", "每日数据重置");
    },
    async resetWeeklyData() {
      console.log("每周数据重置");
      this.globalData.userInfo.data.key_data.score.num_week = 0;
      this.globalData.userInfo.data.key_data.flower.num_week = 0;
      this.globalData.userInfo.data.key_data.diamond.num_week = 0;
      this.globalData.userInfo.data.regular_target_list.forEach((item) => {
        item.target_week.target_checked = false;
        item.target_week.score_now = 0;
      });
      this.globalData.userInfo.data.week_target_list.forEach((item) => {
        item.target_checked = false;
        item.target_now = 0;
      });
      await this.log_upload("system", "每周数据重置");
    },
    getResetPoint(date, isWeekly) {
      const resetDate = new Date(date);
      resetDate.setHours(18, 10, 20, 0);
      if (isWeekly) {
        const day = resetDate.getDay();
        const diff = (day + 6) % 7;
        resetDate.setDate(resetDate.getDate() - diff);
      }
      return resetDate;
    },
    async resetDataIfNeeded(lastResetTimestamp, now) {
      console.log("lastResetTimestamp:", lastResetTimestamp);
      console.log("now:", now);
      const lastResetDate = new Date(lastResetTimestamp);
      const nowDate = new Date(now);
      const dailyResetPoint = this.getResetPoint(nowDate, false);
      const weeklyResetPoint = this.getResetPoint(nowDate, true);
      console.log("dailyResetPoint:", dailyResetPoint);
      console.log("weeklyResetPoint:", weeklyResetPoint);
      let needDailyReset = false;
      let needWeeklyReset = false;
      if (lastResetDate < dailyResetPoint && nowDate >= dailyResetPoint) {
        needDailyReset = true;
      }
      if (lastResetDate < weeklyResetPoint && nowDate >= weeklyResetPoint) {
        needWeeklyReset = true;
      }
      if (needDailyReset || needWeeklyReset) {
        if (needDailyReset) {
          await this.resetDaylyData();
          console.log("数据已每日重置");
        }
        if (needWeeklyReset) {
          await this.resetWeeklyData();
          console.log("数据已每周重置");
        }
        common_vendor.index.setStorageSync("lastResetTimestamp", now);
      } else {
        console.log("数据不需要重置");
      }
    }
  },
  globalData: {
    update_flag: false,
    userInfo: {
      user_id: 0,
      user_name: "玉儿宝贝",
      user_avatar: "https://mp-324f3402-0d4f-4186-9711-38d0cd552848.cdn.bspapp.com/logo.png",
      data: {
        key_data: {
          score: {
            name: "积分",
            num_all: 0,
            num_day: 0,
            num_week: 0
          },
          flower: {
            name: "花花",
            num_all: 5,
            num_day: 0,
            num_week: 0
          },
          diamond: {
            name: "钻石",
            num_all: 1,
            num_day: 0,
            num_week: 0
          }
        },
        regular_target_list: [
          {
            target_id: 0,
            target_name: "☀️早起",
            target_description: "今天你几点起床的呀？",
            target_score_list: ["九点后", "九点", "八点半", "八点", "七点半"],
            target_checked: false,
            target_week: {
              description: "每周早起达到20分",
              score_request: 20,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          },
          {
            target_id: 1,
            target_name: "📚学习",
            target_description: "你今天学习了多久？",
            target_score_list: ["0h", "1-2h", "3-4h", "5-6h", "7-8h", ">8h"],
            target_checked: false,
            target_week: {
              description: "每周学习达到20分",
              score_request: 20,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          },
          {
            target_id: 2,
            target_name: "🌙早睡",
            target_description: "你昨晚什么时候入睡的呢？",
            target_score_list: ["熬夜失眠", "十二点半", "十二点", "十一点半", "十一点"],
            target_checked: false,
            target_week: {
              description: "每周早睡达到20分",
              score_request: 20,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          },
          {
            target_id: 3,
            target_name: "🎮娱乐",
            target_description: "你今天玩了多久手机?",
            target_score_list: ["超过3小时", "3小时", "2小时", "1小时", "半小时"],
            target_checked: false,
            target_week: {
              description: "每周娱乐达到20分",
              score_request: 20,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          },
          {
            target_id: 4,
            target_name: "🏋️‍♂️锻炼",
            target_description: "你今天运动了吗？",
            target_score_list: ["没锻炼", "1h", "2h", "3h", "4h"],
            target_checked: false,
            target_week: {
              description: "每周锻炼积8分",
              score_request: 8,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          },
          {
            target_id: 5,
            target_name: "🥰情绪",
            target_description: "你今天心情怎么样呀？",
            target_score_list: ["心情烦闷", "略显疲惫", "无风无浪", "小小喜悦", "干劲十足"],
            target_checked: false,
            target_week: {
              description: "每周情绪达到20分",
              score_request: 20,
              score_now: 0,
              award: {
                item: "flower",
                number: 1
              },
              target_checked: false
            }
          }
        ],
        day_target_list: [{
          target_id: 0,
          target_description: "每日达到20分",
          target_watch: "score.num_day",
          target_reqeust: 20,
          target_now: 0,
          award: {
            item: "flower",
            number: 1
          },
          target_checked: false
        }],
        week_target_list: [{
          target_id: 0,
          target_description: "每周拿到10个花花",
          target_watch: "flower.num_week",
          target_reqeust: 10,
          target_now: 0,
          award: {
            item: "diamond",
            number: 1
          },
          target_checked: false
        }]
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
