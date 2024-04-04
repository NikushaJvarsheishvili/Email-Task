import Lottie from "lottie-react";
import registAnimation from "../Animation - 1712271523764.json";

export const FinishRegistration = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "700px",
      }}
    >
      <Lottie animationData={registAnimation} loop={true} />
    </div>
  );
};
