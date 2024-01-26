/* Import Dependencies */
import { AgGridReact } from 'ag-grid-react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

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

    const getRowStyle = (params: Dict) => {
        const data = { ...params.data };

        if (Number(data.index) % 2 === 0) {
            return { background: "rgb(238, 247, 244)" };
        }

        return undefined;
    };

    const gridOptions = {
        pagination: true,
        enableCellTextSelection: true,
        ensureDomOrder: true
    }

    return (
        <Row className="h-100">
            <Col className="h-100">
                <div className={`w-100 h-100 ag-theme-alpine`}>
                    <AgGridReact
                        rowData={rows}
                        columnDefs={columns}
                        gridOptions={gridOptions}
                        getRowStyle={getRowStyle}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default OverviewTable;