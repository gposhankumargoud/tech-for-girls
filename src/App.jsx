import Form from "./components/Form";

function App() {
  const handleFormSubmit = async (formData) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];

      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        college: formData.college,
        fileName: formData.screenshot.name,
        fileType: formData.screenshot.type,
        fileContent: base64,
      };

      await fetch("https://script.google.com/macros/s/AKfycbxwDhmeJZ-D6MMXhEZ-1C7MYZ7nZMi9lVO6czSz16-beROc3MiwOfK2ja2GLZDbcp_E/exec", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });
    };

    reader.readAsDataURL(formData.screenshot);
  };

  return (
    <div className="container">
      <h1>Tech for Girls Registration</h1>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
