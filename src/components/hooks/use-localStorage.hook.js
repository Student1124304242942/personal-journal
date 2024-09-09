import { useState, useEffect } from "react";

export function useLocalStorage(key) {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : []; 
    });

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem(key));
        if (res) {
            setData(res);
        }
    }, [key]);

    const saveData = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData);
    };

    return [data, saveData];
}
