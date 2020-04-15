import React, { useState } from 'react';
import { useStatTypeDataContext } from '../contexts/StatTypeData';
import { Link, Redirect } from 'react-router-dom';

function AddStatType() {

    const data = useStatTypeDataContext();

    const [wasSaved, setWasSaved] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const [name, setName] = useState('');

    const [valueType, setValueType] = useState(0);

    const nameChanged = (e) => {
        setName(e.target.value);
    };

    const valueTypeChanged = (e) => {
        setValueType(parseInt(e.target.value));
    };

    const saveClicked = () => {
        setIsSaving(true);
        data.add(
            {
                name: name,
                valueType: valueType
            }, () => {
                setWasSaved(true)
            }, () => {
                setIsSaving(false)
            });
    };

    return wasSaved ? (
        <Redirect to="/old-crud" />
    ) : (
            <>
                <h2>New Stat Type</h2>
                <dl>
                    <dt>Name:</dt>
                    <dd>
                        <input
                            value={name}
                            onChange={nameChanged}
                            readOnly={isSaving} />
                    </dd>
                    <dt>Value Type:</dt>
                    <dd>
                        <select value={valueType} onChange={valueTypeChanged}>
                            <option value="0">Bit</option>
                            <option value="1">Integer</option>
                            <option value="2">Decimal</option>
                        </select>
                    </dd>
                </dl>
                <div>
                    <button
                        disabled={name.length === 0 || isSaving}
                        onClick={saveClicked}>Save</button>
                    <span>&nbsp;</span>
                    {isSaving ? (
                        <span>saving...</span>
                    ) : (
                            <Link to="/old-crud">cancel...</Link>
                        )}
                </div>
            </>
        );
}

export default AddStatType;
