/* Import Dependencies */
import { useNavigate } from 'react-router-dom';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getSourceSystems } from 'redux-store/SourceSystemSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/* Import Config */
import SourceSystemsOverviewTableConfig from 'app/config/tables/SourceSystemsOverviewTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';


const SourceSystemsOverview = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const sourceSystems = useAppSelector(getSourceSystems);

    /* Data Row Typing */
    interface DataRow {
        index: number,
        id: string,
        name: string,
        endpoint: string
    };

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    sourceSystems.forEach((sourceSystem) => {
        rows.push({
            index: index,
            id: sourceSystem.id,
            name: sourceSystem.name,
            endpoint: sourceSystem.endpoint,
            type: "sourceSystem"
        });

        index++;
    });

    /* Table columns */
    const { columns } = SourceSystemsOverviewTableConfig();

    return (
        <div className="h-100 overflow-scroll b-secondary rounded-c">
            <DataTable columns={columns}
                data={rows}
                SelectAction={(row: DataRow) => navigate(`/sourceSystem/${row.id}`)}
            />
        </div>
    );
}

export default SourceSystemsOverview;