fetch('http://localhost:5173/api/projects?page=2&limit=6')
  .then((r) => r.json())
  .then((data) => console.log(JSON.stringify(data, null, 2)))
