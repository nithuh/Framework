// src/App.tsx
import React, { useState } from "react";

const App: React.FC = () => {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [prayertowerName, setPrayertowerName] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state, district, prayertowerName }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`PT Code: ${data.ptCode}`);
      } else {
        const errorData = await response.json();
        setResult(
          `Error: ${
            errorData.error || "Error generating PT Code. Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-700 text-white p-4 text-center shadow-md">
        <img
          src="https://peopleserve.app/Static/PG/DesignResource/JC_logo_427x103_1-04.png"
          alt="Prayer Tower Logo"
          className="mx-auto h-20"
        />
      </header>

      <div className="container mx-auto p-8">
        <h1 className="text-center text-3xl font-bold mb-6">PT Code</h1>
        <form
          className="bg-white p-6 rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="state" className="block text-lg font-medium mb-2">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="w-full p-2 border border-gray-300 rounded"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-lg font-medium mb-2"
            >
              District:
            </label>
            <input
              type="text"
              id="district"
              className="w-full p-2 border border-gray-300 rounded"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="prayertowerName"
              className="block text-lg font-medium mb-2"
            >
              Prayer Tower Name:
            </label>
            <input
              type="text"
              id="prayertowerName"
              className="w-full p-2 border border-gray-300 rounded"
              value={prayertowerName}
              onChange={(e) => setPrayertowerName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Generate PT Code
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center text-lg font-bold text-red-500">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
