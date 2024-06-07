import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

function StickyHeader(props) {
    const { top = 210, onFixedStateChange } = props; // Adding prop for passing state to parent
    const router = useRouter("");
    const ref = useRef(null);
    const [height, setHeight] = useState('auto');
    const [isFixed, setIsFixed] = useState(false); // State to track if header is fixed

    useEffect(() => {
        const initSticky = () => {
            let stickyContent = ref.current.children[0];
            setHeight(`${stickyContent.offsetHeight}px`);
        };

        const scrollHandler = () => {
            let stickyContent = ref.current.children[0];
            if (window.pageYOffset > top) {
                if (!stickyContent.classList.contains('fixed')) {
                    stickyContent.classList.add('fixed');
                    setIsFixed(true); // Header is now fixed
                    if (onFixedStateChange) {
                        onFixedStateChange(true); // Passing fixed state to parent
                    }
                }
            } else if (stickyContent.classList.contains('fixed')) {
                stickyContent.classList.remove('fixed');
                setIsFixed(false); // Header is not fixed
                if (onFixedStateChange) {
                    onFixedStateChange(false); // Passing fixed state to parent
                }
            } else {
                setHeight(`${stickyContent.offsetHeight}px`);
            }
        };

        const resizeHandler = () => {
            let stickyContent = ref.current.children[0];
            setHeight(`${stickyContent.offsetHeight}px`);
            scrollHandler();
        };

        initSticky();
        router.events.on('hashChangeComplete', initSticky);
        window.addEventListener('scroll', scrollHandler, { passive: true });
        window.addEventListener('resize', resizeHandler, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
        };
    }, [top, router.events, onFixedStateChange]);

    return (
        <div ref={ref} className="sticky-wrapper" style={{ height: height }}>
            {props.children(isFixed)} {/* Passing isFixed state to children */}
        </div>
    );
}

export default StickyHeader;
