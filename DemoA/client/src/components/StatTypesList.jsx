import React, { useEffect } from 'react';
import { useStatTypeDataContext } from '../contexts/StatTypeData';
import StatTypeListItem from './StatTypeListItem';

function StatTypesList() {

    const data = useStatTypeDataContext();

    useEffect(() => {
        if (data.statTypes === null) {
            data.getAll();
        }
    }, []);

    return data.statTypes === null ? (
        <p>loading...</p>
    ) : (
            data.statTypes.length === 0 ? (
                <p>No stat types exist.</p>
            ) : (
                    <ul>
                        {
                            data.statTypes
                            .sort((a, b) => {

                                let nameA = a.name.toUpperCase();
                                let nameB = b.name.toUpperCase();

                                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                            })
                            .map((statType) => {
                                return (
                                    <StatTypeListItem
                                        key={statType.id}
                                        id={statType.id}
                                        name={statType.name}
                                        onDelete={data.remove} />
                                )
                            })
                        }
                    </ul>
                )
        );
}

export default StatTypesList;