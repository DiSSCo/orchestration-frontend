/* Import Routes */
import HomeRoutes from 'components/home/Routes';
import MappingRoutes from 'components/mapping/Routes';
import MasRoutes from 'components/mas/Routes';
import SourceSystemRoutes from 'components/sourceSystem/Routes';


/* Routes for application */
const AppRoutes: JSX.Element[] = [
    ...HomeRoutes,
    ...MappingRoutes,
    ...MasRoutes,
    ...SourceSystemRoutes
];

export default AppRoutes;