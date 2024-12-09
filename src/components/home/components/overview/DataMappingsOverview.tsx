/* Import Dependencies */
import { useNavigate } from 'react-router-dom';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getDataMappings } from 'redux-store/DataMappingSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Config */
import MappingsOverviewTableConfig from 'app/config/tables/DataMappingsOverviewTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';


const DataMappingsOverview = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const dataMappings = useAppSelector(getDataMappings);

    /* Data Row Typing */
    interface DataRow {
        index: number,
        id: string,
        name: string,
        description: string
    };

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    dataMappings.forEach((dataMapping) => {
        rows.push({
            index: index,
            id: dataMapping['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), ''),
            name: dataMapping['schema:name'],
            description: dataMapping['schema:description'],
            type: "mapping"
        });

        index++;
    });

    /* Table columns */
    const { columns } = MappingsOverviewTableConfig();

    return (
        <div className="h-100 overflow-scroll b-secondary rounded-c">
            <DataTable columns={columns}
                data={rows}
                SelectAction={(row: DataRow) => navigate(`/dataMapping/${row.id}`)}
            />
        </div>
    );
}

export default DataMappingsOverview;