import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

// UNUSED RIGHT NOW -- NEED TO DEBUG SETTING LOCAL STORAGE

// credit: https://levelup.gitconnected.com/persist-and-remember-page-scroll-position-i-e-window-scrolly-using-react-hooks-f80884211f2d

// sets scrollY position of window based on a setting condition, i.e. when api calls are done
// also sets the scroll position when unmounting, i.e. a user navigates to a different page
export default function useWindowScrollPosition(localStorageKey, setCondition) {
    const [scrollYStorage, setScrollYStorage] = useLocalStorage(localStorageKey, 0);
    useEffect(() => {
        // if the setcondition is true (AKA everything in the DOM is loaded: fire off the scrollTo()!)
        if (setCondition) {
            window.scrollTo(0, scrollYStorage)
        }
    }, [setCondition, scrollYStorage])
    // purely on un mount (and thus we ignore the ESLint warning): store the scroll position the user was at to localStorage
    // see the yellow note at https://reactjs.org/docs/hooks-effect.html near the very bottom
    useEffect(()=> {
        return () => {
            setScrollYStorage(window.scrollY)
        };
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}