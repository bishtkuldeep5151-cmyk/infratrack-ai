import Project from './models/Project.js';
import ScheduleActivity from './models/ScheduleActivity.js';
import User from './models/User.js';

export async function bootstrapDemoData(){
  const user=await User.findOne({email:'system@infratrack.local'});
  if(!user) return;
  let project=await Project.findOne({projectCode:'DEMO-001'});
  if(!project){
    project=await Project.create({
      name:'Demo Infrastructure Project',projectCode:'DEMO-001',
      client:'Demo Client',location:'Area A',
      description:'Ready-to-test project for the full reconciliation workflow.',
      plannedStart:new Date('2026-09-01'),plannedEnd:new Date('2026-10-15'),
      status:'Active',createdBy:user._id
    });
  }
  const rows=[
    ['CIV-L6-001','Foundation excavation','L6','Civil','Area A','2026-09-01','2026-09-05'],
    ['CIV-L6-002','Concrete foundation pour','L6','Civil','Area A','2026-09-06','2026-09-10'],
    ['PIP-L6-024','Erect Line 24-XX','L6','Piping','Area A','2026-09-03','2026-09-07'],
    ['PIP-L6-025','Install Line 25 valves','L6','Piping','Area B','2026-09-08','2026-09-14'],
    ['PIP-L6-027','Pipe support installation','L6','Piping','Area A','2026-09-09','2026-09-13'],
    ['ELE-L6-010','Install MCC panel','L6','Electrical','Substation','2026-09-05','2026-09-09'],
    ['ELE-L6-011','Pull feeder cables','L6','Electrical','Substation','2026-09-10','2026-09-16'],
    ['INS-L6-004','Instrument tubing installation','L6','Instrumentation','Area A','2026-09-07','2026-09-13'],
    ['MEC-L6-007','Pump baseplate alignment','L6','Mechanical','Pump House','2026-09-03','2026-09-06'],
    ['MEC-L6-008','Install centrifugal pump','L6','Mechanical','Pump House','2026-09-07','2026-09-12'],
    ['PIP-L5-003','Piping fabrication package','L5','Piping','Area A','2026-09-01','2026-09-12'],
    ['ELE-L5-002','Electrical installation package','L5','Electrical','Site Wide','2026-09-01','2026-09-30']
  ];
  for(const x of rows) await ScheduleActivity.findOneAndUpdate(
    {projectId:project._id,activityId:x[0]},
    {projectId:project._id,activityId:x[0],activityName:x[1],wbsLevel:x[2],
     discipline:x[3],location:x[4],plannedStart:new Date(x[5]),plannedEnd:new Date(x[6]),source:'bootstrap'},
    {upsert:true,new:true}
  );
  return project;
}
