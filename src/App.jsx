

import React from 'react';
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ErrorPage from "./pages/ErrorPage";
import 'antd/dist/antd.css';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/detail/:id" element={<Detail />} />*/}
                <Route path="/detail/asdad" element={<Detail />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App
