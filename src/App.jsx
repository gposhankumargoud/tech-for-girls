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

      await fetch("YOUR_SCRIPT_URL", {
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
