import { useCallback } from 'react'
import data from 'src/data/data.json'
import NetworkGraph from "src/components/NetworkGraph"

function Graph() {
    const hoverTooltip = useCallback((node) => {
        return `<div>${node.name}</div>`;
    }, []);
    return (
        <>
            <NetworkGraph linksData={data.links} 
                          nodesData={data.nodes} 
                          hoverTooltip={hoverTooltip} />
        </>
      );
}

export default Graph;