import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddressBookSearch from "./AddressBookSearch";
import AddressBookCardColumn from "./AddressBookCardColumn";
import AddressBookCreate from "./AddressBookCreate";

export default function AddressBookDisplay() {
  return (
    <Container >
      <br></br>
      <Row>
        <Col>
          <Row>
            <AddressBookSearch />
          </Row>
          <br></br>
          <Row>
            <AddressBookCreate />
          </Row>
        </Col>

        <Col >
          <AddressBookCardColumn />
        </Col>
      </Row>
    </Container>
  );
}
