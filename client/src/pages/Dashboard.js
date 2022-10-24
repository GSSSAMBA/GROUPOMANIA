import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LeftNav from "../components/LeftNav";
import { isEmpty } from "../components/Utils";
import DeleteUser from "../components/Admin/DeleteUser";
const Dashboard = () => {
    const userData = useSelector((state) => state.userReducer);
    const allUsers = useSelector((state) => state.usersReducer);
    const ADMIN = process.env.REACT_APP_API_ADMIN_ROLE;

    return (
        <div className="dash">
            {userData.role === ADMIN ? (
                <div className="dashboard-page">
                    <LeftNav />
                    <div className="center_dashboard">
                        <h1 className="users_list_title">Bonjour {userData.pseudo} !</h1>
                        <h2 className="users_list_title">
                            Vous êtes administrateur du réseau social Groupomania !
                        </h2>
                        <h2 className="users_list_title">
                            Voici la liste des utilisateurs de ce réseau :
                        </h2>
                        <ul className="users_list_container">
                            {" "}
                            {!isEmpty(allUsers[0]) &&
                                allUsers.map((user) => {
                                    return (
                                        <li className="users_list_card" key={user._id}>
                                            <div className="users_list_card_pseudoAndImg">
                                                <h2 className="users_list_card_pseudo">
                                                    {user.pseudo}
                                                </h2>
                                                <img
                                                    className="users_list_card_img"
                                                    src={user.picture}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="users_list_card_bioAndDelete">
                                                <div className="users_list_card_bio">
                                                    <p>{user.bio}</p>
                                                </div>
                                                <DeleteUser id={user._id} />
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
};

export default Dashboard;