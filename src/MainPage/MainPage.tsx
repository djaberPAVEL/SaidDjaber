import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width:100%;
  background-color: #f4f4f4;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: center;
  
`;

const Card = styled.div`
  margin: 20px;
  padding: 20px;
  width: 200px;
  height: 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  direction: rtl;
  
`;

const CardValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  
`;

const MainPage: React.FC = () => {
  const [employees, setEmployees] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [employeesOnVacation, setEmployeesOnVacation] = useState(0);
  const [availableJobs, setAvailableJobs] = useState(0);

  useEffect(() => {
    // Fake data for demonstration purposes
    setEmployees(8);
    setJobs(5);
    setEmployeesOnVacation(2);
    setAvailableJobs(3);
  }, []);

  return (
    <MainContainer>
      <h1>الصفحة الرئيسية </h1>
      <CardContainer>
        <Card>
          <CardTitle>عدد الموظفين</CardTitle>
          <CardValue>{employees}</CardValue>
        </Card>
        <Card>
          <CardTitle>عدد الوظايف</CardTitle>
          <CardValue>{jobs}</CardValue>
        </Card>
        <Card>
          <CardTitle>عدد الموظفين في عطلة</CardTitle>
          <CardValue>{employeesOnVacation}</CardValue>
        </Card>
        <Card>
          <CardTitle>عدد المناصب الشاغرة </CardTitle>
          <CardValue>{availableJobs}</CardValue>
        </Card>
      </CardContainer>
    </MainContainer>
  );
};

export default MainPage;