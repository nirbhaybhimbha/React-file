// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const initialData = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 32 },
    { id: 3, name: 'Sam Johnson', age: 24 },
  ];



  const [data, setData] = useState(initialData);
  const [checkedRows, setCheckedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({ name: '', age: '' });

  let [array, setArray] = useState(
    JSON.parse(localStorage.getItem("formdata")) || []
  )
  const [object, setObject] = useState({
    fname: "",
    email: "",
    pasword: ""
  })

  const [isEdit, setIsEdit] = useState(-1)
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setObject({ ...object, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (isEdit !== -1) {
      const updatedArray = array.map((item, index) => {
        if (isEdit === index) {
          return object
        }
        else return item
      })
      setArray(updatedArray)
      localStorage.setItem("formdata", JSON.stringify(updatedArray))
      setIsEdit(-1)
    }

    else {
      setArray([...array, object])
      localStorage.setItem("formdata", JSON.stringify([...array, object]))
    }
  }
  //  Edite.
  const edite = (indexx) => {
    const itemToEdit = array.find((item, index) => { return index === indexx })
    setObject(itemToEdit)
    setIsEdit(indexx)
  }

  // Remove.
  const dilete = (index) => {
    const updatedArray = [...array].filter((item, idx) => idx !== index)
    setArray(updatedArray)
    localStorage.setItem("formdata", JSON.stringify(updatedArray))
  }

  // SORT.
  // const sortArrayByName = () => {
  //   const sortarray = [...array].sort((a, b) => { return (a.fname > b.fname ? 1 : -1) })
  //   setArray(sortarray)
  // }

  const sortArrayByName = () => {
    const sortarray = [...array].sort((a, b) => { return (a.fname > b.fname ? 1 : -1) })
    setArray(sortarray)
  }


  // // Handlesearch.
  // const handleSearch = () => {
  //   const filteredArray = array.filter((item) =>
  //     item.fname.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   setArray(filteredArray)
  // }

  const handleSearch = () => {
    const filteredArray = array.filter((item) =>
      item.fname.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
    setArray(filteredArray)
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setCheckedRows(data.map((row) => row.id)); // Select all rows
    } else {
      setCheckedRows([]); // Deselect all rows
    }
  };


  return (
    <>
      <div style={{ padding: "100px", flexDirection: "column", display: "flex" }}>
        <label htmlFor='fname'>First Name</label>
        <input type='text' name='fname' value={object.fname} onChange={handleChange} />
        <br />

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={object.email} onChange={handleChange} />
        <br />

        <label htmlFor='pasword'>Password</label>
        <input type='password' name='pasword' value={object.pasword} onChange={handleChange} />
        <br />

        <button type='submit' onClick={handleSubmit}>Submit</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <button type='submite' onClick={sortArrayByName} style={{ padding: "10px" }}>
          Sort by Name
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "5px" }}>
          Search
        </button>

        {/* <button onClick={searchreset} style={{ marginLeft: "10px", padding: "5px" }}>
          Reset Search
        </button> */}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table border={1} cellPadding={"10"} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={checkedRows.length === data.length}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>First Name</th>
              <th>Email</th>
              <th>Password</th>
              <th style={{ color: "red" }}>Remove</th>
              <th style={{ color: "green" }}>Edite</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => (
              <tr key={index}>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.pasword}</td>
                <td>
                  <button type='submit' onClick={() => dilete(index)}>Remove</button>
                </td>
                <td>
                  <button type='submit' onClick={() => edite(index)} >Edite</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
