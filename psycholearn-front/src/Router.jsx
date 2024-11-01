import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

const Router = () => {
    return (
    <BrowserRouter>
         <Routes>
            <Route path="*" Component={NotFound}/>
            <Route exact path="/" Component={() => window.location = "/start"}/>
            <Route exact path="/start" Component={StartPage}/>
            <Route path="/users/:id" Component={Profile}/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router;