import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../Redux/Actions/actions";
import { useNavigate } from "react-router-dom";

const RegistrationScreen = () => {
  const [confirmPass, setConfirmPass] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const user = useSelector((store) => store.users.auth);
  const userData = user ? user : JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (userData?._id) {
      navigate("/")
    }
  }, [userData?._id, navigate]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerNewUser(formData));
  };

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
          📝 Registration
        </h2>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="form-control rounded-pill py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.password || !confirmPass}
          className="btn w-100 fw-semibold text-white rounded-pill py-2"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #20c997)",
            border: "none",
            boxShadow: "0 4px 10px rgba(13,110,253,0.3)",
            transition: "0.3s",
          }}
        >
          Register
        </button>

        <p className="text-center text-muted mt-3 mb-0">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none fw-semibold" style={{ color: "#0d6efd" }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationScreen;
