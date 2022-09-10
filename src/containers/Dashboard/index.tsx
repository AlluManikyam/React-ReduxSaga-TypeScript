import { useEffect } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "store/userManagement/slice";
import Loader from "components/Common/Loader";
import { commonSelector } from "store/common/selector";
import { userSelector } from "store/userManagement/selectors";
import { getLoggedOutUser } from "utils/helpers/authUtils";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(userSelector);
  const {
    networkCall: { loading },
  } = useSelector(commonSelector);

  useEffect(() => {
    dispatch(getUsersList({ limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <div
        className="text-left p-3 text-white mb-3 d-flex justify-content-between"
        style={{ backgroundColor: "#0db9be", fontSize: 18 }}
      >
        <div>My App</div>
        <div className="cursor-pointer" onClick={()=>{getLoggedOutUser()}}>Logout</div>
      </div>
      <div className="container">
        <div className="row">
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
            {loading && <Loader />}
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
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
