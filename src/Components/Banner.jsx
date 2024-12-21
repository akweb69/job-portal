import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import b1 from "../assets/imgs/b1.jpg"
import b2 from "../assets/imgs/b2.jpg"
import axios from 'axios';
const Banner = () => {
    const refTitle = useRef();

    useEffect(() => {
        if (refTitle.current) {
            gsap.fromTo(
                refTitle.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: "power1.inOut",
                }
            );
        }

        gsap.fromTo("#desc1",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 2,
            });
    }, []);



    return (
        <div className='min-h-[400px]  w-full pb-10 md:pt-10 pt-2 flex flex-col-reverse md:flex md:flex-row items-center gap-6'>
            <div className="flex-1">
                <div ref={refTitle} className="text-3xl md:text-5xl font-bold text-blue-50">
                    The <motion.span
                        animate={{
                            y: [-10, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                        }}
                        className='text-pink-400'>Easiest Way</motion.span>
                    <br />
                    to Get Your New Job
                </div>
                <div id='desc1' className="md:w-2/3 w-full py-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eum ipsa delectus exercitationem esse? Laudantium expedita excepturi omnis consequuntur corporis?
                </div>
            </div>
            <div className="flex-1 ">
                <div className=" relative">
                    <motion.div
                        animate={{ y: [0, 50, 0], transition: { duration: 10, repeat: Infinity } }}
                        className="md:w-1/2 w-full  mb-6 ">
                        <img className='w-full border-l-4 border-blue-200 border-b-4 rounded-t-[60px] rounded-br-[60px]' src={b1} alt="" />
                    </motion.div>
                    <motion.div
                        animate={{ x: [0, 50, 0], transition: { duration: 5, delay: 2, repeat: Infinity } }}
                        className="w-1/2 hidden md:block absolute top-2/3 left-1/3 ">
                        <img className='w-2/3 border-l-4 border-blue-200 border-b-4 rounded-t-[60px] rounded-br-[60px]' src={b2} alt="" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
