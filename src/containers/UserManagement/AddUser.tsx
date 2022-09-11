import { useState } from "react";
import { Col, Button, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import Loader from "components/Common/Loader";

// Store
import { addNewUser } from "store/userManagement/slice";
import { commonSelector } from "store/common/selector";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    networkCall: { loading },
  } = useSelector(commonSelector);
  const [userFormData, setUserFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleOnChange = (e: { target: { id: any; value: any } }) => {
    setUserFormData({ ...userFormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addNewUser({ data: userFormData, navigate }));
  };

  return (
    <>
      <div className="container my-5">
        {loading && <Loader />}
        <div className="row justify-content-center my-5">
          <div style={{ width: "60%" }}>
            <h3 className="text-center my-3">Add User</h3>
            <FormGroup row>
              <Label for="email" sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="email"
                  value={userFormData.email}
                  onChange={handleOnChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firstName" sm={2}>
                FirstName
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="firstName"
                  value={userFormData.firstName}
                  onChange={handleOnChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastName" sm={2}>
                Last Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="lastName"
                  onChange={handleOnChange}
                  value={userFormData.lastName}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 6 }}>
                <Button color="success" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
}
