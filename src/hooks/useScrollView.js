import { useState, useEffect } from 'react';

export const useScrollView = () => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Trigger when within 50px of the bottom
            if (scrollTop + windowHeight >= docHeight - 50) {
                setIsBottom(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Check initial state in case page is short
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isBottom;
};
