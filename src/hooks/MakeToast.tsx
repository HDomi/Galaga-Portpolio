import toast from "react-hot-toast";
import Icon from "@mdi/react";
import { mdiCheckboxMarkedCircle, mdiAlert, mdiCloseCircle } from "@mdi/js";
export const MakeToast = (toastType: string, text: string) => {
  const colorString = "#03e8ba";
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <Icon
            path={mdiCheckboxMarkedCircle}
            size="16px"
            color={colorString}
          />
        );
      case "warn":
        return <Icon path={mdiAlert} size="16px" color={colorString} />;
      case "fail":
        return <Icon path={mdiCloseCircle} size="16px" color={colorString} />;
      default:
        break;
    }
  };
  toast.custom((t) => (
    <div className="toast-wrap flex-row" style={{ background: "#161616" }}>
      {getIcon(toastType)}
      <p>{text}</p>
    </div>
  ));
};
export default MakeToast;
