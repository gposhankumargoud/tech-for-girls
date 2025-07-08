import { useState } from "react";

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    screenshot: null,
  });

  const [sharedCount, setSharedCount] = useState(0);
  const [submitted, setSubmitted] = useState(localStorage.getItem("submitted") === "true");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleShare = () => {
    if (sharedCount < 5) {
      window.open(`https://wa.me/?text=Hey Buddy, Join Tech For Girls Community`, "_blank");
      setSharedCount((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sharedCount < 5) {
      alert("Please complete sharing (5 times)");
      return;
    }
    onSubmit(formData);
    setSubmitted(true);
    localStorage.setItem("submitted", "true");
  };

  if (submitted) {
    return <h2>🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!</h2>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required onChange={handleChange} />
      <input name="phone" type="number" placeholder="Phone" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="college" placeholder="College/Department" required onChange={handleChange} />
      <input type="file" name="screenshot" accept="image/*,.pdf" required onChange={handleChange} />

      <button type="button" onClick={handleShare}>
        Share on WhatsApp
      </button>
      <p>Click count: {sharedCount}/5</p>
      {sharedCount >= 5 && <p>Sharing complete. Please continue.</p>}

      <button type="submit">Submit Registration</button>
    </form>
  );
}
