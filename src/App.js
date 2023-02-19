import { Route, Routes } from 'react-router-dom'
import './App.less'
import Sidebar from './components/Sidebar'
import Topology from './pages/topology'
import Monitor from './pages/monitor'

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
