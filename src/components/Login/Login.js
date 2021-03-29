import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

function Login() {

    const [loggedIn, setLoggedIn] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLoggedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })
    const handleSignIn = () => {

        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const userInfo = {
                    isLoggedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(userInfo);
                setLoggedIn(userInfo)
                history.replace(from);
                console.log(displayName, email, photoURL);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider).then((res) => {
            var credential = res.credential;
            var user = res.user;
            var accessToken = credential.accessToken;
            history.replace(from);
            console.log('Fb data after log in', user);
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: ''
            }
            setUser(signOutUser)
        })
            .catch(error => {
                console.log(error);
            })
    }

    const handleInput = (e) => {

        let isValid = true;
        if (e.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const passwordValidate = e.target.value.length > 6
            const passwordValidate2 = /\d{1}/.test(e.target.value)
            isValid = passwordValidate && passwordValidate2;
        }
        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedIn(newUserInfo);
                    history.replace(from);
                    updateUsername(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo)
                    setLoggedIn(newUserInfo);
                    history.replace(from);
                    console.log('user name', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault()
    }
    const updateUsername = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('User name update successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isLoggedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Log In using Google</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Log in using Facebook</button>
            {
                user.isLoggedIn && <div>
                    <h1>Welcome, {user.name}</h1>
                    <h3>Your email: {user.email}</h3>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our own Form</h1>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <h3>{user.password}</h3>

            <input type="checkbox" onClick={() => setNewUser(!newUser)} name="" id="newUser" />
            <label htmlFor="newUser">I am New User</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleInput} name="name" placeholder="Enter your Name..." />
                }
                <br />
                <input type="text" onBlur={handleInput} name="email" placeholder="Enter your Email..." required />
                <br />
                <input type="password" onBlur={handleInput} name="password" placeholder="Enter your Password.." required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Log In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>Your account {newUser ? 'created' : 'Log In'} successfully</p>
            }
        </div>
    );

}
export default Login;
