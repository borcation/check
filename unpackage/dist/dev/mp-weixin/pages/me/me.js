"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      user_name: "玉儿宝贝",
      user_avatar: "https://mp-324f3402-0d4f-4186-9711-38d0cd552848.cdn.bspapp.com/logo.png",
      num_flower: 15,
      num_diamond: 1
    };
  },
  onLoad() {
    this.user_name = getApp().globalData.userInfo.user_name;
    this.user_avatar = getApp().globalData.userInfo.user_avatar;
  },
  onShow() {
    console.log("me onShow");
    this.num_flower = getApp().globalData.userInfo.data.key_data.flower.num_all;
    this.num_diamond = getApp().globalData.userInfo.data.key_data.diamond.num_all;
  },
  methods: {
    go_award() {
      common_vendor.index.navigateTo({
        url: "/pages/award/award"
      });
    },
    go_log() {
      common_vendor.index.navigateTo({
        url: "/pages/log/log"
      });
    },
    go_set() {
      common_vendor.index.navigateTo({
        url: "/pages/set/set"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.user_name),
    b: common_assets._imports_0,
    c: common_vendor.t($data.num_flower),
    d: common_assets._imports_1,
    e: common_vendor.t($data.num_diamond),
    f: common_vendor.p({
      type: "right",
      color: "gray",
      size: "24"
    }),
    g: common_vendor.o(($event) => $options.go_award()),
    h: common_vendor.p({
      type: "right",
      color: "gray",
      size: "24"
    }),
    i: common_vendor.o(($event) => $options.go_log()),
    j: common_vendor.p({
      type: "right",
      color: "gray",
      size: "24"
    }),
    k: common_vendor.o(($event) => $options.go_set())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
