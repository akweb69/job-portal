import { FaDollarSign } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";

const AllJobs = () => {
    const data = useLoaderData();
    console.log(data)
    return (
        <div className="w-full min-h-screen bg-[rgb(0,0,31)]">
            <div className="w-11/12 mx-auto py-10 md:py-20">
                {/* search and filter */}
                <div className="">

                </div>
                {/* cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-5 md:space-y-0 pt-10">

                    {
                        data?.map((job, idx) =>
                            <div key={idx} className="border hover:shadow-xl hover:shadow-[rgb(0,0,55)] border-indigo-700 p-4 rounded-xl bg-[rgba(0,0,0,0.04)] flex flex-col justify-between">
                                <div className="">

                                    <div className="flex justify-between  items-center gap-4">
                                        <div className="text-sm font-semibold">
                                            Deadline:  {job.postData.deadline}
                                        </div>
                                        <div className="text-xs w-fit bg-indigo-400 rounded-full px-2 py-1 text-white text-center">{job?.postData.category}</div>
                                    </div>

                                    <div className="">
                                        <div className="text-xl font-semibold pt-3">{job?.postData.job_title}</div>
                                    </div>

                                    <div className="text-sm py-3 text-gray-300">
                                        {job.postData.description.slice(0, 300)}...
                                    </div>
                                    <div className="flex  items-center gap-2 text-xl font-semibold ">
                                        <div className="flex items-center"> Range:  <FaDollarSign /> {job.postData.min_price} -  <FaDollarSign /> {job.postData.max_price} </div>
                                    </div>
                                    <div className="ot-2 font-semibold flex gap-2 items-center">
                                        Total bids: <span className="px-3 py-1 bg-indigo-400 text-white rounded-full text-xs">{job.bidCount}</span>
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <Link to={`/apply-jobs/${job._id}`} className="flex gap-2 items-center text-lg bg-indigo-700 justify-center rounded-lg p-2 cursor-pointer hover:bg-indigo-500">
                                        Apply Now
                                        <MdArrowOutward />
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AllJobs;