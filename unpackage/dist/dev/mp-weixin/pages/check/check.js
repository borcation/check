"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // date: new Date().toISOString().slice(0,10),
      date: /* @__PURE__ */ new Date(),
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      d_remain: Math.ceil((/* @__PURE__ */ new Date("2024-12-21") - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24)),
      slogan: "每天自律一点点"
    };
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
    async add() {
      console.log("add");
      const TM = common_vendor.Vs.importObject("target_manager");
      var max_id = await TM.get_max_id();
      console.log("max", max_id);
      this.$refs.tgt.refresh();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.date),
    b: common_vendor.t($data.time),
    c: common_vendor.t($data.d_remain),
    d: common_vendor.t($data.slogan),
    e: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: common_vendor.f(data, (item, index, i1) => {
          return common_vendor.e({
            a: common_vendor.t(item.target_name),
            b: item.target_is_done
          }, item.target_is_done ? {
            c: "18217584-1-" + i0 + "-" + i1 + ",18217584-0",
            d: common_vendor.p({
              type: "checkbox-filled",
              size: "35",
              color: "green"
            })
          } : {
            e: "18217584-2-" + i0 + "-" + i1 + ",18217584-0",
            f: common_vendor.p({
              type: "circle",
              size: "35",
              color: "red"
            })
          }, {
            g: item._id,
            h: common_vendor.o(($event) => _ctx.check(), item._id)
          });
        }),
        b: "18217584-3-" + i0 + ",18217584-0",
        c: data.length % 2 === 0
      }, data.length % 2 === 0 ? {} : {}, {
        d: i0,
        e: s0
      });
    }, {
      name: "d",
      path: "e",
      vueId: "18217584-0"
    }),
    f: common_vendor.p({
      type: "plusempty",
      size: "20",
      color: "gray"
    }),
    g: common_vendor.o(($event) => $options.add()),
    h: common_vendor.sr("tgt", "18217584-0"),
    i: common_vendor.p({
      collection: "target_table",
      orderby: "target_id asc"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
