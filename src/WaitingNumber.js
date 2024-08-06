import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WaitingNumber.css';

function WaitingNumber({ navigateTo }) {
  const [waitingNumber, setWaitingNumber] = useState(null);

  useEffect(() => {
    const fetchWaitingNumber = async () => {
      try {
        const response = await axios.get('/api/waiting-number');
        setWaitingNumber(response.data.waitingNumber);
      } catch (error) {
        console.error("대기 번호를 가져오는 중 오류 발생:", error);
      }
    };

    fetchWaitingNumber();
  }, []);

  return (
    <div className="waiting-number-container">
      <h1>대기 번호</h1>
      {waitingNumber !== null ? (
        <div className="number-display">{waitingNumber}</div>
      ) : (
        <p>대기 번호를 가져오는 중...</p>
      )}
      <button onClick={() => navigateTo('queue')} className="home-btn">
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default WaitingNumber;