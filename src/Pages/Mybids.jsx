import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Auth/AuthContext';
import axios from 'axios';
import Loading from './Loading';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Mybids = () => {
    const { user, setLoading, loading } = useContext(AuthContext);
    const [allData, setAllData] = useState([]);


    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/all-application/${user?.email}`)
            .then(data => {
                const newData = data.data;
                setAllData(newData)
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            })
    }, [user?.email])
    console.log(allData)


    const handleStatus = (id, prevStatus, newStatus) => {
        console.log(id, prevStatus, newStatus)
        axios.patch(`http://localhost:5000/bid-status-update/${id}?prevStatus=${prevStatus}`, { newStatus })
            .then(data => {
                const res = data.data;
                console.log(res)
                axios.get(`http://localhost:5000/all-application/${user?.email}`)
                    .then(data => {
                        const newData = data.data;
                        setAllData(newData)
                        setLoading(false)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='w-full min-h-screen bg-[rgb(0,0,31)] '>
            {
                loading && user?.email ? <Loading></Loading> : <div className="w-11/12 mx-auto md:w-10/12 py-10 md:py-20">
                    <div className="text-white md:text-xl flex gap-2 items-center mb-5">
                        My bids : <span className="py-1 px-3 bg-[rgb(0,0,77)] rounded-lg ">{allData.length < 10 ? "0" + allData.length : allData.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full ">
                            <thead className="border border-indigo-800 bg-indigo-200 ">
                                <tr className="">
                                    <th className="py-2 text-xs md:text-sm">SL.</th>
                                    <th className="py-2 bg-indigo-300 text-xs md:text-sm">Job Title</th>
                                    <th className="py-2 bg-indigo-400 text-xs md:text-sm">Category</th>
                                    <th className="py-2 bg-indigo-500 text-xs md:text-sm"> Price </th>
                                    <th className="py-2 bg-indigo-600 text-xs md:text-sm">Deadline</th>
                                    <th className="py-2 bg-indigo-800 text-xs md:text-sm">Status</th>
                                    <th className="py-2 bg-indigo-800 text-xs md:text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData?.map((bid, idx) => <tr key={bid?._id}>
                                        <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">{idx < 10 ? "0" + (idx + 1) : idx + 1}</td>
                                        <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">{bid?.title}</td>
                                        <td className={`py-2 border text-nowrap text-center border-indigo-700  px-4 font-semibold text-xs ${bid?.category === "Web Development" && "text-indigo-500"} ${bid?.category === "App Development" && "text-red-400"} ${bid?.category === "Graphics Design" && "text-purple-500"} ${bid?.category === "Video Editing" && "text-pink-500"} ${bid?.category === "Digital Marketing" && "text-yellow-500"} md:text-sm`}>{bid?.category}</td>
                                        <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">${bid?.price}</td>
                                        <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">{bid?.runningDate}</td>
                                        <td className="py-2 border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm"> <div className={`flex text-xs justify-center items-center gap-2 ${bid.status === "In Progress" && "pending" ? "text-yellow-400" : "text-green-400"}`}>
                                            <span className={`size-1 rounded-full ${bid.status === "In Progress" && "Pending" ? "bg-yellow-400" : "bg-green-400"} `}></span>
                                            {bid.status}
                                        </div>
                                        </td>
                                        <td className="py-2  border text-nowrap px-3 border-indigo-700 text-center text-xs md:text-sm">
                                            <button
                                                className='size-6 mx-auto flex justify-center items-center text-lg p-1 rounded-full hover:bg-indigo-700  hover:text-yellow-100 cursor-pointer hover:border border-purple-200 text-green-400 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent'
                                                disabled={bid.status !== "In Progress"}
                                                onClick={() => handleStatus(bid._id, bid.status, "Completed")}>
                                                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline>
                                            </button>
                                        </td>

                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </div >
    );
};

export default Mybids;