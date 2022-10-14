import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

const Card = ({ post }) => {
    console.log("5", post);
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    console.log("10", usersData)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData], console.log(usersData));

    return (
        <li className='card-container' key={post._id} >; {console.log("15", usersData)}
            {isLoading ? console.log("16", isLoading)(
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <h2>Test</h2>
            )}
        </li>
    );
};

export default Card;