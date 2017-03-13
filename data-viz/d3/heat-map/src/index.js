import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import '../public/index.scss';
import data from './global-temperature.json';

const getMonthName = (monthNumber) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[monthNumber - 1];
}
const year = d3.scaleLinear()
  .domain([1753, 2016])
  .range([60, 1112]);
const month = d3.scaleLinear()
  .domain([1, 13])
  .range([5, 485]);
const xAxis = d3.axisBottom().scale(year).ticks(20);
const yAxis = d3.axisLeft().scale(month)
  .tickFormat(getMonthName);
const svg = d3.select('.heat-map');
const tip = d3Tip().attr('class', 'd3-tip')
  .html(d => `
    <div class="tip-date">${d.year}, ${getMonthName(d.month)}</div>
    <div class="tip-variance" style="color: hsl(${60 - (d.variance * 40)}, 100%, 80%)">${(d.variance + data.baseTemperature).toFixed(2)} &deg;C</div>
  `);
svg.call(tip);
svg.selectAll('rect')
  .data(data.monthlyVariance)
  .enter()
  .append('rect')
  .attr('transform', el => `translate(${year(el.year)}, ${month(el.month)})`)
  .attr('fill', el => `hsl(${60 - (el.variance * 40)}, 100%, 50%)`)
  .attr('width', 3)
  .attr('height', 40)
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);
svg.append('g')
  .attr('transform', 'translate(0, 485)')
  .call(xAxis);
svg.append('g')
  .attr('transform', 'translate(60, 0)')
  .call(yAxis);
d3.selectAll('svg > g:nth-of-type(2) text')
  .attr('y', '2em');
