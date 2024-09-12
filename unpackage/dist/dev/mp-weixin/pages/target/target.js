"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      actDay: [],
      //用户选择的日期
      chooseDay: ["2024-09-13", "2024-09-15", "2024-09-16", "2024-09-05"]
      //已被投标的数据
    };
  },
  onLoad() {
  },
  methods: {
    // 展开日历
    onDayClick(data) {
      let choose = data.date;
      if (this.actDay.includes(choose)) {
        const index = this.actDay.indexOf(choose);
        this.actDay.splice(index, 1);
      } else if (this.chooseDay.includes(choose)) {
        common_vendor.index.showToast({
          title: "这个日期已经被投标了",
          icon: "none"
        });
      } else {
        this.actDay.push(choose);
      }
    }
  }
};
if (!Array) {
  const _easycom_zeng_calen2 = common_vendor.resolveComponent("zeng-calen");
  _easycom_zeng_calen2();
}
const _easycom_zeng_calen = () => "../../uni_modules/zeng-calen/components/zeng-calen/zeng-calen.js";
if (!Math) {
  _easycom_zeng_calen();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onDayClick),
    b: common_vendor.p({
      actDay: $data.actDay,
      chooseDay: $data.chooseDay,
      headerBar: "false"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
