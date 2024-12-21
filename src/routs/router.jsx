import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Homepage from "../Layout/Homepage";
import Register from "../Pages/Register";
import Signin from "../Pages/Signin";
import AddJob from "../Pages/AddJob";
import MyAddedJobs from "../Pages/MyAddedJobs";
import AllJobs from "../Pages/AllJobs";
import UpdateJob from "../Pages/UpdateJob";
import ApplyForm from "../Pages/ApplyForm";
import Mybids from "../Pages/Mybids";
import BidRequest from "../Pages/BidRequest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Homepage></Homepage>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/signin",
                element: <Signin></Signin>
            },
            {
                path: "/add-job",
                element: <AddJob></AddJob>
            },
            {
                path: "/my-added-jobs",
                element: <MyAddedJobs></MyAddedJobs>
            },
            {
                path: "/all-jobs",
                element: <AllJobs></AllJobs>,
                loader: () => fetch("http://localhost:5000/all_jobs")
            },
            {
                path: "/update/:id",
                element: <UpdateJob></UpdateJob>
            },
            {
                path: "/bid-request",
                element: <BidRequest></BidRequest>
            },
            {
                path: "/my-bids",
                element: <Mybids></Mybids>
            }
            ,
            {
                path: "/apply-jobs/:id",
                element: <ApplyForm></ApplyForm>
            }
        ]
    }
])
export default router;