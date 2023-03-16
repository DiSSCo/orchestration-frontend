/* Import Dependencies */
import { AgGridReact } from 'ag-grid-react';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const SourceSystemsTable = () => {
    /* Base variables */
    const sourceSystems = useAppSelector(getSourceSystems);

    /* Table rows */
    const rows: Dict[] = [];

    sourceSystems.forEach((sourceSystem) => {
        rows.push({
            identifier: sourceSystem.id,
            name: sourceSystem.sourceSystem.name,
            endpoint: sourceSystem.sourceSystem.endpoint
        });
    });

    /* Table columns */
    const columns = [
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'endpoint', flex: 1, suppressSizeToFit: true, sortable: true }
    ];

    return (
        <Row className="h-100">
            <Col className="h-100">
                <div className={`w-100 h-100 ag-theme-alpine`}>
                    <AgGridReact
                        rowData={rows}
                        columnDefs={columns}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default SourceSystemsTable;