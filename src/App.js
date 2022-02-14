import { useRef, useState } from "react";
import { signup, logout, login } from "./firebase";
import { useAuth } from "./firebase";
import "./App.css";
// syncfusion components
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

function App() {
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passRef = useRef();

  // Toast Component
  const toastInstance = useRef(null);
  function toastCreated() {
    toastInstance.current.show();
  }

  async function handleSignUp() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passRef.current.value);
      setSuccessMessage(" User Signed up successfully 🎉");
    } catch {
      setErrorMessage("Oops! Something went wrong, Please Try again");
    }
    setLoading(false);
  }

  async function handleLogIn() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passRef.current.value);
      setSuccessMessage(" User Logged in successfully 🎉");
    } catch {
      setErrorMessage("Oops! Something went wrong, Please Try again");
    }
    setLoading(false);
  }

  async function handleLogOut() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error");
    }
    setLoading(false);
  }

  return (
    <div className="container" style={{ width: "500px" }}>
      {currentUser && (
        <ToastComponent
          ref={toastInstance}
          // title="Congratulations"
          content={successMessage}
          created={toastCreated}
        />
      )}
      {errorMessage && (
        <ToastComponent
          ref={toastInstance}
          // title="Congratulations"
          content={errorMessage}
          created={toastCreated}
          className="error"
        />
      )}

      <h1>Firebase Authentication </h1>

      <div>
        <TextBoxComponent
          ref={emailRef}
          type="email"
          placeholder="Enter Your Email"
          floatLabelType="Auto"
        />

        <TextBoxComponent
          ref={passRef}
          type="password"
          placeholder="Enter Your Password"
          floatLabelType="Auto"
        />
      </div>

      {/* SignUp */}

      <div style={{ marginTop: "20px" }}>
        <ButtonComponent
          disabled={loading || currentUser}
          onClick={handleSignUp}
          className="e-primary"
          style={{ marginRight: "5px" }}
        >
          Sign Up
        </ButtonComponent>

        {/* Log In */}

        <ButtonComponent
          disabled={loading || currentUser}
          onClick={handleLogIn}
          className="e-success"
          style={{ marginRight: "5px" }}
        >
          Log In
        </ButtonComponent>

        {/* LogOut */}

        <ButtonComponent
          disabled={loading || !currentUser}
          onClick={handleLogOut}
          className="e-danger"
        >
          Log Out
        </ButtonComponent>
      </div>
    </div>
  );
}

export default App;
