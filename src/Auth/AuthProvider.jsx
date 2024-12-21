import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../Firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false)
    // ! create user with email and password
    const createUserWithEmailPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // ! signin with email and password
    const handleSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const data = {
        user, setUser, loading, setLoading, createUserWithEmailPassword, handleSignIn, setRefetch
    }

    // !  stack  the user hold
    useEffect(() => {
        const unsubsc = onAuthStateChanged(auth, currentUser => {
            const user = { email: currentUser?.email }
            if (currentUser?.email) {
                // axios.post("http://localhost:5000/jwt", user, { withCredentials: true })
                //     .then((res) => {
                //         const data = res.data;
                //         console.log(data)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            }
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
        })
        return () => {
            unsubsc();
        }
    }, [refetch])
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;