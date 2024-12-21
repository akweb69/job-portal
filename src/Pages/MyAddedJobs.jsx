import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyAddedJobs = () => {
    const [allAddedJobs, setAddedJobs] = useState([]);
    const { user, } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:5000/all_jobs", { withCredentials: true })
            .then(data => {
                setLoading(true)
                const alljobs = data.data
                const myData = alljobs?.filter(jj => jj.buyer.email === user?.email)
                setAddedJobs(myData);
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [user?.email])
    console.log(allAddedJobs)
    console.log(loading)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:5000/all_jobs/${id}`)
                        .then(data => {
                            const delData = data.data;
                            if (delData.deletedCount > 0) {
                                axios.get("http://localhost:5000/all_jobs")
                                    .then(data => {
                                        setLoading(true)
                                        const alljobs = data.data
                                        const myData = alljobs.filter(jj => jj.buyer.email === user?.email)
                                        setAddedJobs(myData);
                                        setLoading(false)

                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        console.log(id)
    }

    // if (loading) {
    //     return <Loading></Loading>
    // }

    return (
        <div className="w-full min-h-screen bg-[rgb(0,0,31)] md:py-20 py-10">
            <div className="w-11/12 mx-auto">
                <div className="text-white flex items-center gap-2">
                    <div className="">Total My Added Jobs :</div>
                    <div className="px-3 py-1 bg-indigo-500 text-xs font-semibold rounded-full">{allAddedJobs?.length < 10 ? "0" + allAddedJobs?.length : allAddedJobs?.length}</div>
                </div>
                {/* tables */}
                <div className="">
                    {
                        loading ? <Loading></Loading> : <div className="w-full pt-10 overflow-x-auto py-5 ">
                            <table className="w-full">
                                <thead className="border border-indigo-800 bg-indigo-200 ">
                                    <tr className="">
                                        <th className="py-2 text-xs md:text-sm">SL.</th>
                                        <th className="py-2 bg-indigo-300 text-xs md:text-sm">Job Title</th>
                                        <th className="py-2 bg-indigo-400 text-xs md:text-sm">Category</th>
                                        <th className="py-2 bg-indigo-500 text-xs md:text-sm"> Price Range</th>
                                        <th className="py-2 bg-indigo-600 text-xs md:text-sm">Deadline</th>
                                        <th className="py-2 bg-indigo-700 text-xs md:text-sm">Decription</th>
                                        <th className="py-2 bg-indigo-800 text-xs md:text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allAddedJobs?.map((j, idx) => <tr className="border border-indigo-700" key={idx}>
                                            <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">{idx < 10 ? "0" + (idx + 1) : idx}</td>
                                            <td className="py-2 border text-nowrap border-indigo-700  px-4 font-semibold text-xs md:text-sm">{j.postData.job_title}</td>
                                            <td className={`py-2 border text-nowrap border-indigo-700  px-4 font-semibold text-xs ${j.postData.category === "Web Development" && "text-indigo-500"} ${j.postData.category === "App Development" && "text-red-400"} ${j.postData.category === "Graphics Design" && "text-purple-500"} ${j.postData.category === "Video Editing" && "text-pink-500"} ${j.postData.category === "Digital Marketing" && "text-yellow-500"} md:text-sm`}>{j.postData.category}</td>
                                            <td className="py-2 border text-nowrap border-indigo-700  px-4 font-semibold text-center text-xs md:text-sm">{j.postData.min_price} - {j.postData.max_price}</td>
                                            <td className="py-2 border text-nowrap border-indigo-700 text-center px-4 font-semibold text-xs md:text-sm">{j.postData.deadline}</td>
                                            <td className="py-2 border text-nowrap border-indigo-700 text-center px-4 font-semibold text-xs md:text-sm ">
                                                {/* <div className="flex justify-center items-center gap-2">
                                                <span className="size-1 rounded-full bg-yellow-300"></span>
                                                pending
                                            </div> */}
                                                {
                                                    j.postData.description?.slice(0, 30) + "..."
                                                }
                                            </td>
                                            <td className="py-2 border text-nowrap border-indigo-700  px-4 font-semibold">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Link to={`/update/${j._id}`} className="py-1 px-2 bg-yellow-400 text-white text-center rounded-sm cursor-pointer hover:bg-yellow-600"><FiEdit />
                                                    </Link>
                                                    <div onClick={() => handleDelete(j._id)} className="py-1 px-2 bg-red-400 text-white text-center rounded-sm cursor-pointer hover:bg-red-600"><MdDeleteForever />
                                                    </div>
                                                </div>
                                            </td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>

                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default MyAddedJobs;