import React from 'react'
import { Line, Pie} from '@ant-design/charts';
import "./style.css";

const ChartComponent = ({ sortedTransaction }) => {
  const data = sortedTransaction.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  const spendingData = sortedTransaction.filter((transaction)=>{
    if(transaction.type==="expense"){
      return {tag:transaction.tag,amount:transaction.amount};
    }
  });
  let finalSpending = spendingData.reduce((acc,obj)=>{
    let key = obj.tag;
    if(!acc[key]){
      acc[key]= {tag: obj.tag, amount:obj.amount}; // create a new object with same properties
    }else{
      acc[key].amount +=obj.amount;
    }
    return acc;
  },{});

  let newSpending = [
      {tag:"food",amount:0},
      {tag:"education",amount:0},
      {tag:"office",amount:0},
  ];
spendingData.forEach((item)=>{
  if(item.tag=="food"){
    newSpending[0].amount+=item.amount;
  }
  else if(item.tag=="education"){
    newSpending[1].amount+=item.amount;
  }
  else{
    newSpending[2].amount+=item.amount;
  }
});

  const config = {
          data:data,        
          autoFit: true,
          xField: 'date',
          yField: 'amount',
        };
        const spendingconfig = {
          data:newSpending,        
          angleField: "amount",
          colorField:"tag",
        };
 let chart;
let pieChart;
  return (
     <div className="charts-wrapper">
      <div className='chart'>
      <h2 style={{textAlign:'center'}}>Your Analytics</h2>
    <Line {...config} 
    onReady={(chartInstance) => (chart = chartInstance)} 
    />
      </div>
      <div className='chart'>
<h2 style={{textAlign:'center'}}>Your Spendings</h2>
<Pie className="pie" {...spendingconfig} 
    onReady={(chartInstance) => (pieChart = chartInstance)}/>
      </div >
    </div>
  )
}

export default ChartComponent;