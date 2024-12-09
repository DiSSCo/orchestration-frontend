/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


const DataMappingsOverviewTableConfig = () => {
    interface DataRow {
        index: number,
        id: string,
        name: string,
        description: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<DataRow>();

    const columns = [
        columnHelper.accessor('id', {
            header: 'Identifier',
            meta: {
                widthInRem: 14,
                sortable: true
            }
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            meta: {
                widthInRem: 16,
                sortable: true
            }
        }),
        columnHelper.accessor('description', {
            header: 'Description',
            meta: {
                widthInRem: 20
            }
        })
    ];

    return {
        columns: columns
    };
}

export default DataMappingsOverviewTableConfig;