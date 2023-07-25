import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button";

const Cards = ({
  income,
  expense,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
}) => {
  function reset() {
    console.log("reset the balance");
  }

  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{totalBalance}</p>
          <Button onClick={reset} blue={true} text="Reset Balance" />
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button blue={true} text="Add Income" onClick={showIncomeModal} />
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button blue={true} text="Add Expenses" onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
