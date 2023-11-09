import './App.css';
import React, {useState} from 'react';
function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({name: '', email:'',phone:''});
  const [editingIndex,setEditingIndex] = useState(-1);
  const [searchQuery,setSearchQuery] = useState('');
  const handleCreate = () => {
    if(newContact.name.trim() === '' || newContact.phone.trim() === ''){
      alert('Name and Phone Number are required fields')
      return;
    }
    setContacts([...contacts,newContact].sort((a,b) => a.name.localeCompare(b.name)));
    setNewContact({name:'', email:'',phone:''});
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewContact(contacts[index]);
  };
  const handleUpdate = () => {
    const updatedContacts = [...contacts];
    updatedContacts[editingIndex] = newContact;
    setContacts(updatedContacts.sort((a,b) => a.name.localeCompare(b.name)));
    setNewContact({name:'', email:'',phone:''});
    setEditingIndex(-1);
  };
  const handleCancelEdit = () => {
    setNewContact({name:'', email:'',phone:''});
    setEditingIndex(-1);
  };
  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index,1);
    setContacts(updatedContacts.sort((a,b) => a.name.localeCompare(b.name)));
  };

  const filterContacts = contacts.filter((contact) => {
    const combinedVariable = `${contact.name}${contact.email}${contact.phone}`.toLowerCase();
    return combinedVariable.includes(searchQuery.toLowerCase());
  });
  return (
    <div className="App">
      <header>
        <h1>Phone Book</h1>
        <div><input type='text'
        placeholder='search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}></input>
        </div>
        <div>
          <input type='text'
          placeholder='Name'
          value={newContact.name}
          onChange={(e) =>setNewContact({...newContact,name:e.target.value})}></input>
          <input type='text'
          placeholder='Email'
          value={newContact.email}
          onChange={(e) =>setNewContact({...newContact,email:e.target.value})}></input>
          <input type='text'
          placeholder='Phone'
          value={newContact.phone}
          onChange={(e) =>setNewContact({...newContact,phone:e.target.value})}></input>
          {editingIndex === -1 ? (
          <button onClick={handleCreate}>create</button>
          ):(
          <>
            <button onClick={handleUpdate}>update</button>
            <button onClick={handleCancelEdit}>cancel</button>
          </>
          )}
        </div>
        </header>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {filterContacts.map((contact,index)=>(
            <tr key={index}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td><button onClick={() => handleEdit(index)}>edit</button></td>
            <td><button onClick={() => handleDelete(index)}>Delete</button></td>
          </tr>
          ))}
          </tbody>
        </table>
    </div>
  );
}

export default App;
