import { useEffect, useRef } from 'react';
import runNetworkGraph from './NetworkGraphD3';
import './style.less';

export default function NetworkGraph({ nodesData, linksData, hoverTooltip }) {
    const container = useRef(null);

    useEffect(() => {
        let destroyFn;

        if (container.current) {
            const { destroy } = runNetworkGraph(container.current, nodesData,
                linksData, hoverTooltip);
            destroyFn = destroy;
        }

        return destroyFn;
    }, [nodesData, linksData]);

    return <div ref={container} className='container' />;
}