import { createContext, useContext, useEffect, useState } from "react";
import { auth, collection, db, getDocs } from "../../lib/firebase";
import { doc, query, where } from "firebase/firestore";
import { Alert } from "react-native";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null)
  const [bankData, setBankData] = useState([]);

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = auth.currentUser;
      
      if (!currentAccount) throw new Error("No current user");
  
      const q = query(collection(db, "users"), where("email", "==", currentAccount.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data()); 
          setUser(doc.data());
          setUserName(doc.data().username); // Adjust according to your data structure
          setIsLoggedin(true);
          return doc
        });

      } else {
        console.log("No user data available");
        setIsLoggedin(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoggedin(false);
    } finally {
      setIsLoading(false);
    }
  };

//   const getFoodData = async () => {
//     setIsLoading(true)
//     try {
//         const foodSnapShot = await getDocs(collection(db, "foodList"));
//         foodSnapShot.forEach((doc) => {
//               setBankData(doc.data())
// }); 
//     } catch(err) {
//         console.log(err)
//         Alert.alert(`${err}`)
//     } finally {
//         setIsLoading(false)
//     }
// }

  
  useEffect(() => {
    getCurrentUser();
    // getFoodData()
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedin,
        user,
        setIsLoggedin,
        setUser,
        isLoading,
        setIsLoading,
        userName,
        setUserName,
        bankData,
        setBankData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
