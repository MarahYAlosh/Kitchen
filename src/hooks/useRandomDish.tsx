import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useRandomDish() {
  const { getUrl } = useContext(ApiContext);
  const fetchData = async () => await axios.get(getUrl("random.php"));

  return useQuery({
    queryKey: ["randomDish"],
    queryFn: fetchData,
  });
}
