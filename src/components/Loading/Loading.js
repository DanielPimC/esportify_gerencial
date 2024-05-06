import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <div className="overlay">
                    <CircularProgress className="loading" />
                </div>
            )}
        </>
    );
};

export default Loading;
