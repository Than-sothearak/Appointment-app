import React, { useState } from "react";
import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
// import { TileList } from "../../components/tileList/TileList";
import { MdDelete } from "react-icons/md";

export const AppointmentsPage = ({
  addAppointment,
  appointments,
  contacts,
  handleRemove,
  setAppointments,
}) => {
  /*
  Define state variables for 
  appointment info
  */
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState(contacts.length > 0 ? contacts[0].name : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    Add contact info and clear data  
    */
    addAppointment(title, contact, date, time);
    setTitle("");
    setContact("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <section>
        <h2>Add Appointment</h2>
        <AppointmentForm
          contacts={contacts}
          title={title}
          setTitle={setTitle}
          contact={contact}
          setContact={setContact}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          handleSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Appointments</h2>
        {appointments.map((appointment, index) => (
          <div key={index} className="tile-container">
            <div className="tile-list">
              <div>
                <p
                  className="tile"
                  style={{ fontWeight: "bold", fontSize: 20 }}
                >
                  {index + 1}. {appointment.title}
                </p>
                <p className="tile">Phone: {appointment.contact}</p>
                <p className="tile">Email: {appointment.date}</p>
                <p className="tile">Phone: {appointment.time}</p>
              </div>
              <button className="delete-button">
                <MdDelete
                  onClick={() => {
                    handleRemove(appointments, appointment.id, setAppointments);
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
