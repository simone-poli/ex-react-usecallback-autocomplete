import { useState, useEffect } from "react"

function App() {

  async function fetchJson(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
  }

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])


  async function fetchSuggestions() {
    const data = await fetchJson(`http://localhost:3333/products?search=${query}`)
    setSuggestions(data)
  }

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);




  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Cerca prodotto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((p) =>
              <li key={p.id}> {p.name} </li>)}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
