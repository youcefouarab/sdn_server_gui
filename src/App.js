import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.less'
import Sidebar from './components/Sidebar'
import Topology from './pages/topology'
import Monitor from './pages/monitor'

function App() {
    const [style, setStyle] = useState('page reduced-left') 

    return (
        <>
            <div className={style}>
                <Routes>
                <Route path='/' element={<Topology />} />
                <Route path='/topology' element={<Topology />} />
                <Route path='/monitor' element={<Monitor />} /> 
                </Routes>
            </div>
            <Sidebar setPageStyle={setStyle}></Sidebar>
        </>
    );
}

export default App;
