const db = uniCloud.database();
const tgt = db.collection('target_table');
const dbCmd = db.command
// const target_info ={
// 	"target_id":max_id+1,
// 	"target_name":"情绪状态",
// 	"target_description":"你今天心情怎么样?",
// 	"target_options":{
// 		"0":"心情烦闷",
// 		"1":"略显疲惫",
// 		"2":"无风无浪",
// 		"3":"小小喜悦",
// 		"4":"干劲十足",
// 	},
// 	"target_is_done":false,
// 	"target_frequency":"per_day",
// 	"target_use":true 
// }
module.exports = {
	_before: function () { // 通用预处理器

	},

	async get_max_id(){
		const res = await tgt.orderBy('target_id','desc').limit(1).field({'target_id':true}).get()
		console.log('res',res)
		var max_id = res.data[0].target_id?res.data[0].target_id:0
		console.log('max',max_id)
		return max_id
	},

	async target_add(target_info){
		console.log("进入添加目标函数")
		console.log("待添加的目标信息",target_info)
		const res = await tgt.add(target_info)
		console.log("添加结果",res)
		return res
	},
	
	// async get_exhb_info( exhb_id_in ){
	// 	console.log("待查询的活动id",exhb_id_in)
	// 	const res = await exhb.where({
	// 		exhb_id:exhb_id_in
	// 	}).get()
	// 	r = {
	// 		"result":false,
	// 		"exhb_info":[]
	// 	}
	// 	console.log("查询结果",res)
	// 	if(res.data.length == 0){
	// 		console.log("未查询到活动")
	// 		return r
	// 	}else if(res.data.length == 1){
	// 		console.log("查询到活动",res.data)
	// 		r = {
	// 			"result":true,
	// 			"exhb_info":res.data[0]
	// 		}
	// 		return r
	// 	}else{
	// 		console.log("出错，查询到多个活动")
	// 		r = {
	// 			"result":"error",
	// 			"exhb_info":[]
	// 		}
	// 		return r
	// 	}
	// },
	// async get_new_exhb_id(){
	// 	const res = await exhb.orderBy('exhb_id','desc').limit(1).field({'exhb_id':true}).get()
	// 	const new_id = res.data[0].exhb_id + 1
	// 	// console.log('new',max_id)
	// 	return new_id
	// }
}
