import React, { useState, useEffect } from "react";
import { ContactForm } from "../../components/contactForm/ContactForm";
// import { TileList } from "../../components/tileList/TileList";
import { MdDelete } from "react-icons/md";

export const ContactsPage = ({
  addContact,
  contacts,
  handleRemove,
  setContacts,
}) => {
  /*
  Define state variables for 
  contact info and duplicate check
  */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  /*
    Add contact info and clear data
    if the contact name is not a duplicate
    */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!duplicate) {
      addContact(name, phone, email);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  /*
  Using hooks, check for contact name in the 
  contacts array variable in props
  */
  useEffect(() => {
    const nameIsDuplicate = () => {
      const found = contacts.find((contact) => contact.name === name);
      if (found !== undefined) {
        return true;
      }
      return false;
    };

    if (nameIsDuplicate()) {
      setDuplicate(true);
    } else {
      setDuplicate(false);
    }
  }, [name, contacts, duplicate]);

  return (
    <div>
      <section>
        <h2>
          Add Contact
          {duplicate ? "Name Already Exists" : ""}
        </h2>
        <ContactForm
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          phone={phone}
          email={email}
          name={name}
          handleSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        {contacts.map((contact, index) => (
          <div key={index} className="tile-container">
            <div className="tile-list">
              <div>
                <p
                  className="tile"
                  style={{ fontWeight: "bold", fontSize: 20 }}
                >
                  {index + 1}. {contact.name}
                </p>
                <p className="tile">Email: {contact.email}</p>
                <p className="tile">Phone: {contact.phone}</p>
              </div>
              <button className="delete-button">
                <MdDelete
                  onClick={() => {
                    handleRemove(contacts,contact.id, setContacts);
                  }}
                />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
