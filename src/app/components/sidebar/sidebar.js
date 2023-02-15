import './style/sidebar.less';
import Item from './item';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Item title='Topology' link='/topology'></Item>
        <Item title='Monitor' link='/monitor'></Item>
    </div>
  );
}

export default Sidebar;
