import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage.jsx";

const Router = () => {
    return (
    <BrowserRouter>
         <Routes>
            <Route exact path='/start' Component={StartPage}/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router;