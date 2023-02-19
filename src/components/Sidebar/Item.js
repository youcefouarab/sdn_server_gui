import { Link } from 'react-router-dom';
import './style.less';
import { BiNetworkChart } from 'react-icons/bi';
import { MdSpeed } from 'react-icons/md';

function Item({title, link}){
    var icon = <></>
    switch (link) {
        case '/topology': 
            icon = <BiNetworkChart size={30} />;
            break;
        case '/monitor': 
            icon = <MdSpeed size={30} />;
            break;
    }
    return (
        <Link to={link}>
            <div className='item'> 
                <span className='item-icon'>{icon}</span>
                <span className='item-title truncate-one'>{title}</span>
            </div>
        </Link>
    );
}

export default Item;

