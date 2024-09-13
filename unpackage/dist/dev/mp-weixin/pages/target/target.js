"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      signList: [
        {
          date: "2023-06-25",
          title: "生日",
          info: "张三生日"
        }
      ],
      week_list: []
    };
  },
  onLoad() {
  },
  mounted() {
    this.get_week();
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
    async add_week() {
      const WM = common_vendor.Vs.importObject("week_manager");
      var max_id = await WM.get_max_id();
      const week_info = {
        "week_id": max_id + 1,
        "week_name": "当周拿到10个花花",
        "week_target": -1,
        "week_current": 0,
        "week_reqest": 10,
        "week_award": "diamond",
        "week_is_done": false
      };
      var res = await WM.week_add(week_info);
      console.log(res);
      this.$refs.wek.refresh();
    },
    async get_week() {
      const WM = common_vendor.Vs.importObject("week_manager");
      var res = await WM.week_get_all();
      console.log(res);
      this.week_list = res.data;
      for (var i = 0; i < this.week_list.length; i++) {
        this.week_list[i].week_percent = 100 * this.week_list[i].week_current / this.week_list[i].week_reqest;
      }
    },
    week_finish(id) {
      console.log(id);
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
    e: common_vendor.f(this.week_list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.week_name),
        b: common_vendor.t(item.week_current),
        c: common_vendor.t(item.week_reqest),
        d: item.week_award === "flower"
      }, item.week_award === "flower" ? {
        e: common_assets._imports_0
      } : {
        f: common_assets._imports_1
      }, {
        g: item.week_percent,
        h: !item.week_is_done,
        i: common_vendor.o(($event) => $options.week_finish(item.week_id), item._id),
        j: item._id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
