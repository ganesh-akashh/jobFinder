import React from 'react';
import { useInView } from 'react-intersection-observer';

const Breadcrumb = ({ children }) => {

     const [ref, inView] = useInView({
        triggerOnce: true,
    });
    

     const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once ' ;


    return (
        <div ref={ref} className={`text-center breadcrumb py-5 ${animationClass}`}>
            {children}
        </div>
    );
};

export default Breadcrumb;