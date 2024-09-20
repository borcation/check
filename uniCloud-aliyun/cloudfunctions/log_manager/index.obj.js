const db = uniCloud.database();
const lgt = db.collection('log_table');
const dbCmd = db.command

module.exports = {
	_before: function () { // 通用预处理器

	},

	async log_add(log_timestamp,log_from,log_event,data,device){
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
			"is_takeback":is_takeback,
			"device":device
		}
		const r = await lgt.add(log_info)
		console.log("添加结果",r)
		return r
	},
	async get_log_list(d){
		const res = await lgt.where({
			device: d
		}).orderBy('log_id', 'desc').limit(20).get()
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
}
