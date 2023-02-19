import './style.less';
import Item from './Item';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Item title='Topology' link='/topology'></Item>
        <Item title='Monitor' link='/monitor'></Item>
    </div>
  );
}

export default Sidebar;
