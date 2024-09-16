"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      signList: [{
        date: "2023-06-25",
        title: "生日",
        info: "张三生日"
      }],
      week_list: [],
      regular_target_list: [],
      day_target_list: [],
      week_target_list: []
    };
  },
  onLoad() {
  },
  mounted() {
  },
  onShow() {
    console.log("target onShow");
    this.update_data();
  },
  methods: {
    dayChange(dayInfo) {
      console.log("点击日期", JSON.parse(JSON.stringify(dayInfo)));
    },
    monthChange(monthInfo) {
      console.log("切换月份", JSON.parse(JSON.stringify(monthInfo)));
    },
    shrinkClick(type) {
      console.log("当前状态", type);
    },
    addSign() {
      let addList = [
        {
          date: "2023-06-28",
          title: "休息"
        },
        {
          date: "2023-06-01",
          title: "上班"
        }
      ];
      this.$refs.calendar.addSignList(addList);
    },
    deleteSign() {
      let deleteList = [{
        date: "2023-06-01",
        title: "上班"
      }];
      this.$refs.calendar.deleteSignList(deleteList);
    },
    update_data() {
      this.regular_target_list = getApp().globalData.userInfo.data.regular_target_list;
      this.day_target_list = getApp().globalData.userInfo.data.day_target_list;
      this.week_target_list = getApp().globalData.userInfo.data.week_target_list;
      this.week_list = [];
      var regular_target_list = this.regular_target_list;
      var day_target_list = this.day_target_list;
      var week_target_list = this.week_target_list;
      for (var i = 0; i < day_target_list.length; i++) {
        var item = day_target_list[i];
        var week_item = {};
        week_item.week_id = item.target_id + 100;
        week_item.description = item.target_description;
        week_item.score_request = item.target_reqeust;
        week_item.score_now = item.target_now;
        week_item.award_item = item.award.item;
        week_item.target_checked = item.target_checked;
        week_item.percent = 100 * week_item.score_now / week_item.score_request;
        this.week_list.push(week_item);
      }
      for (var i = 0; i < regular_target_list.length; i++) {
        var item = regular_target_list[i];
        var week_item = {};
        week_item.week_id = item.target_id;
        week_item.description = item.target_week.description;
        week_item.score_request = item.target_week.score_request;
        week_item.score_now = item.target_week.score_now;
        week_item.award_item = item.target_week.award.item;
        week_item.target_checked = item.target_week.target_checked;
        week_item.percent = 100 * week_item.score_now / week_item.score_request;
        this.week_list.push(week_item);
      }
      for (var i = 0; i < week_target_list.length; i++) {
        var item = week_target_list[i];
        var week_item = {};
        week_item.week_id = item.target_id + 1e3;
        week_item.description = item.target_description;
        week_item.score_request = item.target_reqeust;
        week_item.score_now = item.target_now;
        week_item.award_item = item.award.item;
        week_item.target_checked = item.target_checked;
        week_item.percent = 100 * week_item.score_now / week_item.score_request;
        this.week_list.push(week_item);
      }
    },
    async week_finish(id) {
      console.log("week_finish");
      console.log(id);
      if (id >= 1e3) {
        console.log("week_finish,每周10个花花奖励1钻石");
        var week_id = id - 1e3;
        if (this.week_target_list[week_id].target_now < this.week_target_list[week_id].target_reqeust) {
          console.log("分数异常，出错啦，拒绝领奖");
          common_vendor.index.showToast({
            title: "分数异常，出错啦，拒绝领奖",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        this.week_target_list[week_id].target_checked = true;
        getApp().globalData.userInfo.data.week_target_list = this.week_target_list;
        if (this.week_target_list[week_id].award.item == "diamond") {
          getApp().globalData.userInfo.data.key_data.diamond.num_all += this.week_target_list[week_id].award.number;
          getApp().globalData.userInfo.data.key_data.diamond.num_day += this.week_target_list[week_id].award.number;
          getApp().globalData.userInfo.data.key_data.diamond.num_week += this.week_target_list[week_id].award.number;
        }
        var event = this.week_target_list[week_id].target_description;
        await this.log_upload("user", event);
        common_vendor.index.showToast({
          title: "领取成功,获得" + this.week_target_list[week_id].award.number + "个" + this.week_target_list[week_id].award.item,
          icon: "success",
          duration: 2e3
        });
      } else if (id < 1e3 && id >= 100) {
        console.log("day_finish,每日20分奖励1个花花");
        var day_id = id - 100;
        if (this.day_target_list[day_id].target_now < this.day_target_list[day_id].target_reqeust || getApp().globalData.userInfo.data.key_data.score.num_day < 20) {
          console.log("当日分数为", getApp().globalData.userInfo.data.key_data.score.num_day);
          console.log("分数异常，出错啦，拒绝领奖");
          common_vendor.index.showToast({
            title: "分数异常，出错啦，拒绝领奖",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        this.day_target_list[day_id].target_checked = true;
        this.week_target_list[0].target_now += this.day_target_list[day_id].award.number;
        getApp().globalData.userInfo.data.day_target_list = this.day_target_list;
        getApp().globalData.userInfo.data.week_target_list = this.week_target_list;
        if (this.day_target_list[day_id].award.item == "flower") {
          getApp().globalData.userInfo.data.key_data.flower.num_all += this.day_target_list[day_id].award.number;
          getApp().globalData.userInfo.data.key_data.flower.num_day += this.day_target_list[day_id].award.number;
          getApp().globalData.userInfo.data.key_data.flower.num_week += this.day_target_list[day_id].award.number;
        }
        var event = this.day_target_list[day_id].target_description;
        await this.log_upload("user", event);
        common_vendor.index.showToast({
          title: "领取成功,获得" + this.day_target_list[day_id].award.number + "个" + this.day_target_list[day_id].award.item,
          icon: "success",
          duration: 2e3
        });
      } else {
        console.log("regular_finish");
        var regular_id = id;
        if (this.regular_target_list[regular_id].target_week.score_now < this.regular_target_list[regular_id].target_week.score_request) {
          console.log("分数异常，出错啦，拒绝领奖");
          common_vendor.index.showToast({
            title: "分数异常，出错啦，拒绝领奖",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        this.regular_target_list[regular_id].target_week.target_checked = true;
        this.week_target_list[0].target_now += this.regular_target_list[regular_id].target_week.award.number;
        getApp().globalData.userInfo.data.regular_target_list = this.regular_target_list;
        getApp().globalData.userInfo.data.week_target_list = this.week_target_list;
        if (this.regular_target_list[regular_id].target_week.award.item == "flower") {
          getApp().globalData.userInfo.data.key_data.flower.num_all += this.regular_target_list[regular_id].target_week.award.number;
          getApp().globalData.userInfo.data.key_data.flower.num_day += this.regular_target_list[regular_id].target_week.award.number;
          getApp().globalData.userInfo.data.key_data.flower.num_week += this.regular_target_list[regular_id].target_week.award.number;
        }
        var event = this.regular_target_list[regular_id].target_week.description;
        await this.log_upload("user", event);
        common_vendor.index.showToast({
          title: "领取成功,获得" + this.regular_target_list[regular_id].target_week.award.number + "个" + this.regular_target_list[regular_id].target_week.award.item,
          icon: "success",
          duration: 2e3
        });
      }
      this.update_data();
    },
    async log_upload(type, event) {
      const LM = common_vendor.Vs.importObject("log_manager");
      let log_timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      let data = getApp().globalData.userInfo.data;
      const res = await LM.log_add(log_timestamp, type, event, data);
      console.log(res);
      common_vendor.index.setStorageSync("userInfo", getApp().globalData.userInfo);
    }
  }
};
if (!Array) {
  const _easycom_lunc_calendar2 = common_vendor.resolveComponent("lunc-calendar");
  _easycom_lunc_calendar2();
}
const _easycom_lunc_calendar = () => "../../uni_modules/lunc-calendar/components/lunc-calendar/lunc-calendar.js";
if (!Math) {
  _easycom_lunc_calendar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.dayChange),
    b: common_vendor.o($options.monthChange),
    c: common_vendor.o($options.shrinkClick),
    d: common_vendor.p({
      showShrink: true,
      showLunar: true,
      shrinkState: "week"
    }),
    e: common_vendor.f($data.week_list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.description),
        b: common_vendor.t(item.score_now),
        c: common_vendor.t(item.score_request),
        d: item.award_item === "flower"
      }, item.award_item === "flower" ? {
        e: common_assets._imports_0
      } : {
        f: common_assets._imports_1
      }, {
        g: item.percent,
        h: item.percent < 100 || item.target_checked == true,
        i: common_vendor.o(($event) => $options.week_finish(item.week_id), item.week_id),
        j: item.week_id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
