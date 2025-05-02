import { SetStateAction, useState } from "react"
import HomePage from "./Pages/HomePage/HomePage"
import RegisterPage from "./Pages/Register/Register"
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage2 from './Pages/RegisterPage2/RegisterPage2'
import RegisterPage15 from './Pages/RegisterPage1.5/RegisterPage15'

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const navigateTo = (page: SetStateAction<string>) => {
    setCurrentPage(page)
  }

  return (
    <div className="app">
      {currentPage === "home" && (
        <HomePage
          onRegisterClick={() => navigateTo("register")}
          onLoginClick={() => navigateTo("login")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onBackToHome={() => navigateTo("home")}
          onGoNext={() => navigateTo("register15")}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          onBackToHome={() => navigateTo("home")}
          onGoToInitial={() => navigateTo("initial")}
        />
      )}

      {currentPage === "register15" && (
        <RegisterPage15
          onGoNextCpf={() => navigateTo("register2")}
          onGoBack={() => navigateTo("home")}
        />
      )}

      {currentPage === "register2" && (
        <RegisterPage2
          onGoNext={() => navigateTo("register2")} />
      )}
    </div>
  )
}

export default App
