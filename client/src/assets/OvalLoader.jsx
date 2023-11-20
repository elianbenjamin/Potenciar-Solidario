import { Oval } from "react-loader-spinner";

export default function OvalLoader() {
  return (
    <Oval
      height={80}
      width={80}
      color="#005692"
      wrapperStyle={{ margin: "auto auto" }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#a4d4ff"
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
}
