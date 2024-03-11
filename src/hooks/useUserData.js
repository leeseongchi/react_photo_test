import { useState } from "react";

export const useUserData = () => {
    const [userData, setUserData] = useState("");

    return { userData, setUserData };
};