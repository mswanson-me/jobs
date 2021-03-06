import React from 'react';
import './App.css';

import List from './List';

const JOB_API_URL = '/api/list';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();

  updateCb(json);
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <List list={jobList} />
    </div>
  );
}

export default App;