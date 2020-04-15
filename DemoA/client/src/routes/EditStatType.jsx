import React, { useState, useEffect } from 'react';
import { useStatTypeDataContext } from '../contexts/StatTypeData';
import { Link, Redirect } from 'react-router-dom';

function EditStatType({ match }) {

    const id = match.params.id;

    const data = useStatTypeDataContext();

    const [wasSaved, setWasSaved] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const [name, setName] = useState(null);

    const [valueType, setValueType] = useState(0);

    const nameChanged = (e) => {
        setName(e.target.value);
    };

    const valueTypeChanged = (e) => {
        setValueType(parseInt(e.target.value));
    };

    const saveClicked = () => {
        setIsSaving(true);
        data.update(
            {
                id: id,
                name: name,
                valueType: valueType
            }, () => {
                setWasSaved(true)
            }, () => {
                setIsSaving(false)
            });
    };

    useEffect(() => {
        data.getById(
            id,
            (statType) => {
                setName(statType.name);
                setValueType(statType.valueType);
            });
    }, [id]);

    return wasSaved ? (
        <Redirect to={`/old-crud/view/${id}`} />
    ) : (
            <>
                <h2>Edit Stat Type</h2>
                {name === null ? (
                    <p>loading...</p>
                ) : (
                        <>
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
                            <button
                                disabled={name.length === 0 || isSaving}
                                onClick={saveClicked}>Save</button>
                            <span>&nbsp;</span>
                        </>
                    )}
                {isSaving ? (
                    <span>saving...</span>
                ) : (
                        <Link to={`/old-crud/view/${id}`}>cancel...</Link>
                    )}
            </>
        );
}

export default EditStatType;
