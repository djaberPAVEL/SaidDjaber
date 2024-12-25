import React, { useState } from 'react';

interface CreditCardProps {
  onSubmit: (cardDetails: { cardNumber: string; expiryDate: string; cvv: string }) => void;
}

function CreditCard({ onSubmit }: CreditCardProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiryDate, cvv });
};

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-2">
        <label className="block mb-1">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Expiry Date</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="MM/YY"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="123"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}

export default CreditCard;