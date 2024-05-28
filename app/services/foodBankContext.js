import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../../lib/firebase";

const BankContext = createContext();

export const useBankContext = () =>  useContext(BankContext)

const BankProvider = ({children}) => {
    const [bankData, setBankData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getFoodData = async () => {
        setIsLoading(true)
        try {
            const foodSnapShot = await getDocs(collection(db, "foodList"));
            foodSnapShot.forEach((doc) => {
                  setBankData(doc.data())
}); 
        } catch(err) {
            console.log(err)
            Alert.alert(`${err}`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFoodData()
    }, [])

    return (
        <BankContext.Provider value={{bankData, setBankData, isLoading, setIsLoading, getFoodData}}></BankContext.Provider>
    )
}

export {BankContext, BankProvider}