import { useCallback } from 'react'
import data from 'src/data/data.json'
import NetworkGraph from "src/components/NetworkGraph"

export default function Topology() {
    const hoverTooltip = useCallback((node) => {
        return `<div>${node.name}</div>`;
    }, []);
    return (
        <div className='topology'>
            <NetworkGraph linksData={data.links} 
                          nodesData={data.nodes} 
                          hoverTooltip={hoverTooltip} />
        </div>
    );    
}