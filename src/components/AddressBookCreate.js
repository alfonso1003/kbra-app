import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addNewAddress } from "../features/addresses/addressesSlice";

const newAddressInitialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  street_address: ""
};

export default function AddressBookCreate() {
  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState(newAddressInitialState);

  const { first_name, last_name, phone_number, email, street_address } =
    newAddress;

  const disableSubmit =
    !phone_number && !email && !street_address ? true : false;

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAddress(newAddress));
    setNewAddress(newAddressInitialState);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px"
      }}
    >
      <Form onSubmit={handleAddAddressSubmit}>
        <Form.Label>Create New Entry</Form.Label>

        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Control
            name="first_name"
            value={first_name}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Control
            name="last_name"
            value={last_name}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
          <Form.Control
            name="phone_number"
            value={phone_number}
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Control
            name="email"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicStreetAddress">
          <Form.Control
            name="street_address"
            value={street_address}
            type="text"
            placeholder="Street Address"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
