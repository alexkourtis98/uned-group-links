/*
 *
 *   MIT License
 *
 *   Copyright (c) 2023 Open Source Alexandros Kourtis
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
                *
 *     -Alexandros Kourtis
 *
 * /
 */

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import AboutSettingsPage from "./pages/AboutSettingsPage";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/about" element={<AboutSettingsPage/>}/>
            </Route>
            <Route path="/super-admin" element={<SuperAdminLogin/>}/>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard/>}/>
        </Routes>
    );
}

export default App;
