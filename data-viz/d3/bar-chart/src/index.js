import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import '../public/index.scss';
import json from './GDP-data.json';

const time = d3.scaleTime()
  .domain([new Date(json.data[0][0]), new Date(json.data[json.data.length - 1][0])])
  .range([40, 800]);
const gdp = d3.scaleLinear()
  .domain([json.data[0][1], json.data[json.data.length - 1][1]])
  .range([580, 0]).nice();

const xAxis = d3.axisBottom().scale(time);
const yAxis = d3.axisLeft().scale(gdp).ticks(15, 's');
const svg = d3.select('.bar-chart');
const tip = d3Tip().attr('class', 'd3-tip').html(d => {
  return `<div class="tip-gdp">\$${d[1]} Billion</div><div class="tip-time">${d[0]}</div>`
});
svg.call(tip);
d3.select('.bar-chart').selectAll('g')
  .data(json.data)
  .enter()
  .append('g')
  .attr('transform', el => `translate(${time(new Date(el[0]))}, 0)`)
  .on('mouseover', tip.show)
  .append('rect')
  .attr('width', (800 / json.data.length) + 1)
  .attr('height', el => 580 - gdp(el[1]))
  .attr('y', el => gdp(el[1]));


svg.append('g')
  .attr('transform', 'translate(0, 580)')
  .call(xAxis);
svg.append('g')
  .attr('transform', 'translate(40, 0)')
  .call(yAxis);
svg.append('text')
  .attr('text-anchor', 'end')
  .attr('y', 50)
  .attr('x', -10)
  .attr('dy', '.75em')
  .attr('transform', 'rotate(-90)')
  .attr('fill', '#006064')
  .text('Gross Domestic Product, USA');
