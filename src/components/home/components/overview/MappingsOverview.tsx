/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMappings } from 'redux/mapping/MappingSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import OverviewTable from './table/OverviewTable';


const MappingsOverview = () => {
    /* Base variables */
    const mappings = useAppSelector(getMappings);

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    mappings.forEach((mapping) => {
        rows.push({
            index: index,
            identifier: mapping.id,
            name: mapping.name,
            description: mapping.description,
            type: "mapping"
        });

        index++;
    });

    /* Table columns */
    const columns = [
        { field: 'index', hide: true },
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'description', flex: 1, suppressSizeToFit: true, sortable: true }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default MappingsOverview;