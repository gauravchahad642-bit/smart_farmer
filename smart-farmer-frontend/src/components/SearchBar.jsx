function SearchBar({ search, setSearch }) {
  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;