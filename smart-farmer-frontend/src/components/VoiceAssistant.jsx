import { useState } from "react";

function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const startVoice = () => {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert("Voice Recognition is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setText("Listening...");
    };

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setText("Voice recognition failed.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="card">
      <h2>🎤 Voice Assistant</h2>

      <p>
        {listening
          ? "🎙️ Listening..."
          : "Click the button and speak your command."}
      </p>

      <button onClick={startVoice}>
        🎤 {listening ? "Listening..." : "Start Voice"}
      </button>

      {text && (
        <p>
          <strong>You said:</strong> {text}
        </p>
      )}
    </div>
  );
}

export default VoiceAssistant;