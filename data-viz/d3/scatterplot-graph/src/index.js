import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import '../public/index.scss';
import data from './cyclist-data.json';

const ranking = d3.scaleLinear()
  .domain([1, 35])
  .range([0, 400])
  .nice();
const time = d3.scaleLinear()
  .domain([data[0].Seconds, data[data.length - 1].Seconds])
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
  .attr('transform', el => `translate(${time(el.Seconds)}, ${ranking(el.Place)})`)
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
svg.append('text')
  .attr('text-anchor', 'end')
  .attr('y', 40)
  .attr('x', -10)
  .attr('transform', 'rotate(-90)')
  .text('Ranking');
svg.append('text')
  .attr('text-anchor', 'end')
  .attr('y', 400)
  .attr('x', 820)
  .text('Time');
svg.append('circle')
  .attr('transform', 'translate(650, 200)')
  .attr('fill', '#8BC34A')
  .attr('r', 4)
  .attr('cx', 2)
  .attr('cy', 2);
svg.append('text')
  .attr('text-anchor', 'start')
  .attr('y', 205)
  .attr('x', 660)
  .attr('font-size', '70%')
  .text('Riders with no doping allegations');
svg.append('circle')
  .attr('transform', 'translate(650, 220)')
  .attr('fill', '#F44336')
  .attr('r', 4)
  .attr('cx', 2)
  .attr('cy', 2);
svg.append('text')
  .attr('text-anchor', 'start')
  .attr('y', 225)
  .attr('x', 660)
  .attr('font-size', '70%')
  .text('Riders with doping allegations');
