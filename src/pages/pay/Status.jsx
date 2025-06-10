import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function Status() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const merchantTx = searchParams.get('merchantTransactionId');
    if (merchantTx) {
      axios.get(`http://localhost:5000/api/status/${merchantTx}`)
        .then(res => setStatus(res.data.data.state))
        .catch(() => setStatus('ERROR'));
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Payment Status:</h2>
      <p>{status || 'Waiting...'}</p>
    </div>
  );
}