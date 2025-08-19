import React, { useState } from 'react';
import sampleData from './sampleData.json';
import './App.css';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    const selectedData = sampleData.filter((_, idx) =>
      selectedItems.includes(idx)
    );

    // Trigger JSON file download
    const fileData = JSON.stringify(selectedData, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected-feedback.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // For now, do not send to backend (commented out)
    /*
    fetch('http://localhost:5000/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: fileData,
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg.status === 'success') {
          alert('Server response: ' + msg.message);
        } else {
          alert('Server returned an error.');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to send data to server');
      });
    */
  };

  return (
    <div className="container">
      <h1>Spacecraft Scheduling Requests</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Satellite (sc)</th>
              <th>Station (stn)</th>
              <th>Date</th>
              <th>Orbital Pass (orb)</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(idx)}
                    onChange={() => handleCheckboxChange(idx)}
                  />
                </td>
                <td>{item.sc}</td>
                <td>{item.stn}</td>
                <td>{item.date}</td>
                <td>{item.orb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit} className="submit-btn">
        Submit Selection
      </button>
    </div>
  );
}

export default App;


