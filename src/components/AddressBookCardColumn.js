import { useSelector, useDispatch } from "react-redux";
import {
  selectAllAddresses,
  fetchAddresses,
  getAddressesStatus,
  getAddressesError,
  getFilteredAddresses
} from "../features/addresses/addressesSlice";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { groupAlphabetizedArrayByFirstLetterLastName } from "../utils/addressUtils";

export default function AddressBookCardColumn() {
  const dispatch = useDispatch();

  const addresses = useSelector(selectAllAddresses);
  const addressStatus = useSelector(getAddressesStatus);
  const error = useSelector(getAddressesError);
  const filteredAdresses = useSelector(getFilteredAddresses);
  const displayAddresses =
    filteredAdresses.length > 0 ? filteredAdresses : addresses;
  const displayAddressesGrouped =
    groupAlphabetizedArrayByFirstLetterLastName(displayAddresses);

  useEffect(() => {
    if (addressStatus === "idle") {
      dispatch(fetchAddresses());
    }
  }, [addressStatus, dispatch]);

  return (
    <>
      {addressStatus == "loading" && <p>Address Book is loading!</p>}
      {error && <p>{error}</p>}
      {displayAddressesGrouped &&
        Object.keys(displayAddressesGrouped).map((addressGroup) => {
          return (
            <div>
              <h1>{addressGroup}</h1>
              {displayAddressesGrouped[addressGroup].map((address) => (
                <Card key={address.id} className="mb-2">
                  <Card.Header>{`${address.first_name} ${address.last_name}`}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {address.phone_number}
                      <br></br>
                      {address.email}
                      <br></br>
                      {address.street_address}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          );
        })}
    </>
  );
}
