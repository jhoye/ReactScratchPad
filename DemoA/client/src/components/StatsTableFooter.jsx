import React, { useState } from 'react';
import { useStatDataContext } from '../contexts/StatData';
import PropTypes from 'prop-types';

function StatsTableFooter(props) {

    const data = useStatDataContext();

    const [isSaving, setIsSaving] = useState(false);

    const [date, setDate] = useState((new Date()).toJSON().substr(0, 10));

    const [value, setValue] = useState(0);

    const dateChanged = (e) => {
        setDate(e.target.value);
    };

    const valueChanged = (e) => {

        let inputValue;

        switch (props.statType.valueType) {
            case 0:
                inputValue = parseFloat(e.target.value) !== 0 ? 1 : 0;
                break;
            case 1:
                inputValue = parseInt(e.target.value);
                break;
            case 2:
                inputValue = parseFloat(e.target.value);
                break;
            default:
                inputValue = NaN;
                break;
        }

        setValue(Number.isNaN(inputValue) ? 0 : inputValue);
    };

    const addClicked = () => {
        setIsSaving(true);
        data.add(
            {
                statType: props.statType,
                date: date,
                value: value
            }, () => {
                setIsSaving(false);
            }, () => {
                setIsSaving(false);
            });
    };

    return (
        <tfoot>
            {isSaving ? (
                <tr>
                    <td colSpan="3">saving...</td>
                </tr>
            ) : (
                    <tr>
                        <td>
                            <input type="date"
                                value={date}
                                onChange={dateChanged} />
                        </td>
                        <td>{(() => {
                            switch (props.statType.valueType) {
                                case 0:
                                    return <input type="number" value={value} onChange={valueChanged} min="0" max="1" />
                                case 1:
                                    return <input type="number" value={value} onChange={valueChanged} />
                                case 2:
                                    return <input type="number" value={value} onChange={valueChanged} step="0.1" />
                                default:
                                    return <input type="number" value={value} onChange={valueChanged} />
                            }
                        })()}
                        </td>
                        <td><button onClick={addClicked}>Add</button></td>
                    </tr>
                )}
        </tfoot>
    )
}

// PropTypes
StatsTableFooter.propTypes = {
    statType: PropTypes.object.isRequired
}

export default StatsTableFooter;