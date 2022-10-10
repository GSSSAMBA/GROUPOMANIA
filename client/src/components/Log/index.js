import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            //toggle si id register est cliqué, login est en false et inversement
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        {/* si signupmodal est sur true alors on assigne la classe activebtn pour avoir un effet au toogle */}
                        Vous n'avez pas encore de compte Groupomania ?
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Vous avez déjà un compte Groupomania ?
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;

// import React, { useState } from 'react';
// import SignUpForm from './SignUpForm';
// // import SignInForm from './SignInForm';

// // import SignInForm from './SignInForm'

// const Log = (props) => {
//     const [signUpModal, setSignUpModal] = useState(props.signup);
//     const [signInModal, setSignInModal] = useState(props.signin);

//     const handleModals = (e) => {
//         if (e.target.id === "register") {
//             setSignInModal(false);
//             setSignUpModal(true);
//         } else if (e.target.id === "login") {
//             setSignUpModal(false);
//             setSignInModal(true);
//         }
//     };

//     return (
//         <div className="connection-form">
//             <div className="form-container">
//                 <ul>
//                     <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</li>
//                     <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li>
//                 </ul>
//                 {signUpModal && <SignUpForm />}
//                 {signInModal && <SignUpForm />}
//             </div>
//         </div>
//     );
// };

// export default Log;