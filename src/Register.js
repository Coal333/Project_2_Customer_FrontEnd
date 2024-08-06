import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register({ navigateTo }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({ part1: "", part2: "", part3: "" });
  const [numberOfPeople, setNumberOfPeople] = useState("1");

  const handlePhoneChange = (part, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setPhoneNumber((prev) => ({ ...prev, [part]: numericValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${phoneNumber.part1}${phoneNumber.part2}${phoneNumber.part3}`;
    const customerData = {
      name,
      phoneNumber: fullPhoneNumber,
      numberOfPeople,
    };
    console.log("제출할 데이터:", customerData);

    try {
      await axios.post("/api/customers", customerData);
      console.log("정보가 성공적으로 제출되었습니다!");
      navigateTo('waitingNumber');
    } catch (error) {
      console.error("에러 발생:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>정보 입력</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <div className="phone-input">
              <input
                type="text"
                maxLength="3"
                value={phoneNumber.part1}
                onChange={(e) => handlePhoneChange("part1", e.target.value)}
                required
              />
              <span>-</span>
              <input
                type="text"
                maxLength="4"
                value={phoneNumber.part2}
                onChange={(e) => handlePhoneChange("part2", e.target.value)}
                required
              />
              <span>-</span>
              <input
                type="text"
                maxLength="4"
                value={phoneNumber.part3}
                onChange={(e) => handlePhoneChange("part3", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPeople">총 인원 수</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              min="1"
              step="1"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;