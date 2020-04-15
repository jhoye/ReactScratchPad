import React, { useState } from 'react';
import { useStatDataContext } from '../contexts/StatData';
import PropTypes from 'prop-types';

function StatsTableRow(props) {

    const data = useStatDataContext();

    //const valueType = props.stat.statType.valueType;

    const [isSaving, setIsSaving] = useState(false);

    const [date, setDate] = useState('');

    const [value, setValue] = useState(0);

    const [isDeleting, setIsDeleting] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const editMe = () => {
        setIsLoading(true);
        setDate((new Date(props.stat.date)).toJSON().substr(0, 10));
        setValue(props.stat.value);
        data.getById(props.stat.id, () => {
            setIsLoading(false);
        });
    };

    const dateChanged = (e) => {
        setDate(e.target.value);
    };

    const valueChanged = (e) => {

        let inputValue;

        console.info('test: ', props);
        console.info('test: ', props.stat);
        console.info('test: ', props.stat.statType);
        console.info('test: ', props.stat.statType.valueType);

        switch (props.stat.statType.valueType) {
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

    const saveClick = () => {
        setIsSaving(true);
        data.update(
            {
                id: data.stat.id,
                date: date,
                value: value,
                statType: data.stat.statType
            }, () => {
                setIsSaving(false);
                data.setStat(null);
            }, () => {
                setIsSaving(false);
                data.setStat(null);
            });
    };

    const cancelClick = () => {
        data.setStat(null);
    };

    const deleteClick = () => {
        if (window.confirm('This will be deleted forever.')) {
            setIsDeleting(true);
            data.remove(props.stat.id);
        }
    };

    const dateString = () => {
        return (new Date(props.stat.date)).toLocaleDateString()
    };

    return isDeleting ? (
            <tr>
                <td colSpan="3">deleting...</td>
            </tr>
        ) : isLoading ? (
            <tr>
                <td colSpan="3">loading...</td>
            </tr>
        ) : isSaving ? (
            <tr>
                <td colSpan="3">saving...</td>
            </tr>
        ) : data.stat !== null && props.stat.id === data.stat.id ? (
            <tr>
                <td>
                    <input type="date"
                        onChange={dateChanged}
                        value={date} />
                </td>
                <td>
                    {(() => {
                        switch (data.stat.statType.valueType) {
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
                <td>
                    <button onClick={saveClick}>Save</button>
                    &nbsp;
                    <span className="link-button" onClick={cancelClick}>cancel...</span>
                </td>
            </tr>
        ) : (
            <tr>
                <td onClick={editMe} className="editable">{dateString()}</td>
                <td onClick={editMe} className="editable">{props.stat.value}</td>
                <td><button onClick={deleteClick}>X</button></td>
            </tr>
        );
}

// PropTypes
StatsTableRow.propTypes = {
    stat: PropTypes.object.isRequired
}

export default StatsTableRow;