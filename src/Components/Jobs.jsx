import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Jobs = () => {
    const [alljobs, setAllJobs] = useState([])
    const title = useRef();

    useEffect(() => {
        axios.get("http://localhost:5000/all_jobs", { withCredentials: true })
            .then(data => {
                console.log(data.data)
                setAllJobs(data.data)
            })

    }, [])

    useGSAP(() => {
        gsap.from(title.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                markers: true
            }
        })
    })

    return (
        <div className="py-20 bg-gradient-to-t from-[rgb(0,0,31)] to-[rgb(0,0,64)]">
            <div className="w-11/12 mx-auto">
                <div ref={title} className="text-center font-bold text-3xl md:text-4xl text-white">Jobs Of The Day</div>
                <div className="text-center py-4 text-gray-500">Search and connect with right candidates faster! </div>
                {/* Tabs */}
                <Tabs>
                    <div className="flex justify-center items-center py-4">
                        <TabList className='flex justify-center items-center flex-wrap'>
                            <Tab selectedClassName="bg-transparent bg-indigo-500 rounded-t-lg border" >Web Development</Tab>
                            <Tab selectedClassName="bg-transparent bg-indigo-500 rounded-t-lg border">Graphics Desgin</Tab>
                            <Tab selectedClassName="bg-transparent bg-indigo-500 rounded-t-lg border">Digital Marketing</Tab>
                            <Tab selectedClassName="bg-transparent bg-indigo-500 rounded-t-lg border">Video Editing</Tab>
                            <Tab selectedClassName="bg-transparent bg-indigo-500 rounded-t-lg border">App Development</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 space-y-5 md:space-y-0">
                            {
                                alljobs?.filter(all => all.postData.category === "Web Development")?.map((job, idx) =>
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
                    </TabPanel>
                    <TabPanel>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 space-y-5 md:space-y-0">
                            {
                                alljobs?.filter(all => all.postData.category === "Graphics Design")?.map((job, idx) =>
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
                    </TabPanel>
                    <TabPanel>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 space-y-5 md:space-y-0">
                            {
                                alljobs?.filter(all => all.postData.category === "Digital Marketing")?.map((job, idx) =>
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
                    </TabPanel>
                    <TabPanel>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 space-y-5 md:space-y-0">
                            {
                                alljobs?.filter(all => all.postData.category === "Video Editing")?.map((job, idx) =>
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
                    </TabPanel>
                    <TabPanel>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 space-y-5 md:space-y-0">
                            {
                                alljobs?.filter(all => all.postData.category === "App Development")?.map((job, idx) =>
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
                    </TabPanel>
                </Tabs>
                {/* Tabs */}



            </div>
        </div>
    );
};

export default Jobs;