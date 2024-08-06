import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QueueStatus.css";

function QueueStatus({ navigateTo }) {
  const [queueCount, setQueueCount] = useState(0);
  const [queueNumbers, setQueueNumbers] = useState([]);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState("예상 대기 시간: 정보를 불러오는 중...");

  useEffect(() => {
    const fetchQueueCount = async () => {
      try {
        const response = await axios.get("/api/queue-count");
        setQueueCount(response.data.count);
      } catch (error) {
        console.error("대기 인원 수를 가져오는 중 오류 발생:", error);
      }
    };

    fetchQueueCount();

    const socket = new WebSocket("ws://your-backend-url/ws");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "QUEUE_UPDATE") {
        setQueueNumbers(data.numbers);
        setQueueCount(data.count);
        
        // 예상 대기 시간 업데이트
        if (data.estimatedWaitTime) {
          const formattedTime = formatEstimatedWaitTime(data.estimatedWaitTime);
          setEstimatedWaitTime(`예상 대기 시간: ${formattedTime}`);
        } else {
          setEstimatedWaitTime("예상 대기 시간: 정보가 없습니다."); // 값이 없을 경우 기본 메시지
        }
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const formatEstimatedWaitTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${minutes}분`; // 1시간 이하일 경우 "시간" 생략
    }
  };

  const handleRegisterClick = () => {
    navigateTo('register');
  };

  return (
    <div className="queue-status-container">
      <h1>대기 인원 수</h1>
      <div className="queue-count-box">{queueCount}</div>
      <div className="queue-display">
        <h2>대기열</h2>
        <div className="queue-numbers">
          {queueNumbers.map((number, index) => (
            <div key={index} className="queue-number">{number}</div>
          ))}
        </div>
      </div>

      {/* 예상 대기 시간 추가: 대기열 박스 아래, 등록 버튼 위 */}
      <div className="estimated-wait-time">
        <p>{estimatedWaitTime}</p>
      </div>

      <button className="register-btn" onClick={handleRegisterClick}>
        대기열 등록
      </button>
    </div>
  );
}

export default QueueStatus;