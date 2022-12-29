import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  
  // get data from local
  
  function getLocalItems (item) {
    let list = localStorage.getItem(item);
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  /*
  Define state variables for 
  contacts and appointments 
  */
  const [contacts, setContacts] = useState(getLocalItems('Contact'));
  const [appointments, setAppointments] = useState(getLocalItems('Appointment'));

  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  /*
  Implement functions to add data to
  contacts and appointments
  */
  const addContact = (name, phone, email) => {
    setContacts([
      ...contacts,
      {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email,
      },
    ]);
  };
  const addAppointment = (title, contact, time, date) => {
    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        title: title,
        contact: contact,
        time: time,
        date: date,
      },
    ]);
  };
  const handleRemove = (item, itemId, setItem) => {
    const newItem = item.filter((task) => task.id !== itemId);
    setItem(newItem);
    alert('Deleted!')
  };

   
  //add data to localStorage
  useEffect(() => {
    localStorage.setItem('Contact', JSON.stringify(contacts));
    localStorage.setItem('Appointment', JSON.stringify(appointments));
  }, [contacts, appointments]);
    
  return (
    <>
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.CONTACTS} />
          </Route>
          <Route path={ROUTES.CONTACTS}>
            {/* Add props to ContactsPage */}
            <ContactsPage
              contacts={contacts}
              addContact={addContact}
              handleRemove={handleRemove}
              setContacts={setContacts}
            />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            {/* Add props to AppointmentsPage */}
            <AppointmentsPage
              addAppointment={addAppointment}
              appointments={appointments}
              contacts={contacts}
              setAppointments={setAppointments}
              handleRemove={handleRemove}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
