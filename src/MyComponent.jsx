import { useEffect } from "react";
import { useData } from "./DataContexts";

export default function MyComponent() {
  const { data1, data2, data3 } = useData();

  useEffect(() => {
    data1.setData("Data-1");
    data2.setData("Data-2");
    data3.setData("Data-3");
  }, []);

  return (
    <>
      <h2>My Component</h2>

      <p>{data1.data}</p>
      <p>{data2.data}</p>
      <p>{data3.data}</p>
    </>
  );
}
