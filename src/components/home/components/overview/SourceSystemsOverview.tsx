/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/* Import Components */
import OverviewTable from './table/OverviewTable';


const SourceSystemsOverview = () => {
    /* Base variables */
    const sourceSystems = useAppSelector(getSourceSystems);

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    sourceSystems.forEach((sourceSystem) => {
        rows.push({
            index: index,
            identifier: sourceSystem.id,
            name: sourceSystem.name,
            endpoint: sourceSystem.endpoint,
            type: "sourceSystem"
        });

        index++;
    });

    /* Table columns */
    const columns = [
        { field: 'index', hide: true },
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'endpoint', flex: 1, suppressSizeToFit: true, sortable: true }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default SourceSystemsOverview;