import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Register from "./src/components/Register";
import Error404 from "./src/components/Error404";


const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,

    },
    {
        path: "/registro",
        element: <Register />,

    },
    {
        path: "*",
        element: <Error404 />,
    },
])





export default router;