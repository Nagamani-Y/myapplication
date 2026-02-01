import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Actions/actions";
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.auth);
  const userData = user ? user : JSON.parse(localStorage.getItem("token"));

  useEffect(()=>{
    if(userData?._id) {
        navigate("/")
    }
  },[userData?._id,navigate]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-5 shadow-lg rounded-4 bg-white"
        style={{ width: "400px" }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: "#0d6efd",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          📝 Login
        </h2>

        <div className="mb-3">
          <input
            type="email"
            name='email'
            value={loginData.email}
            placeholder="Email Address"
            onChange={(e) => handleChange(e)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name='password'
            value={loginData.password}
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!loginData.email || !loginData.password}
          className="btn w-100 fw-semibold text-white rounded-pill py-2"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #20c997)",
            border: "none",
            boxShadow: "0 4px 10px rgba(13,110,253,0.3)",
            transition: "0.3s",
          }}
        >
          Login
        </button>

        <p className="text-center text-muted mt-3 mb-0">
          Don't have an account?{" "}
          <a href="/register" className="text-decoration-none fw-semibold" style={{ color: "#0d6efd" }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
