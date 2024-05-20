import { createContext, useContext, useEffect, useState } from "react";
import { auth, collection, db, getDocs } from "../../lib/firebase";
import { doc, query, where } from "firebase/firestore";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null)

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = auth.currentUser;
      console.log(currentAccount.email)
  
      if (!currentAccount) throw new Error("No current user");
  
      const q = query(collection(db, "users"), where("email", "==", currentAccount.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data()); 
          setUser(doc.data());
          setUserName(doc.data().username); 
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
  
  useEffect(() => {
    getCurrentUser();
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
        setUserName
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
