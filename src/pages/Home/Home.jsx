import React from 'react';
import Banner from '../../components/Banner/Banner';
import Latest from '../../components/Latest/Latest';
import Topcategories from '../../components/Topcategories/Topcategories';
import FeaturedOwner from '../../components/FeaturedOwner/FeaturedOwner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Latest></Latest>
            <Topcategories></Topcategories>
            <FeaturedOwner></FeaturedOwner>
        </div>
    );
};

export default Home;