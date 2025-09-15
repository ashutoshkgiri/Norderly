import React, { useEffect, useState } from 'react';
import API from '../api';
import OrdersChart from '../components/Charts/OrdersChart';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [totals, setTotals] = useState({ totalCustomers: 0, totalOrders: 0, revenue: 0 });
  const [series, setSeries] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const t = await API.get('/insights/totals');
        setTotals(t.data);
        const o = await API.get('/insights/orders-by-date');
        setSeries(o.data.series);
        const top = await API.get('/insights/top-customers');
        setTopCustomers(top.data.top);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  async function handleLogout() {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>Insights Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Total customers</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>{totals.totalCustomers}</p>
        </div>
        <div style={{ flex: 1, minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Total orders</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>{totals.totalOrders}</p>
        </div>
        <div style={{ flex: 1, minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Revenue</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px', color: '#28a745' }}>₹{Number(totals.revenue || 0).toFixed(2)}</p>
        </div>
      </div>

      <section style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Orders by date</h2>
        <OrdersChart data={series} />
      </section>

      <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Top customers</h2>
        <ol style={{ paddingLeft: '20px', margin: 0 }}>
          {topCustomers.map(c => (
            <li key={c.id} style={{ marginBottom: '8px', fontSize: '16px', color: '#555' }}>
              {c.first_name} {c.last_name} — <span style={{ fontWeight: 'bold' }}>₹{Number(c.total_spent).toFixed(2)}</span>
            </li>
          ))} 
        </ol>
      </section>
    </div>
  );
}
