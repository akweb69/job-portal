import React from 'react';
import Banner from '../Components/Banner';
import Category from '../Components/Category';
import Jobs from '../Components/Jobs';

const Homepage = () => {
    return (
        <div className='w-full'>
            <div className="w-11/12 mx-auto">
                <Banner></Banner>
            </div>
            <Category></Category>
            <Jobs></Jobs>
        </div>
    );
};

export default Homepage;