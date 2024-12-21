import Lottie from "lottie-react";
import registeranimation from "../assets/Lottie/Animation - register-char on chair.json"
import { useContext, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import { updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const { user, setUser, loading, setLoading, createUserWithEmailPassword, setRefetch } = useContext(AuthContext);
    if (success) {
        navigate(location?.state ? location?.state : "/")
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        const form = new FormData(e.target)
        const name = form.get("name")
        const photo = form.get("photo")
        const email = form.get("email")
        const password = form.get("password")
        const registerData = { name, photo, email, password }
        console.log(registerData)
        // ! password velidation
        const regex = /\d/;
        const regex1 = /[A-Z]/;
        const regex2 = /[a-z]/;
        const regex3 = /[!@#$%^&*(),.?":{}|<>~`'_+=\/\\\-\[\]]/;
        if (password.length < 6) {
            setError("Password must be 6 Character!")
            return;
        }
        if (!regex.test(password)) {
            setError("Password must have one number!")
            return;
        }
        if (!regex1.test(password)) {
            setError("Password must have one Uppercase Character!")
            return;
        }
        if (!regex2.test(password)) {
            setError("Password must have one lowercase character!")
            return;
        }
        if (!regex3.test(password)) {
            setError("Password must have one Special Character!");
            return;
        }

        // ! registration function with firebase
        createUserWithEmailPassword(email, password)
            .then(result => {

                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo,
                })
                    .then((re) => {
                        setRefetch(true)
                        setSuccess(true)
                    })

                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })


    }
    return (
        <div className='w-full min-h-screen flex justify-center pb-20 md:pb-0 items-center'>
            <div className="w-10/12 space-y-5 md:space-y-0 mx-auto md:flex justify-center gap-10 items-center ">
                <div className="">
                    <Lottie animationData={registeranimation}></Lottie>
                </div>
                <div className="">
                    <div className="w-full p-10 bg-[rgb(0,0,44)] rounded-xl md:px-20">
                        <h1 className="text-3xl md:text-5xl font-semibold mb-10 text-center">Register</h1>
                        <div className="">
                            <form onSubmit={handleFormSubmit} className="space-y-4">

                                <div className="text-lg ">
                                    <label htmlFor="name">
                                        Your Name :
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered bg-transparent input-primary w-full " />

                                </div>

                                <div className="text-lg ">
                                    <label htmlFor="photo">
                                        Photo Url :
                                    </label>
                                    <input
                                        name="photo"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered bg-transparent input-primary w-full " />

                                </div>

                                <div className="text-lg ">
                                    <label htmlFor="email">
                                        Email :
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Type here"
                                        className="input input-bordered bg-transparent input-primary w-full " />

                                </div>

                                <div className="text-lg ">
                                    <label htmlFor="password">
                                        Password :
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Type here"
                                        className="input input-bordered bg-transparent input-primary w-full " />

                                </div>
                                <div className="text-sm text-red-400">
                                    {
                                        error
                                    }
                                </div>

                                <div className=" w-full text-center">
                                    <button className="btn w-full"> Register </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;