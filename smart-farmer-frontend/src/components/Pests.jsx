function Pests({
  pests,
  showPests,
  setShowPests,
  search,
}) {
  return (
    <div className="card">
      <h2>🐛 Pests</h2>

      <button onClick={() => setShowPests(!showPests)}>
        {showPests ? "Hide Pests" : "View Pests"}
      </button>

      <p>Total Pests: {pests.length}</p>

      {showPests &&
        pests
        .filter((pest) =>
        pest.name.toLowerCase().includes(search.toLowerCase())
            )
        .map((pest) => (
        <div key={pest.id}>
      <h3>{pest.name}</h3>
      <p>Symptoms: {pest.symptoms}</p>
      <p>Treatment: {pest.treatment}</p>
      <hr />
    </div>
  ))}
    </div>
  );
}

export default Pests;