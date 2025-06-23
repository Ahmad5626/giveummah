import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [amount, setAmount] = useState('');

  const pay = async () => {
    const redirectUrl = window.location.origin + '/status';
    const { data } = await axios.post('http://localhost:9000/api/payment', {
      amount: parseFloat(amount),
      redirectUrl: redirectUrl,
      callbackUrl: redirectUrl,
    });
    window.location.href = data.data.instrumentResponse.redirectInfo.url;
  };

    return (
        <div>
      <h1>PhonePe Sandbox Payment</h1>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount in ₹" />
      <button onClick={pay} disabled={!amount}>Pay with PhonePe</button>
    </div>
    );
}

// This component simulates handling the redirect from PhonePe
// In a real application, you'd parse URL parameters to get status


export default App;
