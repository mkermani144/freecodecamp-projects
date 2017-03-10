import * as d3 from 'd3';
import '../public/index.scss';
import json from './GDP-data.json';

const x = d3.scaleLinear()
  .domain([json.data[0][1], json.data[json.data.length - 1][1]])
  .range([0, 100]);

d3.select('.bar-chart')
  .selectAll('div')
  .data(json.data)
  .enter()
  .append('div')
  .style('height', (el) => x(el[1]) + '%');
