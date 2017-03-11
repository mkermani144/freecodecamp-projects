import * as d3 from 'd3';
import '../public/index.scss';
import json from './GDP-data.json';

const time = d3.scaleTime()
  .domain([new Date(json.data[0][0]), new Date(json.data[json.data.length - 1][0])])
  .range([40, 800]);
const gdp = d3.scaleLinear()
  .domain([json.data[0][1], json.data[json.data.length - 1][1]])
  .range([580, 0]);

const xAxis = d3.axisBottom().scale(time);
const yAxis = d3.axisLeft().scale(gdp).ticks(15, 's');
const svg = d3.select('.bar-chart');

d3.select('.bar-chart').selectAll('g')
  .data(json.data)
  .enter()
  .append('g')
  .attr('transform', el => `translate(${time(new Date(el[0]))}, 0)`)
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
  .text('Gross Domestic Product, USA');
