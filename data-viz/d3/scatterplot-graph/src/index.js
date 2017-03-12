import * as d3 from 'd3';
import '../public/index.scss';
import data from './cyclist-data.json';

const getSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(':');
  return (+minutes * 60) + +seconds;
};

const ranking = d3.scaleLinear()
  .domain([1, 35])
  .range([0, 400])
  .nice();
const time = d3.scaleLinear()
  .domain([getSeconds(data[0].Time), getSeconds(data[data.length - 1].Time)])
  .range([800, 0])
  .nice();
const xAxis = d3.axisBottom().scale(time)
  .tickFormat(timeString =>
    `${Math.floor(timeString / 60)}:${timeString % 60 < 10 ? '0' : ''}${timeString % 60}`);
const yAxis = d3.axisLeft().scale(ranking);
const svg = d3.select('.scatterplot-graph');
svg.selectAll('g')
  .data(data)
  .enter()
  .append('circle')
  .attr('transform', el => `translate(${time(getSeconds(el.Time))}, ${ranking(el.Place)})`)
  .attr('fill', el => ['green', 'red'][+Boolean(el.Doping)])
  .attr('r', 4)
  .attr('cx', 2)
  .attr('cy', 2);
svg.append('g')
  .attr('transform', 'translate(20, 410)')
  .call(xAxis);
svg.append('g')
  .attr('transform', 'translate(20, 10)')
  .call(yAxis);
