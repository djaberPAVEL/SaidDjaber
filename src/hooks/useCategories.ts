import { useEffect, useState } from "react";
import categoryService , { Category } from "../services/category-service";
import { CanceledError } from "../services/api-client";

const useCategories = ()=>{

    const [categories, setCategories] = useState<Category[]>([]);
  const [errorCategories, setErrorCategories] = useState("");
  const [isLoadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    const { request, cancel } = categoryService.getAll<Category>();
    request
      .then((res) => {
        const updatedCategories = res.data;
        setCategories(updatedCategories);
        setLoadingCategories(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorCategories(err.message);
        setLoadingCategories(false);
      });
    return () => cancel();
  }, []);
 return {categories,errorCategories,isLoadingCategories,setErrorCategories,setCategories,setLoadingCategories};
}
export default useCategories;


