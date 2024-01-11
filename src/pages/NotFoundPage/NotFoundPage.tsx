import { useNavigate } from 'react-router-dom';

import { Button } from '@components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    console.log('hello');
    navigate('/dashboard');
  };

  return (
    <div className="bg-opacity-50 bg-gray-700 p-10 rounded-md">
      <h1 className="text-white text-9xl">404</h1>
      <p className="text-white text-2xl mb-8">
        Sorry, the page you're looking for cannot be found!
      </p>
      <Button
        onClick={handleRedirect}
        className="text-white"
        text="Go to Dashboard"
      />
    </div>
  );
};
