"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // date: new Date().toISOString().slice(0,10),
      date: "",
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      d_remain: Math.ceil((/* @__PURE__ */ new Date("2024-12-21") - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24)),
      slogan: "每天自律一点点",
      regular_target_list: [
        {
          target_id: 0,
          target_name: "☀️早起",
          target_description: "今天你几点起床的呀？",
          target_score_list: ["九点后", "九点", "八点半", "八点", "七点半"],
          target_checked: true,
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
        }
      ],
      pop_data: {
        id: 0,
        name: "",
        description: "",
        options: {},
        current_score: -1,
        status: false
      }
    };
  },
  onLoad() {
    this.regular_target_list = getApp().globalData.userInfo.data.regular_target_list;
  },
  mounted() {
    this.date = this.get_date();
    this.updateTime();
    setInterval(this.updateTime, 1e3);
  },
  methods: {
    updateTime() {
      this.time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    },
    get_date() {
      var date = /* @__PURE__ */ new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + "-" + month + "-" + day;
    },
    pop(id, name, description, options, status) {
      this.pop_data.id = id;
      this.pop_data.name = name;
      if (status == true) {
        this.pop_data.description = "你今天已经打过卡啦！";
      } else {
        this.pop_data.description = description;
      }
      this.pop_data.options = Object.values(options);
      this.pop_data.current_score = -1;
      this.pop_data.status = status;
      this.$refs.popup.open();
    },
    radioChange: function(evt) {
      console.log(evt.detail);
      this.pop_data.current_score = evt.detail.value;
    },
    async check() {
      console.log("check");
      console.log(this.pop_data.id, this.pop_data.current_score);
      this.regular_target_list[this.pop_data.id].target_checked = true;
      this.regular_target_list[this.pop_data.id].target_week.score_now += parseInt(this.pop_data.current_score);
      getApp().globalData.userInfo.data.regular_target_list[this.pop_data.id] = this.regular_target_list[this.pop_data.id];
      getApp().globalData.userInfo.data.key_data.score.num_all += parseInt(this.pop_data.current_score);
      getApp().globalData.userInfo.data.key_data.score.num_day += parseInt(this.pop_data.current_score);
      getApp().globalData.userInfo.data.key_data.score.num_week += parseInt(this.pop_data.current_score);
      getApp().globalData.userInfo.data.day_target_list[0].target_now += parseInt(this.pop_data.current_score);
      var event = this.pop_data.name + this.pop_data.current_score + "分";
      await this.log_upload("user", event);
      common_vendor.index.showToast({
        title: "本日积分+" + this.pop_data.current_score,
        icon: "success",
        mask: true
      });
      this.$refs.popup.close();
      this.pop_data.current_score = -1;
    },
    async log_upload(type, event) {
      const LM = common_vendor.Vs.importObject("log_manager");
      let log_timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      let data = getApp().globalData.userInfo.data;
      const res = await LM.log_add(log_timestamp, type, event, data);
      console.log(res);
      common_vendor.index.setStorageSync("userInfo", getApp().globalData.userInfo);
    },
    add() {
      common_vendor.index.showToast({
        title: "这个功能你老公正在开发中",
        icon: "none",
        mask: true
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.date),
    b: common_vendor.t($data.time),
    c: common_vendor.t($data.d_remain),
    d: common_vendor.t($data.slogan),
    e: common_vendor.f($data.regular_target_list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.target_name),
        b: item.target_checked
      }, item.target_checked ? {
        c: "18217584-0-" + i0,
        d: common_vendor.p({
          type: "checkbox-filled",
          size: "35",
          color: "green"
        })
      } : {
        e: "18217584-1-" + i0,
        f: common_vendor.p({
          type: "circle",
          size: "35",
          color: "red"
        })
      }, {
        g: item.target_id,
        h: common_vendor.o(($event) => $options.pop(item.target_id, item.target_name, item.target_description, item.target_score_list, item.target_checked), item.target_id)
      });
    }),
    f: common_vendor.p({
      type: "plusempty",
      size: "20",
      color: "gray"
    }),
    g: common_vendor.o(($event) => $options.add()),
    h: $data.regular_target_list.length % 2 === 0
  }, $data.regular_target_list.length % 2 === 0 ? {} : {}, {
    i: common_vendor.t($data.pop_data.name),
    j: common_vendor.t($data.pop_data.description),
    k: common_vendor.f($data.pop_data.options, (item, index, i0) => {
      return {
        a: common_vendor.t(index),
        b: common_vendor.t(item),
        c: index,
        d: index === $data.pop_data.current_score,
        e: index
      };
    }),
    l: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args)),
    m: $data.pop_data.current_score == -1 || $data.pop_data.status == true,
    n: common_vendor.o((...args) => $options.check && $options.check(...args)),
    o: common_vendor.sr("popup", "18217584-3"),
    p: common_vendor.p({
      type: "center"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
