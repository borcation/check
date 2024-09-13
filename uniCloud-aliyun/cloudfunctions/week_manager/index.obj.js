const db = uniCloud.database();
const wek = db.collection('week_table');
const dbCmd = db.command
// const week_info ={
// 	"week_id":max_id+1,
// 	"week_name":"情绪状态",
// 	"week_target":0,
// 	"week_reqest":20,
// 	"week_award":"flower",
// 	"week_is_done":false, 
// }
module.exports = {
	_before: function () { // 通用预处理器

	},

	async get_max_id(){
		const res = await wek.orderBy('week_id','desc').limit(1).field({'week_id':true}).get()
		console.log('res',res)
		var max_id = res.data[0].week_id?res.data[0].week_id:0
		console.log('max',max_id)
		return max_id
	},

	async week_add(week_info){
		console.log("进入添加目标函数")
		console.log("待添加的目标信息",week_info)
		const res = await wek.add(week_info)
		console.log("添加结果",res)
		return res
	},
	
	async week_get_all(){
		const res = await wek.get()
		console.log("获取所有目标",res)
		return res
	}
}
