import React, { useEffect, useState } from 'react';
import { useStatisticsDataContext } from '../contexts/StatisticsData';
import FlashyPlotChart from '../components/graphs/ShewhartFlashyPlotChart';
import PlotChart from '../components/graphs/ShewhartPlotChart';
import Chart from '../components/graphs/ShewhartChart';
import TrendChart from '../components/graphs/ShewhartTrendChart';

function Graphs() {

    const data = useStatisticsDataContext();

    const [timeStamp, setTimeStamp] = useState(0);

    const reload = () => {
        setTimeStamp((new Date()).valueOf());
    };

    useEffect(() => {
        data.getAll();
    }, []);

    return data.statistics === null ? (
        <p>loading...</p>
    ) : (
        <div>
            <h2>Monthly Sales (flashy chart)</h2>
            <button onClick={reload}>Reload</button>
            <FlashyPlotChart stats={data.statistics} timeStamp={timeStamp} />
            <br />
            <h2>Monthly Sales</h2>
            <PlotChart stats={data.statistics} />
            <br />
            <h2>Monthly Average Size of Sale</h2>
            <Chart stats={data.statistics} />
            <br />
            <h2>Total Monthly Sales</h2>
            <TrendChart stats={data.statistics} />
        </div>
    );
}

export default Graphs;