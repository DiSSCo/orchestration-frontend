/* Import Dependencies */
import { useNavigate } from 'react-router-dom';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMachineAnnotationServices } from 'redux-store/MasSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Config */
import MasOverviewTableConfig from 'app/config/tables/MasOverviewTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';


const MasOverview = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const machineAnnotationServices = useAppSelector(getMachineAnnotationServices);

    /* Data Row Typing */
    interface DataRow {
        index: number,
        id: string,
        name: string,
        containerImage: string
    };

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    machineAnnotationServices.forEach((machineAnnotationService) => {
        rows.push({
            index: index,
            id: machineAnnotationService['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), ''),
            name: machineAnnotationService['schema:name'],
            containerImage: machineAnnotationService['ods:containerImage'],
            type: "MAS"
        });

        index++;
    });

    /* Table columns */
    const { columns } = MasOverviewTableConfig();

    return (
        <div className="h-100 overflow-scroll b-secondary rounded-c">
            <DataTable columns={columns}
                data={rows}
                SelectAction={(row: DataRow) => navigate(`/mas/${row.id}`)}
            />
        </div>
    );
}

export default MasOverview;