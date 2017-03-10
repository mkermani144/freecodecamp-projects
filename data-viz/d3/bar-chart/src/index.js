import * as d3 from 'd3';
import '../public/index.scss';
import json from './GDP-data.json';

d3.select('.bar-chart')
  .selectAll('div')
  .data(json.data)
  .enter()
  .append('div')
  .style('height', (el) => el[1] * 100 / d3.max(json.data, (d) => d[1]) + '%');
