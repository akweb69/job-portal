import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Auth/AuthContext';
import Loading from './Loading';
import { motion } from "framer-motion";
import { IoMdCheckmark } from "react-icons/io";
import { MdBlockFlipped } from "react-icons/md";

const BidRequest = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [bids, setBids] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/all-bid-request/${user?.email}`)
            .then(data => {
                const newData = data.data;
                setBids(newData)
                console.log(newData)

            })
            .catch(err => {
                console.log(err)
            })
    }, [user?.email])

    if (user && user?.email) {
        setLoading(false)
    }
    const handleStatus = (id, prevStatus, newStatus) => {
        console.log(id, prevStatus, newStatus)
        axios.patch(`http://localhost:5000/bid-status-update/${id}?prevStatus=${prevStatus}`, { newStatus })
            .then(data => {
                const res = data.data;
                console.log(res)
                axios.get(`http://localhost:5000/all-bid-request/${user?.email}`)
                    .then(data => {
                        const newData = data.data;
                        setBids(newData)
                        console.log(newData)

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
            {loading ?
                <Loading></Loading>
                :
                <div className="">

                    {
                        bids?.length > 0 ?
                            <div className="w-11/12 mx-auto py-10 md:py-20">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="flex gap-2 items-center">
                                    <div className="text-yellow-300 capitalize">Total bid request :</div>
                                    <div className="text-xs px-3 py-1 bg-purple-300 text-purple-950 rounded-full">{bids?.length < 10 ? "0" + bids?.length : bids?.length}</div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="w-full overflow-x-auto">
                                    <table className='table text-white'>
                                        <thead>
                                            <tr className='text-white'>
                                                <th>Title</th>
                                                <th>Email</th>
                                                <th>Category</th>
                                                <th>Deadline</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bids?.map((bid, idx) => <tr key={idx}>
                                                    <td>{bid.title}</td>
                                                    <td>{bid.email}</td>
                                                    <td>{bid.category}</td>
                                                    <td>{bid.runningDate}</td>
                                                    <td>${bid.price}</td>
                                                    <td className='flex items-center gap-1 text-xs  text-yellow-200'><span className="p-1 rounded-full bg-yellow-300 "></span> <span>{bid.status}</span></td>
                                                    <td className=''>
                                                        <div className="flex gap-4">
                                                            <div
                                                                onClick={() => handleStatus(bid._id, bid.status, "In Progress")}
                                                                className="text-purple-950 bg-green-200 p-1 rounded-full w-fit hover:bg-green-300 cursor-pointer">
                                                                <IoMdCheckmark></IoMdCheckmark>
                                                            </div>
                                                            <div
                                                                onClick={() => handleStatus(bid._id, bid.status, "Rejected")}
                                                                className="text-purple-950 bg-red-200 p-1 rounded-full w-fit hover:bg-red-300 cursor-pointer">
                                                                <MdBlockFlipped></MdBlockFlipped>
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </motion.div>
                            </div>
                            :
                            <div className="w-10/12 min-h-screen flex justify-center text-red-500 text-2xl md:text-5xl font-bold text-center items-center"></div>
                    }
                </div>

            }

        </div >
    );
};

export default BidRequest;