import React from 'react'
import DetailsClient from '../DetailsClient';

interface IPageProps {
    params: {
        mealId: string;
    };
}


const page = ({ params: { mealId } } : IPageProps ) => {
    return (
        <React.Fragment>
            <DetailsClient mealId={mealId} />
        </React.Fragment>
    )
}

export default page;