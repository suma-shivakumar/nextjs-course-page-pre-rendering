import { useEffect, useState } from "react";

import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading,setIsLoading] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-course-56641-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  // console.log("data",data);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //     setIsLoading(true);

  //     fetch('https://nextjs-course-56641-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) =>{

  //         const transformedSales = [];

  //         // console.log("data",data);
  //         for(const key in data){
  //             transformedSales.push({
  //                 id: key,
  //                 username: data[key].username,
  //                 volume: data[key].volume,
  //             });
  //             // console.log("un",data[key].username,"vol",data[key].volume);
  //         }

  //         // console.log("trans",transformedSales);
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //     });
  // },[]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-56641-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
  };
}
