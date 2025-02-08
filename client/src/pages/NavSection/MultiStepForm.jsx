import { useState } from "react";
import useFormStore from "../store/useFormStore";
import axios from "axios";

const MultiStepForm = () => {
  const { step, formData, setFormData, nextStep, prevStep } = useFormStore();

  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/navsections",
        formData
      );
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {step === 1 && (
        <div>
          <h2>Step 1: Basic Information</h2>
          <input
            type="text"
            name="titleUserName"
            value={formData.titleUserName}
            onChange={handleChange}
            placeholder="Enter Title/Username"
            className="border p-2 w-full mb-3"
          />
          <button onClick={nextStep} className="bg-blue-500 text-white p-2">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Contact Details</h2>
          <input
            type="text"
            name="caContactNo1"
            value={formData.caContactNo1}
            onChange={handleChange}
            placeholder="Enter Contact Number 1"
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="caContactNo2"
            value={formData.caContactNo2}
            onChange={handleChange}
            placeholder="Enter Contact Number 2"
            className="border p-2 w-full mb-3"
          />
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white p-2 mr-2"
          >
            Back
          </button>
          <button onClick={nextStep} className="bg-blue-500 text-white p-2">
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Navigation Items</h2>
          <textarea
            name="navItems"
            value={formData.navItems}
            onChange={(e) =>
              setFormData({ navItems: JSON.parse(e.target.value) })
            }
            placeholder='Enter JSON: [{"label": "Home", "link": "/home"}]'
            className="border p-2 w-full mb-3"
          />
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white p-2 mr-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
