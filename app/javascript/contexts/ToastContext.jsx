import React, { useCallback, useEffect, useState, createContext } from 'react';
import { Toast } from 'bootstrap';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(
                () => setToasts(toasts => toasts.slice(1)),
                30*1000
            );
            return () => clearTimeout(timer);
        }
    }, [toasts]);


    const addToast = useCallback(
        function(toast) {
            setToasts(toasts => [...toasts, toast]);
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="toasts-wrapper bottom-0 start-50 translate-middle-x mb-5" style={{position: "absolute"}}>
                {toasts.map((toast, index) => (
                    <div id={'toast-id'+index} className="toast bg_secondary-color text-white d-flex show fade" role="alert" aria-live="assertive" aria-atomic="true" key={index}>
                        <div className="toast-body">
                            <strong className="me-auto">Notice : </strong>
                            {toast}
                        </div>
                        <button id={'toast-btn'+index} key={index} type="button" className="btn-close btn-close-white me-1 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}