import { useEffect, useState } from "react";
import { getValues } from "../lib/service/firebase/database";
import { swalAlert } from "../lib/service/sweetAlert/alert";

export const useGetValues = <T,>(_path: string, ..._option: string[]): T[] => {
  const [data, setData] = useState<T[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchData: T[] = await getValues(_path, ..._option);
        setData(fetchData);
      } catch (e) {
        const result = (e as Error).message;
        swalAlert("warnig", "서버 오류", result);
      }
    };

    fetch();
  }, []);

  return data;
};
