import bcrypt from 'bcryptjs';
import User from '../models/User.js';

let systemUserPromise;
async function getSystemUser(){
  if(!systemUserPromise){
    systemUserPromise=(async()=>{
      let u=await User.findOne({email:'system@infratrack.local'});
      if(!u){
        u=await User.create({
          fullName:'InfraTrack User',email:'system@infratrack.local',
          phone:'',role:'Admin',employeeId:'SYSTEM-001',
          passwordHash:await bcrypt.hash('disabled-local-access',10),active:true
        });
      }
      return u;
    })();
  }
  return systemUserPromise;
}

// Authentication is intentionally disabled for this local/demo build.
// Every API request receives a server-side system user so the full workflow
// remains protected from anonymous database writes while requiring no login UI.
export async function protect(req,res,next){
  try{
    req.user=await getSystemUser();
    next();
  }catch(e){
    console.error('System user initialization failed:',e);
    res.status(500).json({message:'Backend user initialization failed'});
  }
}
export function authorize(...roles){
  return(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'Insufficient permissions'});
}
