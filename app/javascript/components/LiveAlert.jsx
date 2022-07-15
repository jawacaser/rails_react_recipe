import React from 'react';

export const LiveAlert = (props) => {
    return (
        <div className={`alert alert-${props.flavor ? props.flavor : 'info'} alert-dismissible`} role="alert">
            { props.message }
            { props.dismissable ? <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> : null }
        </div>
    )
}