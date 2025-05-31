import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./components/Login"
import Feed from "./components/Feed"
import Body from "./components/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Profile from "./components/Profile"
import Requests from "./components/Requests"
import Connections from "./components/Connections"
import Policy from "./components/Policy"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/policy" element={<Policy />} />

            </Route >
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
