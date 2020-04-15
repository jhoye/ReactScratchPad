import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as _ from 'lodash';

class SumTrendChart extends React.Component {

    componentDidMount() {
        this.renderSvg();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.svg);
    }

    setSvgRef = (element) => {
        this.svg = element;
    };

    renderSvg = () => {

        /////////////////////////////////////
        // PREP DATA:

        // data /////////////////////////
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

        // sums /////////////////////////
        let sums = _.uniqBy(data.map((date) => {
            return {
                dateString: date.dateString,
                year: date.year,
                month: date.month,
                date: date.date,
                sum: data
                    .filter(item => item.year === date.year && item.month === date.month)
                    .map(item => item.value)
                    .reduce((a, b) => a + b, 0)
            };
        }), 'dateString');
        let average = sums
            .map(item => item.sum)
            .reduce((a, b) => a + b, 0) / sums.length;

        // control limts /////////////////////////
        let findStandardDeviation = (arr) => {

            let n = arr.length;
            let mean = arr.reduce((a, b) => a + b) / n;

            return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        };
        let standardDeviation = findStandardDeviation(
            sums.map(item => item.sum)
        );
        let upperControlLimit = 3 * standardDeviation + average;
        let lowerControlLimit = -3 * standardDeviation + average;

        // x scale /////////////////////////
        let xScale = d3
            .scaleTime()
            .domain([dates[0].date, dates[dates.length - 1].date])
            .range([50, 700]);

        // y scale /////////////////////////
        let values = sums.map(d => d.sum);
        let max = Math.max(...values);
        let min = Math.min(...values);
        let yScale = d3
            .scaleLinear()
            .domain([
                max > upperControlLimit ? max : upperControlLimit,
                min < lowerControlLimit ? min : lowerControlLimit
            ])
            .range([10, 260]);


        /////////////////////////////////////
        // PLOTTING:

        // plot //////////////////////////////
        let plot = d3.select(this.svg)
            .attr("width", 720)
            .attr("height", 300);

        // It must be cleared on re-draw.
        plot.selectAll("*").remove();

        // lines /////////////////////////
        let plotLine = (value, color, useDash) => {
            plot.append('line')
                .attr('x1', '45').attr('x2', '705')
                .attr('y1', () => { return yScale(value); })
                .attr('y2', () => { return yScale(value); })
                .attr('stroke', color)
                .attr('stroke-width', '1')
                .attr('stroke-opacity', '0.5')
                .style('stroke-dasharray', (useDash ? '8, 5' : '1, 0'));
        };
        plotLine(upperControlLimit, '#008800', true);
        plotLine(average, '#000000', false);
        plotLine(lowerControlLimit, '#FF0000', true);

        // sums //////////////////////
        plot.append('path')
            .datum(sums.sort((a, b) => (a.year * 100 + a.month) - (b.year * 100 + b.month)))
            .attr('fill', 'none')
            .attr('stroke', '#0088ff')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', '0.5')
            .attr('d', d3.line()
                .x((d) => xScale(d.date))
                .y((d) => yScale(d.sum))
            );
        sums.forEach(item => {

            let fill = item.sum > upperControlLimit
                ? '#008800'
                : item.sum < lowerControlLimit
                    ? '#FF0000'
                    : null;

            if (fill !== null) {
                plot.append('circle')
                    .attr('r', 2)
                    .attr('cx', () => { return xScale(item.date); })
                    .attr('cy', () => { return yScale(item.sum); })
                    .attr('fill', fill)
                    .attr('fill-opacity', '0.5');
            }
        });

        // axes /////////////////////////
        plot.append('g')
            .attr('transform', 'translate(0, 270)')
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat('%b %y'))
            );
        plot.append("g")
            .attr('transform', 'translate(40, 0)')
            .call(d3.axisLeft(yScale)
                .tickFormat(d3.format('$,'))
            );
    };

    render() {
        return (
            <svg ref={this.setSvgRef} />
        );
    }
}

// PropTypes
SumTrendChart.propTypes = {
    stats: PropTypes.array.isRequired
}

export default SumTrendChart;