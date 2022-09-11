import { useEffect } from "react";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loader from "components/Common/Loader";

// Store
import { getUsersList } from "store/userManagement/slice";
import { commonSelector } from "store/common/selector";
import { userSelector } from "store/userManagement/selectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector(userSelector);
  const {
    networkCall: { loading },
  } = useSelector(commonSelector);

  useEffect(() => {
    dispatch(getUsersList({ limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-end">
          <Button onClick={()=>{navigate("/add-user")}} color="success" className="col-2 my-2">
            Add User
          </Button>
        </div>
        <div className="row">
          <>
            {loading && <Loader />}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {users &&
                    users?.map((user: any, index: number) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                          <img alt="profile" width="60" src={user.picture} />
                        </td>
                      </tr>
                    ))}
                </>
              </tbody>
            </Table>
          </>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
