import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as _ from 'lodash';

class ShewhartFlashyPlotChart extends React.Component {

    emitTime = (label) => {

        let d = new Date();

        console.info(`${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}.${d.getUTCMilliseconds()} (${label})`);
    };

    componentDidMount() {
        this.emitTime('componentDidMount');
        this.prepData();
        this.renderSvg();
    }

    componentDidUpdate() {
        this.emitTime('componentDidUpdate');
        this.renderSvg();
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    componentWillUnmount() {
        this.emitTime('componentWillUnmount');
        ReactDOM.unmountComponentAtNode(this.svg);
    }

    setSvgRef = (element) => {
        this.emitTime('setSvgRef');
        this.svg = element;
    };

    prepData = () => {

        this.emitTime('prepData BEGIN');

        let data = this.props.stats
            .map((item) => {

                let date = new Date(item.date);

                return {
                    date: date,
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    dateString: date.toLocaleDateString(),
                    value: item.value
                };
            })
            .sort((a, b) => a.value - b.value);

        // unique, sorted dates ////////////////
        let dates = _.uniqBy(data, 'dateString')
            .map((item) => {
                return {
                    year: item.year,
                    month: item.month,
                    date: item.date
                };
            })
            .sort((a, b) => (a.year * 100 + a.month) - (b.year * 100 + b.month));

        // averages /////////////////////////
        let findAverage = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        let averages = dates.map((date) => {
            return {
                date: date.date,
                average: findAverage(
                    data.filter(item => item.year === date.year && item.month === date.month)
                        .map(item => item.value)
                )
            };
        });
        let average = findAverage(
            averages.map(item => item.average)
        );

        // control limts /////////////////////////
        let findStandardDeviation = (arr) => {

            let n = arr.length;
            let mean = arr.reduce((a, b) => a + b) / n;

            return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        };
        let standardDeviation = findStandardDeviation(
            data.map(item => item.value)
        );
        let upperControlLimit = 3 * standardDeviation + average;
        let lowerControlLimit = -3 * standardDeviation + average;

        // x scale /////////////////////////
        let xScale = d3
            .scaleTime()
            .domain([dates[0].date, dates[dates.length - 1].date])
            .range([50, 700]);

        // y scale /////////////////////////
        let values = data.map(d => d.value);
        let max = Math.max(...values);
        let min = Math.min(...values);
        let yScale = d3
            .scaleLinear()
            .domain([
                max > upperControlLimit ? max : upperControlLimit,
                min < lowerControlLimit ? min : lowerControlLimit
            ])
            .range([10, 260]);

            this.emitTime('prepData END');

        // viewModel property
        this.viewModel = {
            data: data.sort((a, b) => (a.year * 100 + a.month) - (b.year * 100 + b.month)),
            average: average,
            upperControlLimit: upperControlLimit,
            lowerControlLimit: lowerControlLimit,
            xScale: xScale,
            yScale: yScale,
            dateCount: dates.length
        };
    };

    plotTimeStamp = (plot) => {

        let timeStamp = this.props.timeStamp;

        plot.append('text')
            .attr('id', 'ShewhartPlotChart_TimeStamp')
            .attr('x', 50)
            .attr('y', 30)
            .text(() => { return `time stamp: ${timeStamp}`; })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '12px')
            .attr('fill', 'red');
    };

    plotAxes = (plot) => {

        plot.append('g')
            .attr('transform', 'translate(0, 270)')
            .call(d3.axisBottom(this.viewModel.xScale)
                .tickFormat(d3.timeFormat('%b %y'))
            );

        plot.append("g")
            .attr('transform', 'translate(40, 0)')
            .call(d3.axisLeft(this.viewModel.yScale)
                .tickFormat(d3.format('$,'))
            );
    };

    plotDataPoints = (plot) => {

        let currentYear = null;
        let delay = 1000;
        let totalDelay = (this.viewModel.dateCount * 5) + delay + 100;

        this.viewModel.data.forEach(item => {

            let fill = item.value > this.viewModel.upperControlLimit
                ? '#008800'
                : item.value < this.viewModel.lowerControlLimit
                    ? '#FF0000'
                    : '#0088FF';

            let colorDelay = item.value > this.viewModel.upperControlLimit
                ? totalDelay - delay + 3000
                : item.value < this.viewModel.lowerControlLimit
                    ? totalDelay - delay + 5000
                    : totalDelay - delay + 1000;

            if ((item.year * 100 + item.month) !== currentYear) {
                currentYear = item.year * 100 + item.month;
                delay = delay + 5;
            }

            plot.append('circle')
                .attr('r', 0)
                .attr('cx', () => { return this.viewModel.xScale(item.date); })
                .attr('cy', () => { return this.viewModel.yScale(item.value); })
                .attr('fill', '#333333')
                .attr('fill-opacity', '0.35')
                .transition()
                    .delay(delay)
                    .attr('r', 5)
                .transition()
                    .delay(100)
                    .attr('r', 2)
                    .attr('fill-opacity', '0.15')
                .transition()
                    .delay(colorDelay)
                    .attr('r', 5)
                    .attr('fill', fill)
                .transition()
                    .delay(100)
                    .attr('r', 2)
                    .attr('fill-opacity', '0.25');
        });

        return totalDelay;
    };

    plotLine = (plot, delay, value, color, useDash) => {

        const fY = () => { return this.viewModel.yScale(value); };

        return plot.append('line')
            .attr('x1', '45').attr('x2', '705')
            .attr('y1', fY).attr('y2', fY)
            .attr('stroke', color)
            .attr('stroke-width', '5')
            .attr('stroke-opacity', '0')
            .style('stroke-dasharray', (useDash ? '8, 5' : '1, 0'))
            .transition()
                .delay(delay + 1000)
                .attr('stroke-opacity', '0.75')
            .transition()
                .delay(100)
                .attr('stroke-width', '1')
                .attr('stroke-opacity', '0.5');
    };

    renderSvg = () => {

        this.emitTime('renderSvg BEGIN');

        let plot = d3.select(this.svg)
            .attr("width", 720)
            .attr("height", 300);

        // It must be cleared on re-draw.
        plot.selectAll("*").remove();

        this.plotTimeStamp(plot);
        this.plotAxes(plot);
        let plotDataPointDelay = this.plotDataPoints(plot);
        this.plotLine(plot, plotDataPointDelay, this.viewModel.average, '#0088FF', false);
        this.plotLine(plot, plotDataPointDelay + 2000, this.viewModel.upperControlLimit, '#008800', true);
        this.plotLine(plot, plotDataPointDelay + 4000, this.viewModel.lowerControlLimit, '#FF0000', true);

        this.emitTime('renderSvg END');
    };

    render() {
        this.emitTime('render');
        return (
            <svg ref={this.setSvgRef} />
        );
    }
}

// PropTypes
ShewhartFlashyPlotChart.propTypes = {
    stats: PropTypes.array.isRequired,
    timeStamp: PropTypes.number.isRequired
}

export default ShewhartFlashyPlotChart;