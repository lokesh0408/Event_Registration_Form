import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EventRegisterationForm.css";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    isAttendingWithGuest: false,
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Age must be a number greater than 0";
    if (formData.isAttendingWithGuest && !formData.guestName)
      newErrors.guestName = "Guest name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isAttendingWithGuest"
              checked={formData.isAttendingWithGuest}
              onChange={handleChange}
            />
            Are you attending with a guest?
          </label>
        </div>
        <AnimatePresence>
          {formData.isAttendingWithGuest && (
            <motion.div
              className="form-group"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label>Guest Name:</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
              />
              {errors.guestName && (
                <span className="error">{errors.guestName}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <motion.div
          className="submitted-data"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Form Data Submitted</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>
            Attending with Guest:{" "}
            {submittedData.isAttendingWithGuest ? "Yes" : "No"}
          </p>
          {submittedData.isAttendingWithGuest && (
            <p>Guest Name: {submittedData.guestName}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
