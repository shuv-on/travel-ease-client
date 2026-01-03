import React from 'react';
import Banner from '../../components/Banner/Banner';
import Latest from '../../components/Latest/Latest';
import Topcategories from '../../components/Topcategories/Topcategories';
import FeaturedOwner from '../../components/FeaturedOwner/FeaturedOwner';
import Stats from '../../components/Stats/Stats';
import Testimonials from '../../components/Testimonials/Testimonials';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Faq from '../../components/Faq/Faq';
import Newsletter from '../../components/Newsletter/Newsletter';
import CallToAction from '../../components/CallToAction/CallToAction';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Stats></Stats>
            <Latest></Latest>
            <Topcategories></Topcategories>
            <FeaturedOwner></FeaturedOwner>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
            <Newsletter></Newsletter>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;