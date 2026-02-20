import { useEffect } from "react";
import { useAllContext } from "./Contexts";

export default function Consumer() {
  const { c1, c2, c3 } = useAllContext();

  useEffect(() => {
    c1[1]("Data-1");
    c2[1]("Data-2");
    c3[1]("Data-3");
  }, []);

  return (
    <>
      <h2>Consumer</h2>
      <p>{c1[0]}</p>
      <p>{c2[0]}</p>
      <p>{c3[0]}</p>
    </>
  );
}
