import { useEffect, useState } from "react";
import "./App.css";
import HomeLoader from "./utils/components/HomeLoader";
import UnderDev from './utils/underDevelopment/UnderDev'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);      
    }, 4000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {isLoading ? (
        <HomeLoader />
      ) : (
        <>
        <UnderDev/>
        </>
      )}
    </>
  );
}

export default App;
