import React, { useState } from "react";
import "./style.css";
import Input from "../input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginFrom] = useState(false);
  const navigate = useNavigate();

  function loginUsingEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("User Logged In");
          console.log("User logged In", user);
          setLoading(false)
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false)
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false)
    }
  }
  const signupusingEmail = () => {
    setLoading(true);
    console.log(name, email, password, confirmPassword);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("user>>", user);
            toast.success("Account Created!");
            setLoading(false);
            navigate("/dashboard");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage)
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and confirm password don't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  async function createDoc(user) {
    setLoading(true);
    // Make sure that the doc with the uid doesn't exist
    // Create a doc.
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true)
    try{
      signInWithPopup(auth, provider)
      .then ((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user>>>", user);
      createDoc(user);
      setLoading(false);
      navigate("/dashboard");
      toast.success("User Authenticated");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      })
      .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    toast.error(errorMessage); 
    setLoading(false); 
    }); 
    }
    catch(error){
      toast.error(error.message);  
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Log In on <span style={{ color: "var(--theme" }}>Financly.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "loading..." : "Log In Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "loading..." : "Login Using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p onClick={() => setLoginFrom(!loginForm)} className="p-login">
              {" "}
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme" }}>Financly.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "loading..." : "SignUp Using Email and Password"}
              onClick={signupusingEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "loading..." : "SignUp Using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login" onClick={() => setLoginFrom(!loginForm)}>
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
