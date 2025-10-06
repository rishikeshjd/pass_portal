import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleTable() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/schedule')
      .then(response => {
        setSchedule(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load schedule');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
	<tr>
          <th>Date</th>
          <th>Spacecraft</th>
          <th>Station</th>
          <th>Orbit</th>
          <th>Elevation</th>
          <th>AOS</th>
          <th>LOS</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
	{schedule.map((entry, idx) => (
          <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
            <td>{entry.date}</td>
            <td>{entry.sc}</td>
            <td>{entry.stn}</td>
            <td>{entry.orb}</td>
            <td>{entry.ele}</td>
            <td>{entry.aos}</td>
            <td>{entry.los}</td>
            <td>{entry.oprn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleTable;

