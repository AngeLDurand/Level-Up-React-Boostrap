import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Register from "./src/components/Register";


const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
    },
    {
        path: "/registro",
        element: <Register />,
    },
])





export default router;