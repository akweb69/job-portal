import { useContext, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import AuthContext from "../Auth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AddJob = () => {
    const { user } = useContext(AuthContext);
    const buyer = user;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    if (success) {
        navigate("/my-added-jobs")
    }

    const handleOnSubmit = (e) => {
        setSuccess(false)
        e.preventDefault();
        const form = new FormData(e.target);
        const postData = Object.fromEntries(form.entries());
        const bidCount = 0;
        const allData = { postData, buyer, bidCount }



        axios.post("http://localhost:5000/all_jobs", allData)
            .then(data => {
                const newData = data.data;
                if (newData.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            setSuccess(true)
                        })

                }

            })
            .catch(err => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Opps! Something went wrong",
                    showConfirmButton: true,

                });
            })




    };

    return (
        <div className="w-full min-h-screen flex py-10 md:py-20 justify-center items-center bg-gradient-to-t from-[rgb(0,0,66)] to-[rgb(0,0,33)]">
            <form onSubmit={handleOnSubmit} className="w-full">
                <div className="md:w-6/12 mx-auto w-11/12 border border-t-indigo-600 border-b-indigo-600 border-l-indigo-600 rounded-xl p-10  border-r-0 shadow-sm shadow-purple-400">
                    <div className="text-2xl md:text-4xl text-white font-semibold pb-5">Post A Job</div>

                    <div className="md:grid grid-cols-2 gap-5 space-y-4 md:space-y-0">
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="job-title">Job Title</label>
                            <input name="job_title" type="text" className="w-full bg-transparent input-info input" placeholder="Enter the job title" />
                        </div>
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="email">Email Address</label>
                            <input name="email" type="email" className="w-full bg-transparent input-info input" value={user?.email} />
                        </div>
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="deadline">Deadline</label>
                            <input name="deadline" type="date" className="w-full bg-transparent input-info input" />
                        </div>
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="category">Category</label>
                            <select className="w-full select select-info bg-transparent" name="category" id="">
                                <option className="py-2 bg-transparent text-black" value="Web Development">Web Development</option>
                                <option className="py-2 bg-transparent text-black" value="Graphics Design">Graphics Design</option>
                                <option className="py-2 bg-transparent text-black" value="Digital Marketing">Digital Marketing</option>
                                <option className="py-2 bg-transparent text-black" value="Video Editing">Video Editing</option>
                                <option className="py-2 bg-transparent text-black" value="App Development">App Development</option>
                            </select>
                        </div>
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="min-price">Minimum Price</label>
                            <input name="min_price" type="number" className="w-full bg-transparent input-info input" />
                        </div>
                        <div className="w-full space-y-1">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="max-price">Maximum Price</label>
                            <input name="max_price" type="number" className="w-full bg-transparent input-info input" />
                        </div>
                        <div className="w-full space-y-1 md:col-span-2">
                            <label className="text-lg md:text-xl font-semibold " htmlFor="description">Description</label>
                            <textarea className="w-full rounded-lg bg-transparent  p-5 textarea textarea-info" rows={2} name="description" id=""></textarea>
                        </div>
                    </div>
                    <button type='submit' className="w-full p-3 cursor-pointer text-center text-lg font-semibold flex justify-center items-center bg-gradient-to-tr from-indigo-600  to-purple-600 rounded-lg mt-6 hover:bg-gradient-to-tl transition-colors duration-200">Post <MdPostAdd className="ml-1" />
                    </button>
                </div>
            </form>
        </div >
    );
};

export default AddJob;