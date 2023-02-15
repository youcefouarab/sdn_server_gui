import { Route, Routes } from 'react-router-dom'
import './App.less'
import Sidebar from './app/components/sidebar/sidebar'
import Topology from './app/pages/topology/topology'
import Monitor from './app/pages/monitor/monitor'

function App() {
  return (
    <>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Topology />} />
          <Route path='/topology' element={<Topology />} />
          <Route path='/monitor' element={<Monitor />} /> 
        </Routes>
      </div>
      <Sidebar></Sidebar>
    </>
  );
}

export default App;
