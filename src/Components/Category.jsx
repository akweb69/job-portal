import { FaCode, FaPaintBrush, FaBullhorn, FaHeadset, FaTasks, FaCalculator, FaUsers, FaCogs, FaHeartbeat, FaBook } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


const Category = () => {
    const categoryRef = useRef()
    const refSubTitle = useRef()

    useGSAP(() => {
        gsap.from(categoryRef.current, {
            y: 20,
            duration: 1.5,
            delay: 0.5,
            opacity: 0
        })
        gsap.from(refSubTitle.current, {
            y: 20,
            duration: 1.5,
            delay: 1,
            opacity: 0
        })


    }, [])

    const categories = [
        {
            category: "Software Development",
            icon: <FaCode />,
            available_jobs: 350,
        },
        {
            category: "Design & Creative",
            icon: <FaPaintBrush />,
            available_jobs: 410,
        },
        {
            category: "Marketing & Sales",
            icon: <FaBullhorn />,
            available_jobs: 290,
        },
        {
            category: "Customer Support",
            icon: <FaHeadset />,
            available_jobs: 370,
        },
        {
            category: "Project Management",
            icon: <FaTasks />,
            available_jobs: 215,
        },
        {
            category: "Finance & Accounting",
            icon: <FaCalculator />,
            available_jobs: 230,
        },
        {
            category: "Human Resources",
            icon: <FaUsers />,
            available_jobs: 270,
        },
        {
            category: "Engineering",
            icon: <FaCogs />,
            available_jobs: 420,
        },
        {
            category: "Healthcare",
            icon: <FaHeartbeat />,
            available_jobs: 320,
        },
        {
            category: "Education & Training",
            icon: <FaBook />,
            available_jobs: 200,
        },
    ];
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className='bg-gradient-to-t from-[rgb(0,0,64)] to-[rgb(0,0,31)] py-10'>
            <div className="w-11/12 mx-auto">
                <div ref={categoryRef} className=" text-center text-2xl  md:text-4xl font-bold text-amber-50">
                    Browse By Category
                </div>
                <h1
                    ref={refSubTitle}
                    className="text-center text-gray-400 py-2">
                    Find the jobs that's perfecr for you, about 800<span className='text-lg font-bold text-red-400'>+</span> jobs everyday
                </h1>
                {/* cards */}
                <div className="w-10/12 mx-auto py-6">
                    <Slider {...settings}>
                        {
                            categories.map(ct =>
                                <div key={ct.category} className="">
                                    <div className="border p-4 items-center  rounded-lg border-indigo-900 flex  gap-3 mx-4">
                                        <div
                                            className="text-3xl text-indigo-200">
                                            {
                                                ct.icon
                                            }
                                        </div>
                                        <div className="">
                                            <h1 className="text-xl font-bold text-indigo-900">{ct.category}</h1>
                                            <p className="">{ct.available_jobs} Available jobs</p>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Category;