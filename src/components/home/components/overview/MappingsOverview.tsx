/* Import Dependencies */
import { AgGridReact } from 'ag-grid-react';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMappings } from 'redux/mapping/MappingSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/* Import Components */
import OverviewTable from './OverviewTable';


const MappingsOverview = () => {
    /* Base variables */
    const mappings = useAppSelector(getMappings);

    /* Table rows */
    const rows: Dict[] = [];

    mappings.forEach((mapping) => {
        rows.push({
            identifier: mapping.id,
            name: mapping.mapping.name,
            description: mapping.mapping.description
        });
    });

    /* Table columns */
    const columns = [
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'description', flex: 1, suppressSizeToFit: true, sortable: true }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default MappingsOverview;