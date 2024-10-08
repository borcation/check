## 日历组件
### 简单介绍
- 组件需要依赖 sass 插件 ，请自行安装；
- 本组件依赖 uni-app内置组件`swiper`组件，请与`swiper`组件配合使用；
- nvue页面中的`swiper`组件部分功能不支持，详情见[uni-app内置组件：swiper](https://uniapp.dcloud.net.cn/component/swiper.html)
- 可设置显示收缩按钮，收缩后只显示一个星期的日期，展开后显示一个月的日期；可以通过触摸屏幕左右滑动切换月份或切换周；
- 可根据需要选择是否显示农历日期，且会显示节日，如春节、端午、国庆、腊八节等；
- 本组件农历转换使用的js是 [@1900-2100区间内的公历、农历互转](https://github.com/jjonline/calendar.js)
- 欢迎大家下载使用，项目源码示例：[https://gitee.com/lunc9932/calendar](https://gitee.com/lunc9932/calendar)
- 若有插件导入失败，重启编辑器；

### API
#### 属性说明
| 属性名           | 类型     | 默认值   | 说明              |
|-----------------|----------|----------|-----------------------|
| date            | Date     | new Date()    | 默认日期             |
| showLunar       | Boolean  | false    | 是否显示农历             |
| firstDayOfWeek  | String   | monday   | 周几为每周的第一天，可选值：monday / sunday<br>monday：每周从周一开始；sunday：每周从周日开始           |
| showMonthBg     | Boolean  | true     | 是否显示月份背景               |
| weekend         | Boolean  | true     | 周末标红(周六周日日期用红色字体)  |
| shouChangeBtn   | Boolean  | true     | 是否显示上月下月箭头按钮      |
| weekType        | Boolean  | 周       | 星期的前缀，如星期一星期二，或周一周二，也可以只显示一、二等      |
| showShrink      | Boolean  | false    | 是否显示收缩按钮      |
| shrinkState     | String   | month    | 默认显示周数据还是月数据(收起或展开)，可选值：week / month<br>week：默认打开显示周数据（收起状态）；month：默认打开显示月数据（展开状态）      |
| signList        | Array    | []       | 标记数组，若同日期有多个标记，则显示最后一个<br>期待格式[{date: '2021-09-10', title: '生日', info: '八月初四张三生日'}]  |

注意：
1. 标记日期会在日期下方显示“title”内容，建议“title”内容不超过4个汉字；
2. 农历日期、节日、标记日期，只会显示其一，优先级 标记 > 节日 > 农历日期；
3. `showShrink`表示是否显示收缩按钮，并不是表示收起或展开状态；

#### 方法说明
| 方法名          | 说明        | 参数 |
|-----------------|------------|--------|
| addSignList     | 添加标记    | (Array:list)，传入需要添加的标记数组，日期相同不会覆盖，只显示第一个出现的标记         |
| deleteSignList  | 删除标记    | (Array:list)，传入需要删除的标记数组，根据 date 和 title 同时判断进行删除         |

方法使用：在组件上添加 `ref` 属性，在调用对应的方法：`this.$refs.calendar.addSignList([])` 即可，详情见下方的基本用法；<br>
**原 setSignList() 方法已弃用；**


#### 事件说明
| 事件名        | 说明                | 返回值 |
|---------------|--------------------|--------|
| @dayChange    | 选中日期改变时触发，包括点击日期、切换月份和切换周都会改变选中日期 | dayInfo，详情见下方说明 |
| @monthChange  | 切换月份时触发，包括点击切换月份按钮、选中日期时切换的月份等都会改变触发 | monthInfo，详情见下方说明 |
| @shrinkClick   | 收缩和展开时触发事件 | 返回当前状态：week / month<br>week：当前显示的一个星期（收起）；month：当前显示的一个月（展开） |

#### @dayChange 返回值 dayInfo 说明
| 值      | 类型    | 说明  |
| ------- | ------ | ----- |
| date    | String | 日期，格式“yyyy-MM-dd” |
| year    | Number | 年    |
| month   | Number | 月    |
| day     | Number | 日    |
| week    | Number | 星期几 |
| daySign | Array  | 当前日期的标记，若没有则为空数组 |
| lunar   | Object | 农历信息，包含农历日期、节日、生肖等；<br>只有属性 showLunar 设置为 true 时才会返回此值； |

#### @monthChange 返回值 monthInfo 说明
| 值    | 类型    | 说明  |
| ----- | ------ | ----- |
| year  | Number | 年    |
| month | Number | 月    |
| type  | String | 返回类型：today / pre / next<br>today：当前月份，pre：上个月，next：下个月 |


### 基本用法
在`template`中使用组件

```
<view class="content">
  <view class="content-item">
    <lunc-calendar ref="calendar" :showLunar="true" :showMonthBg="true" :showShrink="true" :signList="signList"
      @dayChange="dayChange" weekType="星期" @monthChange="monthChange" @shrinkClick="shrinkClick">
    <view class="operation">
      <view class="button" @click="addSign">新增标记</view>
      <view class="button" @click="updateSign">修改标记</view>
    </view>
  </view>
  <view class="content-item">
    <lunc-calendar :showShrink="true" shrinkState="week"></lunc-calendar>
  </view>
</view>
```
在`script`中使用

```
export default {
  data() {
    return {
      signList: [{date: "2023-06-25",title: "生日",info: "张三生日"},
        {date: "2023-06-19",title: "朋友聚会"}, 
        {date: "2023-07-22",title: "纪念日"}, 
        {date: "2023-04-11",title: "聚会"}, 
        {date: "2023-07-23",title: "郊游"}, 
        {date: "2023-08-19",title: "游玩"}],
    }
  },
  methods: {
    dayChange(dayInfo) { // 点击日期
      console.log("点击日期", JSON.parse(JSON.stringify(dayInfo)));
    },
    monthChange(monthInfo) { // 切换月份
      console.log("切换月份", JSON.parse(JSON.stringify(monthInfo)));
    },
    shrinkClick(type) {
      console.log("当前状态", type);
    },

    addSign() { // 添加标记
      let addList = [{date: "2023-06-28",title: "休息"}, 
        {date: "2023-06-01",title: "上班"}];
      // 调用 addSignList 方法，传入需要添加的标记数组
      this.$refs.calendar.addSignList(addList);
    },
    deleteSign() { // 删除标记
      let deleteList = [{date: "2023-06-01",title: "上班"}];
      // 调用 deleteSignList 方法，传入需要删除的标记数组
      this.$refs.calendar.deleteSignList(deleteList);
    }
  }
}
```


