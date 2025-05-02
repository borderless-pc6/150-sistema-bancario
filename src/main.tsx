import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./App.css"

// Fix the null check issue with a proper null check
const rootElement = document.getElementById("root")

// Ensure the root element exists before creating the React root
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error("Root element not found! Make sure there is a div with id 'root' in your HTML.")
}
