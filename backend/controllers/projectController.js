import Project from '../models/Project.js';import ScheduleActivity from '../models/ScheduleActivity.js';import MatchResult from '../models/MatchResult.js';import AuditLog from '../models/AuditLog.js';
export async function list(req,res){res.json(await Project.find().sort({createdAt:-1}))}
export async function create(req,res){try{const p=await Project.create({...req.body,createdBy:req.user._id});res.status(201).json(p)}catch(e){res.status(400).json({message:e.message||'Project creation failed'})}}
export async function get(req,res){const p=await Project.findById(req.params.id);if(!p)return res.status(404).json({message:'Project not found'});res.json(p)}
export async function update(req,res){const p=await Project.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:'Project not found'});res.json(p)}
export async function remove(req,res){await Project.findByIdAndDelete(req.params.id);await ScheduleActivity.deleteMany({projectId:req.params.id});await MatchResult.deleteMany({projectId:req.params.id});await AuditLog.deleteMany({projectId:req.params.id});res.json({message:'Project deleted'})}
