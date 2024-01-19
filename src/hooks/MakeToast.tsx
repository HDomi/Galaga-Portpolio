import toast from "react-hot-toast";
import Icon from "@mdi/react";
import { mdiCheckboxMarkedCircle, mdiAlert, mdiCloseCircle } from "@mdi/js";
export const MakeToast = (toastType: string, text: string) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <Icon path={mdiCheckboxMarkedCircle} size="16px" color="#25AC7F" />
        );
      case "warn":
        return <Icon path={mdiAlert} size="16px" color="#FFAB49" />;
      case "fail":
        return <Icon path={mdiCloseCircle} size="16px" color="#FF4D49" />;
      default:
        break;
    }
  };
  toast.custom((t) => (
    <div className="toast-wrap flex-row" style={{ background: "#fff" }}>
      {getIcon(toastType)}
      <p>{text}</p>
    </div>
  ));
};
export default MakeToast;
