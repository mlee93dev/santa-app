import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Success = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMessage(location.state.message)
  }), [location];

  return (
    <>
      <Header />
      <header>
        <h1>{message}</h1>
      </header>
    </>
  )
}

export default Success;