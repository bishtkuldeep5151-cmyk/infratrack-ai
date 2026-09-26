import mongoose from 'mongoose';
const s=new mongoose.Schema({projectId:{type:mongoose.Schema.Types.ObjectId,ref:'Project'},userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:String,entityType:String,entityId:String,oldValue:Object,newValue:Object,metadata:Object,timestamp:{type:Date,default:Date.now}});export default mongoose.model('AuditLog',s);
