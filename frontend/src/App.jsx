import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Schedule from './pages/Schedule';
import {Ingestion,Matching,Unmatched,Progress} from './pages/Operations';
import TimeAgent from './pages/TimeAgent';
import {Analytics,Memory,Audit} from './pages/Insights';
import Users from './pages/Users';

export default function App(){
  return <BrowserRouter>
    <Routes>
      <Route element={<AppLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:id" element={<ProjectDetail/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        <Route path="/ingestion" element={<Ingestion/>}/>
        <Route path="/matching" element={<Matching/>}/>
        <Route path="/unmatched" element={<Unmatched/>}/>
        <Route path="/time-agent" element={<TimeAgent/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/project-memory" element={<Memory/>}/>
        <Route path="/audit" element={<Audit/>}/>
        <Route path="/users" element={<Users/>}/>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
      <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
    </Routes>
  </BrowserRouter>
}
