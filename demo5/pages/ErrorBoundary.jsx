import React, { useState, useEffect } from 'react';

function ErrorBoundary(props) {
  // Define state variable to track whether there is an error or not
  const [hasError, setHasError] = useState(false);

  // Update state if an error occurs
  useEffect(() => {
    function componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
    //   console.log({ error, errorInfo });
      setHasError(true);
    }

    componentDidCatch();

    // Cleanup function to reset state when component unmounts
    return () => {
      setHasError(false);
    };
  }, []);

  // Render custom fallback UI if there is an error
  if (hasError) {
    return props.children
  }

  // Return children components in case of no error
  return props.children;
}

export default ErrorBoundary;
