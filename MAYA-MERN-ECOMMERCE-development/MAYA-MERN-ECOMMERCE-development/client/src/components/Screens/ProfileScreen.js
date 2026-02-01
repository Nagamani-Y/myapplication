import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from "../Redux/Actions/actions";
import { logoutUser } from '../Redux/Slices/userAutSlice';
import { clearCart } from "../Redux/Slices/cartSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.users.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!user._id) {
      navigate("/login")
    }
  }, [user._id, navigate]);

  const handleSave = async () => {
    try {
      const userId = user?._id;
      await dispatch(updateProfile({ updateUserData: updatedUserData, userId })).unwrap();

      // After successful update:
      toast.success("Updated successfully. Please login again.", { position: "bottom-left" });
      dispatch(logoutUser());
      dispatch(clearCart());
      navigate("/login");
    } catch (err) {
      toast.error("Update failed. Please try again.", { position: "bottom-left" });
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card p-4 shadow-sm border-0 rounded-4">
        <h4 className="fw-bold mb-3 text-primary">Edit Profile</h4>
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={updatedUserData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={updatedUserData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={updatedUserData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="text-end">
          <button className="btn btn-primary px-4" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
