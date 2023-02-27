import * as d3 from 'd3';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.less';

export default function runNetworkGraph(container, nodesData, linksData,
    hoverTooltip) {

    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const color = () => { return '#9D00A0'; };

    const icon = (d) => {
        return d.gender === 'male' ? '\uf222' : '\uf221';
    }

    const getClass = (d) => {
        return d.gender;
    };

    const drag = (simulation) => {
        const dragstarted = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };

        return d3.drag().on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    };

    // Add the tooltip element to the graph
    const tooltip = document.querySelector('#graph-tooltip');
    if (!tooltip) {
        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add('tooltip');
        tooltipDiv.style.opacity = '0';
        tooltipDiv.id = 'graph-tooltip';
        document.body.appendChild(tooltipDiv);
    }

    const div = d3.select('#graph-tooltip');
    const addTooltip = (hoverTooltip, d, x, y) => {
        div.transition()
            .duration(200)
            .style('opacity', 0.9);
        div.html(hoverTooltip(d))
            .style('left', `${x}px`)
            .style('top', `${y - 28}px`);
    };

    const removeTooltip = () => {
        div.transition()
            .duration(200)
            .style('opacity', 0);
    };

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .force('collide', d3.forceCollide(d => 30))

    d3.select('#graph_svg').remove();
    const svg = d3.select(container)
        .append('svg')
        .attr('id', 'graph_svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on('zoom', function () {
            svg.attr('transform', d3.event.transform);
        }));

    // Per-type markers, as they don't inherit styles.
    svg.append('svg:defs')
        .append('svg:marker')
        .attr('id', d => `arrow-${d}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 32)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('fill', '#555')
        .attr('d', 'M0,-5L10,0L0,5')

    const link = svg.append('g')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', d => Math.sqrt(d.value))
        .attr('marker-end', d => `url(${new URL(`#arrow-${d.type}`, location)})`);

    const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 12)
        .attr('fill', color)
        .call(drag(simulation));

    const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('class', d => `fa ${getClass(d)}`)
        .text(d => { return icon(d); })
        .call(drag(simulation));

    label.on('mouseover', (d) => {
        addTooltip(hoverTooltip, d, d3.event.pageX, d3.event.pageY);
    }).on('mouseout', () => {
        removeTooltip();
    });

    simulation.on('tick', () => {
        //update link positions
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        // update node positions
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        // update label positions
        label
            .attr('x', d => { return d.x; })
            .attr('y', d => { return d.y; })
    });

    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
}