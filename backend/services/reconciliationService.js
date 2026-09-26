import ScheduleActivity from '../models/ScheduleActivity.js';
export async function reconcile(match,event){
  if(!match.scheduleActivityId)return null;
  const a=await ScheduleActivity.findById(match.scheduleActivityId);
  if(!a)return null;
  if(event.eventType==='START'){a.actualStart=event.eventDate;if(!a.progress||a.progress<1)a.progress=1}
  if(event.eventType==='END'){a.actualEnd=event.eventDate;a.progress=100}
  if(event.eventType==='PROGRESS'&&event.progress!=null)a.progress=Math.max(0,Math.min(100,event.progress));
  if(event.eventType==='DELAY'&&event.progress!=null)a.progress=Math.max(a.progress||0,event.progress);
  if(a.actualEnd)a.status=(a.plannedEnd&&a.actualEnd>a.plannedEnd)?'Delayed':'Completed';
  else if(a.actualStart||a.progress>0)a.status='In Progress';
  else a.status='Not Started';
  a.duration=a.plannedStart&&a.plannedEnd?Math.max(0,Math.round((a.plannedEnd-a.plannedStart)/86400000)+1):undefined;
  return a.save()
}
export function variance(a){return {startVariance:a.actualStart&&a.plannedStart?Math.round((a.actualStart-a.plannedStart)/86400000):null,endVariance:a.actualEnd&&a.plannedEnd?Math.round((a.actualEnd-a.plannedEnd)/86400000):null,actualDuration:a.actualStart&&a.actualEnd?Math.max(0,Math.round((a.actualEnd-a.actualStart)/86400000)+1):null}}
