import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./components/Login"
import Feed from "./components/Feed"
import Body from "./components/Body"

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="feed" element={<Feed />} />

          </Route >
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
