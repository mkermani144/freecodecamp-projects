import * as d3 from 'd3';
import d3Tip from 'd3-tip';
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
const tip = d3Tip().attr('class', 'd3-tip')
  .html(d => `
    <div class="tip-name">${d.Name}, ${d.Nationality}</div>
    <div class="tip-year">Year: ${d.Year}</div>
    <div class="tip-time">Time: ${d.Time}</div>
    <div class="tip-doping">${d.Doping}</div>
  `);
svg.call(tip);
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('transform', el => `translate(${time(getSeconds(el.Time))}, ${ranking(el.Place)})`)
  .attr('fill', el => ['#8BC34A', '#F44336'][+Boolean(el.Doping)])
  .attr('r', 4)
  .attr('cx', 2)
  .attr('cy', 2)
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);
svg.append('g')
  .attr('transform', 'translate(20, 410)')
  .call(xAxis);
svg.append('g')
  .attr('transform', 'translate(20, 10)')
  .call(yAxis);
