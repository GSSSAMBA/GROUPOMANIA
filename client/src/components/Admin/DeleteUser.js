import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";

const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () =>
        dispatch(deleteUser(props.id)).then(() => dispatch(getUsers()));

    return (
        <div
            className="delete"
            onClick={() => {
                if (
                    window.confirm(
                        "Souhaitez-vous réellement supprimer cet utilisateur ? Cette action est irréversible"
                    )
                ) {
                    deleteQuote();
                }
            }}
        >
            <div className="delete_text">Bannir l'utilisateur' ? </div>
            <div className="delete_icon">
                <i className="fa-solid fa-user-slash i_post_delete"></i>
            </div>{" "}
        </div>
    );
};

export default DeleteCard;
