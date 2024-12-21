import Lottie from "lottie-react";
import registeranimation from "../assets/Lottie/Animation - register-char on chair.json"
import { useContext, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const Signin = () => {

    const { user, handleSignIn, setRefetch } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const naviget = useNavigate();
    const location = useLocation()
    if (success) {
        naviget(location.state ? location.state : "/")
    }

    const handleFormSubmit = e => {
        e.preventDefault();


        const form = new FormData(e.target)
        const email = form.get("email")
        const password = form.get("password")
        const registerData = { email, password }
        console.log(registerData)

        // ! sign in with email and password
        handleSignIn(email, password)
            .then(result => {

                const user = { email: result.user.email };
                axios.post("http://localhost:5000/jwt", user, { withCredentials: true })
                    .then((res) => {
                        const data = res.data;
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                console.log(result.user.email)
                setRefetch(true)
                setSuccess(true)

            })
            .catch(err => {
                console.log(err)
            })


    }


    return (
        <div>
            <div className='w-full min-h-screen flex justify-center pb-20 md:pb-0 items-center'>
                <div className="w-10/12 space-y-5 md:space-y-0 mx-auto md:flex flex-row-reverse justify-center gap-10 items-center ">
                    <div className="">
                        <Lottie animationData={registeranimation}></Lottie>
                    </div>
                    <div className="">
                        <div className="w-full p-10 bg-[rgb(0,0,44)] rounded-xl md:px-20">
                            <h1 className="text-3xl md:text-5xl font-semibold mb-10 text-center">Sign In</h1>
                            <div className="">
                                <form onSubmit={handleFormSubmit} className="space-y-4">

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


                                    <div className=" w-full text-center">
                                        <button className="btn w-full"> Sign In </button>
                                    </div>
                                </form>
                                <div className="pt-4">
                                    Don't have an account Please <Link className="hover:underline text-blue-500" to={"/register"}> Resister</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;