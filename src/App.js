
import './App.css';
import {useState, useEffect } from "react";
import axios from "axios";

function App() {
  const[amount,setAmount]=useState(1);
  const[fromcurrency,setFromcurrency]=useState("USD");
  const[tocurrency,setTocurrency]=useState("INR")
  const[convertedAmount,setConvertedAmount]=useState(null);
  const[exchangerate,setExchangerate]=useState(null)
  useEffect(()=>{
    const getExchangeRate= async ()=>{
      try{
         let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
         const response=await axios.get(url);
         console.log(response);
         setExchangerate(response.data.rates[tocurrency]);
      }catch(error){
        console.error("Error fetching exchange rate:",error)
      }
    }
    getExchangeRate();
  },[fromcurrency,tocurrency]);

  useEffect(()=>{
      if(exchangerate!==null){
        setConvertedAmount((amount *exchangerate).toFixed(2));
      }
  },[amount,exchangerate])
  const handleChange=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }
  const handlefromcurrenychange=(e)=>{
    setFromcurrency(e.target.value)
  }
  const handletocurrencychange=(e)=>{
    setTocurrency(e.target.value);
  }
  return (
    <div className="currency-converter">
      <div className="box"></div>
      <div className="data">
        <h1>Currency Converter</h1>
        <div className="input-container">
          <label htmlFor="amt">Amount:</label>
          <input type="number" name="number" id="amt" value={amount} onChange={handleChange}></input>
        </div>
        <div className="input-container">
          <label htmlFor="toCurrency">From Currency:</label>
          <select id="toCurrency" value={fromcurrency} onChange={handlefromcurrenychange}>
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japanese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="fromCurrency">To Currency:</label>
          <select id="fromCurrency" value={tocurrency} onChange={handletocurrencychange}>
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japanese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
          </select>
        </div>
        <div className="result">
          <p>{amount} {fromcurrency} is equal to {convertedAmount} {tocurrency}</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
