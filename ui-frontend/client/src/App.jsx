import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateUI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "https://ui-project-5rcl.onrender.com/generate",
        { prompt }
      );

      setCode(response.data.code);
    } catch (error) {
      console.error("Error:", error);
      setCode("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI UI Generator</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the UI you want..."
          style={styles.textarea}
        />

        <button onClick={generateUI} style={styles.button}>
          {loading ? "Generating..." : "Generate UI"}
        </button>

        <div style={styles.outputBox}>
          <h3>Generated Code:</h3>
          <pre style={styles.code}>{code}</pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "700px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  outputBox: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "8px",
    maxHeight: "250px",
    overflowY: "auto"
  },
  code: {
    fontSize: "14px",
    whiteSpace: "pre-wrap"
  }
};

export default App;
