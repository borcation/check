const db = uniCloud.database();
const lgt = db.collection('log_table');
const dbCmd = db.command

module.exports = {
	_before: function () { // 通用预处理器

	},

	async log_add(log_timestamp,log_from,log_event,data){
		console.log("进入添加日志函数")
		console.log("待添加日志",log_timestamp,log_from,log_event,data)
		
		const res = await lgt.orderBy('log_id','desc').limit(1).field({'log_id':true}).get()
		console.log('res',res)
		var max_id = res.data[0].log_id?res.data[0].log_id:0
		console.log('max',max_id)

		if(log_from == "user"){
			var is_takeback = true
		}else{
			var is_takeback = false
		}
		const log_info = {
			"log_id":max_id+1,
			"log_timestamp":log_timestamp,
			"log_from":log_from,
			"log_event":log_event,
			"log_data":data,
			"is_takeback":is_takeback
		}
		const r = await lgt.add(log_info)
		console.log("添加结果",r)
		return r
	},
	async get_log_list(){
		const res = await lgt.get()
		console.log("查询结果",res)
		return res.data
	},
// 删除所有log_id不为-1的日志
	async delete_log(){
		const res = await lgt.where({
			log_id:dbCmd.neq(-1)
		}).remove()
		console.log("删除结果",res)
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
