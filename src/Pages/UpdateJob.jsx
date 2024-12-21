import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";
import { MdPostAdd } from "react-icons/md";
import gear from "../assets/Lottie/Animation - gear.json"
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const UpdateJob = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const [jobData, setJobData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5000/update/${id}`)
            .then(({ data }) => {
                console.log(data)
                setJobData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const postData = Object.fromEntries(form.entries());
        console.log(postData)

        Swal.fire({
            title: "Are you sure?",
            text: "Update your job post ?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/updates/${jobData._id}`, postData)
                    .then(({ data }) => {
                        console.log(data)

                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully Updated!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/my-added-jobs")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })


            }
        });



    };

    return (
        <div className="w-full min-h-screen flex py-10 md:py-20 justify-center items-center bg-gradient-to-t from-[rgb(0,0,66)] to-[rgb(0,0,33)]">
            <div className="w-11/12 mx-auto md:grid grid-cols-2 items-center">
                <div className="">
                    <Lottie className="w-2/3 mx-auto" animationData={gear}></Lottie>
                </div>
                <form onSubmit={handleOnSubmit} className="w-full ">
                    <div className="w-full border border-t-indigo-600 border-b-indigo-600 border-l-indigo-600 rounded-xl p-10  border-r-0 shadow-sm shadow-purple-400">
                        <div className="text-2xl md:text-4xl text-white font-semibold pb-5">Update A Job</div>

                        <div className="md:grid grid-cols-2 gap-5 space-y-4 md:space-y-0">
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="job-title">Job Title</label>
                                <input name="job_title" type="text" defaultValue={jobData.job_title} className="w-full bg-transparent input-info input" placeholder="Enter the job title" />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="email">Email Address</label>
                                <input name="email" type="email" className="w-full bg-transparent input-info input" value={user?.email} />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="deadline">Deadline</label>
                                <input name="deadline" type="date" defaultValue={jobData.deadline} className="w-full bg-transparent input-info input" />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="category">Category</label>
                                <select className="w-full select select-info bg-transparent" defaultValue={jobData.category} name="category" id="">
                                    <option className="py-2 bg-transparent text-black" value="Web Development">Web Development</option>
                                    <option className="py-2 bg-transparent text-black" value="Graphics Design">Graphics Design</option>
                                    <option className="py-2 bg-transparent text-black" value="Digital Marketing">Digital Marketing</option>
                                    <option className="py-2 bg-transparent text-black" value="Video Editing">Video Editing</option>
                                    <option className="py-2 bg-transparent text-black" value="App Development">App Development</option>
                                </select>
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="min-price">Minimum Price</label>
                                <input name="min_price" type="number" defaultValue={jobData.min_price} className="w-full bg-transparent input-info input" />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="max-price">Maximum Price</label>
                                <input name="max_price" type="number" defaultValue={jobData.max_price} className="w-full bg-transparent input-info input" />
                            </div>
                            <div className="w-full space-y-1 md:col-span-2">
                                <label className="text-lg md:text-xl font-semibold " htmlFor="description">Description</label>
                                <textarea defaultValue={jobData.description} className="w-full rounded-lg bg-transparent   p-5 textarea textarea-info" rows={2} name="description" id=""></textarea>
                            </div>
                        </div>
                        <button type='submit' className="w-full p-3 cursor-pointer text-center text-lg font-semibold flex justify-center items-center bg-gradient-to-tr from-indigo-600  to-purple-600 rounded-lg mt-6 hover:bg-gradient-to-tl transition-colors duration-200">Post <MdPostAdd className="ml-1" />
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default UpdateJob;