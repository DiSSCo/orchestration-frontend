/* Import Dependencies */
import { AgGridReact } from 'ag-grid-react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


/* Props Typing */
interface Props {
    columns: Dict[],
    rows: Dict[]
};


const OverviewTable = (props: Props) => {
    const { columns, rows } = props;
    
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

export default OverviewTable;