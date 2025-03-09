import { useState } from "react";
import { LuRotate3D } from "react-icons/lu";

export default function OrbitControlBtn({ onClick }) {
  const [isToggled, setIsToggled] = useState(false);

  function handleClick() {
    onClick();
    setIsToggled(!isToggled);
  }

  return (
    <button
      onClick={handleClick}
      className={
        "fixed right-4 bottom-4 cursor-pointer rounded border border-neutral-400 px-2 py-1 " +
        (isToggled ? "bg-neutral-300 text-neutral-800" : "text-neutral-600")
      }
    >
      <LuRotate3D size={20} />
    </button>
  );
}
