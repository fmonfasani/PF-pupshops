"use client";

import { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [bounce, setBounce] = useState(false); // Estado para controlar el rebote

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const welcomeMessage = {
        from: "bot",
        text: "Hola, bienvenido a PupShops! ¿Qué buscas?, ¿productos de perro o gatos?",
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    const newMessage = { from: "user", text: userMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const botResponse = handleBotResponse(userMessage);
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    setUserMessage("");
  };

  const handleBotResponse = (message: string) => {
    let botText = "";

    if (
      message.toLowerCase().includes("perro") ||
      message.toLowerCase().includes("perros")
    ) {
      botText = `
        Elige una categoría:
        <ul>
          <li><a href="/Categorias/Perro/SubCategorias/Alimento" class="text-teal-600 underline">Alimento</a></li>
          <li><a href="/Categorias/Perro/SubCategorias/Accesorios" class="text-teal-600 underline">Accesorios</a></li>
        </ul>
      `;
    } else if (
      message.toLowerCase().includes("gato") ||
      message.toLowerCase().includes("gatos")
    ) {
      botText = `
        Elige una categoría:
        <ul>
          <li><a href="/Categorias/Gato/SubCategorias/Alimento" class="text-teal-600 underline">Alimento</a></li>
          <li><a href="/Categorias/Gato/SubCategorias/Accesorios" class="text-teal-600 underline">Accesorios</a></li>
        </ul>
      `;
    } else if (message.toLowerCase().includes("descuento")) {
      botText =
        "Recuerda que comprando más de $100 tienes un 10% de descuento.";
    } else if (message.toLowerCase().includes("newsletter")) {
      botText =
        "¡No olvides suscribirte a nuestro newsletter para recibir novedades!";
    } else if (message.toLowerCase().includes("ayuda")) {
      botText = `
        Puedes visitar nuestra página de ayuda para obtener más información.
        <a href="/ayuda" class="text-teal-600 underline">Haz clic aquí para ayuda.</a>
      `;
    } else {
      botText =
        "Lo siento, no entendí tu pregunta. ¿Puedes especificar si buscas productos para perros o gatos?";
    }

    const finalMessage = `
      Visita la sección de productos o usa la barra de búsqueda para encontrar lo que necesitas.
    `;

    return { from: "bot", text: botText + finalMessage };
  };

  // Hook para animar el ícono cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev); // Cambia el estado para activar la animación
    }, 6000); // Cambia cada 6 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? "w-80" : "w-16"}`}>
      <button
        onClick={toggleChat}
        className={`bg-teal-600 text-white rounded-full p-3 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
          bounce ? "animate-bounce" : ""
        }`} // Aplica la animación aquí
      >
        <AiOutlineMessage size={24} />
      </button>
      {isOpen && (
        <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="h-64 overflow-y-auto border border-gray-300 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.from === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={`block p-2 rounded ${
                    msg.from === "user" ? "bg-teal-200" : "bg-gray-200"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex mt-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-grow border border-gray-300 rounded p-1"
              placeholder="Escribe tu mensaje..."
            />
            <button
              type="submit"
              className="bg-teal-600 text-white rounded p-2 ml-2"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
