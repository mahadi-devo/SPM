import Topbar from "../../shared/topbar";
import { AccessRights } from "../../shared/accessRights";

const CustomerDashboard = () => {
  return (
    <div>
      <Topbar entitlement={[AccessRights.user]} />
      <div>Customer Dashboard</div>
    </div>
  );
};

export default CustomerDashboard;
