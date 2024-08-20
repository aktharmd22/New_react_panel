import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Valitation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(false);

  useEffect(() => {
    const userData = Cookies.get('userData');
    if (userData !== undefined) {
      setData(true);
      navigate('/Team-Inbox', { replace: true });
    } else {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      {/* You can optionally display a loading spinner or message here */}
      {!data && <p>Redirecting...</p>}
    </div>
  );
};

export default Valitation;
