import React, { useEffect } from 'react';
import { useStatDataContext } from '../contexts/StatData';
import PropTypes from 'prop-types';
import StatsTableRow from './StatsTableRow';
import StatsTableFooter from './StatsTableFooter';

function StatsTable(props) {

    const id = props.statType.id;

    const data = useStatDataContext();

    const valueTypeLabel = () => {
        switch (props.statType.valueType) {
            case 0:
                return 'Bit';
            case 1:
                return 'Integer';
            case 2:
                return 'Decimal';
            default:
                return '?';
        }
    };

    useEffect(() => {
        if (data.stats === null) {
            data.getAll(id);
        }
    }, [id]);

    return (
        <table className="stats">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Value ({valueTypeLabel()})</td>
                    <td>&nbsp;</td>
                </tr>
            </thead>
            <tbody>
                {data.stats === null ? (
                    <tr>
                        <td colSpan="3">loading...</td>
                    </tr>
                ) : (
                    data.stats.length === 0 ? (
                        <tr>
                            <td colSpan="3">No stats exist.</td>
                        </tr>
                    ) : (data.stats
                        .sort((a, b) => new Date(a.date).valueOf() < new Date(b.date).valueOf() ? 1 : -1)
                        .map((stat) => {
                            return (
                                <StatsTableRow
                                    key={stat.id}
                                    stat={stat} />
                            )
                        })
                    )
                )}
            </tbody>
            <StatsTableFooter
                statType={props.statType} />
        </table>
    );
}

// PropTypes
StatsTable.propTypes = {
    statType: PropTypes.object.isRequired
}

export default StatsTable;