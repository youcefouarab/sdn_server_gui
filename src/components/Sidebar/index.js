import { useState } from 'react';
import './style.less';
import Item from './Item';
import { BiLockOpenAlt, BiLockAlt } from 'react-icons/bi';

function Sidebar({setPageStyle}) {
    const [locked, setLocked] = useState(false);
    const [style, setStyle] = useState('sidebar sidebar-unlocked');
    var icon = <></>
    switch (locked) {
        case false: 
            icon = <BiLockOpenAlt size={20} />;
            break;
        case true:
            icon = <BiLockAlt size={20} />;
            break;
    }   

    function handleLock(e) {
        e.preventDefault();
        if (!locked == true) {
            setStyle('sidebar sidebar-locked');
            setPageStyle('page full-left');
        } else {
            setStyle('sidebar sidebar-unlocked');
            setPageStyle('page reduced-left');
        }
        setLocked(!locked);
    }
    
    return (
        <div className={style}>
            <Item title='Topology' link='/topology'></Item>
            <Item title='Monitor' link='/monitor'></Item>

            <div className='sidebar-lock' onClick={handleLock}>
                {icon}
            </div>
        </div>
    );
}

export default Sidebar;
