import React from "react";
import { useCookies } from "react-cookie";

const Cookies = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

    const handleClick = () => {
        if (cookies["jwt-token"]) {
            console.log("Cookie already set");
            removeCookie("jwt-token");
            return;
        }
        setCookie("jwt-token", "value", {
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
        });
    };

    return (
        <div>
            <button onClick={handleClick}>Set Cookie</button>
        </div>
    );
}

export default Cookies;