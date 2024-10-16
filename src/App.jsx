import { useState } from "react";

function App() {
  const languages = [
    { code: "en-us", name: "Inglês" },
    { code: "es", name: "Espanhol" },
    { code: "fr", name: "Francês" },
    { code: "de", name: "Alemão" },
    { code: "it", name: "Italiano" },
    { code: "pt-br", name: "Português" },
  ];

  const [inputValue, setInputValue] = useState("");
  const [valueTraduz, setValueTraduz] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function traduz() {
    if (inputValue.trim() === "") {
      // Se o campo estiver vazio, exiba uma mensagem de erro
      setError("Por favor, insira um texto para traduzir.");
      return;
    }

    setIsLoading(true);
    setError("");

    fetch(
      `https://api.mymemory.translated.net/get?q=${inputValue}&langpair=pt-br|en`
    )
      .then((resposta) => resposta.json())
      .then((dados) => {
        setValueTraduz(dados.responseData.translatedText);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Erro ao realizar a tradução. Tente novamente.");
        setIsLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-red-900 flex flex-col">
      <header className="bg-red-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-red-300 text-2xl font-bold">Tradutor</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-red-700 rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-red-600">
            <select
              className="text-sm text-red-200 bg-transparent border-none focus:outline-none cursor-pointer"
              value="pt-br"
            >
              <option value="pt-br">Português</option>
              <option value="en-us">Inglês</option>
            </select>

            <button className="p-2 rounded-full hover:bg-red-600 outline-none">
              <svg
                className="w-5 h-5 text-red-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              className="text-sm text-red-200 bg-transparent border-none focus:outline-none cursor-pointer"
              value="en-us"
            >
              <option value="pt-br">Português</option>
              <option value="en-us">Inglês</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                className="w-full h-40 text-lg text-red-200 bg-transparent resize-none border-none outline-none"
                placeholder="Digite seu texto..."
                value={inputValue}
                onChange={(evento) => setInputValue(evento.target.value)}
              ></textarea>

              {/* Botão de tradução */}
              <button
                onClick={traduz}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Traduzir
              </button>
            </div>

            <div className="relative p-4 bg-red-800 border-l border-red-600">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-red-500 border-t-2"></div>
                </div>
              ) : (
                <p className="text-lg text-red-200">
                  {valueTraduz || "Colocar aqui o texto traduzido"}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-red-800 border-t border-red-600 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-red-300">
          &copy; {new Date().getFullYear()} Tradutor
        </div>
      </footer>
    </div>
  );
}

export default App;
