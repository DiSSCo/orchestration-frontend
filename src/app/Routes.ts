/* Import Routes */
import HomeRoutes from 'components/home/Routes';
import DataMappingRoutes from 'components/dataMapping/Routes';
import MasRoutes from 'components/mas/Routes';
import SourceSystemRoutes from 'components/sourceSystem/Routes';


/* Routes for application */
const AppRoutes: JSX.Element[] = [
    ...HomeRoutes,
    ...DataMappingRoutes,
    ...MasRoutes,
    ...SourceSystemRoutes
];

export default AppRoutes;