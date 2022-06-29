import React from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="text-center">
                <h1>404 Page Not Found</h1>
                <button type="button" onClick={()=>navigate(-1)} className="btn btn-link">
                            Back
                </button>
            </div>
        </div>
    )
}