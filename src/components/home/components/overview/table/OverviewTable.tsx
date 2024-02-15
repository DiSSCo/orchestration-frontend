/* Import Dependencies */
import { Navigate, useNavigate } from 'react-router-dom';
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

    /* Hooks */
    const navigate = useNavigate();

    const getRowStyle = (params: Dict) => {
        const data = { ...params.data };

        if (Number(data.index) % 2 === 0) {
            return { background: "rgb(238, 247, 244)" };
        }

        return undefined;
    };

    /* Function for navigating to the detail page of a record */
    const NavigateToDetailPage = (row: Dict) => {
        navigate(`/${row.data.type}/${row.data.identifier}`);
    }

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
                        onRowClicked={(row: Dict) => NavigateToDetailPage(row)}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default OverviewTable;