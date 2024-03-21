import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashbord from "../../features/activities/dashbord/ActivityDashbord";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'activities', element: <ActivityDashbord /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'notFound', element: <NotFound /> },
            { path: '*', element: <NotFound /> },
        ]
    }
]

export const router = createBrowserRouter(routes);