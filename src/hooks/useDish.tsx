import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import axios from "axios";


type Props = {
    title: string,
    endPoint: string
}
export default function useDish({ title, endPoint }: Props) {
    const { getUrl } = useContext(ApiContext);
    const fetchData = () => axios.get(getUrl(endPoint));

    return useQuery({
        queryKey: [title],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });
}
