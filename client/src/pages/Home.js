import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/Log';
import Trends from '../components/Trends';
// import GoUp from "../components/GoUp";


const Home = () => {
    const uid = useContext(UidContext);
    // console.log("OKOKOKOKOKOKOKOKOK3");
    // console.log(uid);


    return (
        <div className='home'>
            {/* {!uid ? (
                <div className="profil-page">
                    <div className="log-container">
                        <Log signin={true} signup={false} />
                    </div>
                </div>
            ) : (
                <> */}
            <LeftNav />
            <div className='main'>
                <div className='home-header'>
                    {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                {/* <GoUp /> */}

                {/* <Thread /> */}
                {uid ? <Thread /> : ""}
            </div>
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                        {/* <Trends /> */}
                        {uid ? <Trends /> : ""}

                    </div>
                </div>
            </div>
            {/* </>) */}
            {/* } */}
        </div >
    );
};

export default Home
