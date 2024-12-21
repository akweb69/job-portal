import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import Loading from "./Loading";
import ScrollToTop from "../Common/ScroollToTop";
import { motion } from "framer-motion"
import { compareAsc, format } from "date-fns";
import toast from "react-hot-toast";


const ApplyForm = () => {
    const today = format(new Date(), 'MM/dd/yyyy');
    console.log(today)
    const { id } = useParams()
    const { user, loading, setLoading } = useContext(AuthContext);
    const [data, setData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/all_jobs/${id}`)
            .then(({ data }) => {
                console.log(data)
                setData(data)
                setLoading(false)
            })
    }, [id])

    const handleSubmit = e => {

        e.preventDefault();
        const form = new FormData(e.target);
        const price = parseInt(form.get("price"));
        const email = form.get("email");
        const comment = form.get("comment")
        const runningDate = form.get("deadline")
        const jobId = id
        console.log(jobId)
        const bidData = { price, email, comment, runningDate, jobId, status: "pending", buyer: data.buyer.email, category: data.postData.category, title: data.postData.job_title }

        if (email === data.buyer.email) {
            return toast.error("You are not elligible for this job!")
        }
        if (price > data.postData.max_price) {
            return toast.error("Offer price excced!")
        }
        // console.log(data.postData.max_price)
        if (compareAsc(data.postData.deadline, runningDate) === -1) {

            return toast.error("Deadline Over! bidding  forbidden!")
        }


        axios.post("http://localhost:5000/all-application", bidData)
            .then((res) => {
                const result = res.data

                if (result.acknowledged) {
                    toast.success("Bid Success!")
                    navigate("/my-bids")
                }
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            })

    }
    return (
        <div className='w-full min-h-[95vh] py-10 pb-20  md:py-20 bg-[rgb(0,0,31)] flex justify-center items-center'>
            <ScrollToTop></ScrollToTop>
            {
                loading ? <Loading></Loading> : <div className="w-11/12 md:w-10/12 mx-auto lg:grid grid-cols-2 gap-10 space-y-5 lg:space-y-0">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.25 }}

                        className="w-full shadow-md shadow-indigo-950 p-4 border border-r-transparent rounded-xl  border-l-indigo-800 border-t-purple-600 border-b-indigo-700">
                        <div className="flex justify-between gap-5 ">
                            <div className="">
                                Deadline:  {data.postData?.deadline}
                            </div>
                            <div className="text-xs py-1 px-4 rounded-full bg-indigo-400">
                                {data.postData?.category}
                            </div>
                        </div>
                        <div className="text-amber-400 font-semibold text-xl md:text-2xl py-2">
                            <b className="font-bold ">Job Title :</b> {data.postData?.job_title}
                        </div>
                        <div className="text-sm">
                            Description : {data.postData?.description}
                        </div>
                        {/* buyer info */}
                        <div className="">
                            <div className="pt-2 text-lg md:text-xl font-semibold text-yellow-200">Buyer Info:</div>
                            <div className="flex gap-10 items-center">
                                <div className="text-yellow-100">
                                    <div className="">Name : {data.buyer?.displayName}</div>
                                    <div className="">Email: {data.buyer?.email}</div>
                                </div>

                                <div className="w-14 h-14 rounded-full border border-indigo-800 p-2 overflow-hidden shadow-md shadow-indigo-700">
                                    <img className="w-full" src={data.buyer?.photoURL} alt="" />
                                </div>
                            </div>

                        </div>
                        <div className="py-4">
                            <div className="flex  items-center text-indigo-100 font-semibold text-xl md:text-2xl">
                                Price Range:  ${data.postData?.min_price} - ${data.postData?.max_price}
                            </div>
                        </div>
                        <div className="ot-2 font-semibold flex gap-2 items-center">
                            Total bids: <span className="px-3 py-1 bg-indigo-400 text-white rounded-full text-xs">{data?.bidCount}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.75 }}

                        className="w-full shadow-md shadow-indigo-950 p-4 border border-l-transparent rounded-xl  border-r-indigo-800 border-t-purple-600 border-b-indigo-700">

                        <form onSubmit={handleSubmit}>
                            <div className="text-indigo-400 font-semibold text-xl md:text-2xl py-2">
                                Place A Bid
                            </div>
                            <div className="md:grid grid-cols-2 gap-4 items-center space-y-5 md:space-y-0">
                                <div className="w-full space-y-1">
                                    <label className="text-lg md:text-xl font-semibold " htmlFor="price"> Price</label>
                                    <input required name="price" type="number" className="w-full bg-transparent input-info input" />
                                </div>
                                <div className="w-full space-y-1">
                                    <label className="text-lg md:text-xl font-semibold " htmlFor="email">Emial Address</label>
                                    <input required name="email" type="email" value={user?.email} className="w-full bg-transparent input-info input" />
                                </div>
                                <div className="w-full space-y-1">
                                    <label className="text-lg md:text-xl font-semibold " htmlFor="comment">Comment</label>
                                    <input required name="comment" type="text" className="w-full bg-transparent input-info input" />
                                </div>
                                <div className="w-full space-y-1">
                                    <label className="text-lg md:text-xl font-semibold " htmlFor="deadline">Will Complete</label>
                                    <input required name="deadline" defaultValue={today} type="text" className="w-full bg-transparent input-info input text-white" />
                                </div>
                                <button type="submit" className="col-span-2 w-full flex items-center text-lg md:text-xl border rounded-lg border-indigo-700 gap-2 justify-center py-2 hover:bg-gradient-to-tr from-indigo-700 to-purple-600 cursor-pointer">
                                    <div className="">Plce A Bid</div>
                                    <FaLocationArrow />

                                </button>

                            </div>
                        </form>
                    </motion.div>
                </div>
            }
        </div>
    );
};

export default ApplyForm;