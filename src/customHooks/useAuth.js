import { useEffect, useState } from 'react';
//Firebase
import { auth } from '../Firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    //States
    const [currentUser, setCurrentUser] = useState({});
    //useEffects
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    },);

    return {
        currentUser,
    };
};

export default useAuth;
