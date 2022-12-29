import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        type="text"
        placeholder="Cotact Name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        value={phone}
        type="tel"
        placeholder="Contact Phone (###-###-####)"
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        value={email}
        type="text"
        placeholder="Contact Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input type="submit" value="Add Contact" />
    </form>
  );
};
