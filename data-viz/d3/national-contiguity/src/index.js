import * as d3 from 'd3';
import '../public/index.scss';
import '../public/flags.scss';
import data from './countries.json';

const simulation = d3.forceSimulation()
  .alpha(.3)
  .nodes(data.nodes);

simulation.force('charge', d3.forceManyBody().strength(20))
  .force('center', d3.forceCenter(500, 300))
  .force('collide', d3.forceCollide(20).strength(.4))
  .force('link', d3.forceLink(data.links).strength(1));

const svg = d3.select('.graph-svg');
const tip = d3.select('.tooltip');
const link = svg.append('g')
  .selectAll('line')
  .data(data.links)
  .enter()
  .append('line')
  .attr('stroke', '#FAFAFA')
  .attr('stroke-width', .5);

const node = d3.selectAll('.graph-div')
  .selectAll('img')
  .data(data.nodes)
  .enter()
  .append('img')
  .attr('class', d => `flag flag-${d.code}`)
  .style('transform', 'scale(.6)')
  .style('position', 'absolute')
  .on('mouseover', (d) => {
    tip.style('display', 'block')
      .style('position', 'fixed')
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`)
      .html(d.country)
  })
  .on('mouseout', () => tip.style('display', 'none'));


simulation.on('tick', () => {
  node.style('left', d => `${d.x - 16}px`)
    .style('top', d => `${d.y - 16}px`)
  link.attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
});

const drag_start = (d) => {
  if (!d3.event.active) {
    simulation.alpha(.1).restart();
  }
  d.fx = d.x;
  d.fy = d.y;
}
const drag_drag = (d) => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
const drag_end = (d) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0);
  }
  d.fx = null;
  d.fy = null;
}

var drag_handler = d3.drag()
  .on('start', drag_start)
  .on('drag', drag_drag)
  .on('end', drag_end);

drag_handler(node)
