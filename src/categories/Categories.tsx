import useCategories from "../hooks/useCategories";
import ModelCategory from "./ModalCategory";
import categoryService, { Category } from "../services/category-service";
import { CanceledError } from "../services/api-client";
import { omit } from "lodash";


  
  const Categories = () => {
    const {
      categories,
      isLoadingCategories,
      errorCategories,
      setCategories,
      setErrorCategories,
    } = useCategories();
  
    const onAddCategory = async (category: Category) => {
      const originalCategories = [...categories];
      //const body = { ...category, categoryId: product.category._id };
      const newCat = omit(category, "_id");
      categoryService
        .create(newCat)
        .then(({ data: savedCategory }) =>
          setCategories([savedCategory, ...categories])
        )
        .catch((err) => {
          // if (err instanceof CanceledError) return;
          setErrorCategories(err.message);
          setCategories(originalCategories);
        });
    };
    const onUpdateCategory = async (category: Category) => {
      const originalCategories = [...categories];
      //const body = { ...category, categoryId: product.category._id };
      const newCat = omit(category, "_id");
      categoryService
        .update(category._id, newCat)
        .then(({ data: updatedCategory }) =>
          setCategories(
            categories.map((cat) =>
              cat._id === category._id ? updatedCategory : cat
            )
          )
        )
        .catch((err) => {
          // if (err instanceof CanceledError) return;
          setErrorCategories(err.message);
          setCategories(originalCategories);
        });
    };
  
    const onDeleteCategory = async (category: Category) => {
      const originalCategories = [...categories];
      setCategories(categories.filter((p) => p._id !== category._id));
      categoryService.delete(category._id).catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorCategories(err.message);
        setCategories(originalCategories);
      });
    };

    return (
      <>
        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">Category name</th>
              
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <th scope="row">{category.name}</th>
                {/* <td>{category.defaultPrice}</td>
              <td>{category.numberInStock}</td>
              <td>{category.category.name}</td> */}
                <td>
                  <ModelCategory
                    _id={category._id}
                    name={category.name}
                    //price={product.price}
                    onCreate={(category: Category) =>
                      onUpdateCategory(category)
                    }
                    buttonName="Modify"
                    heading="Modify the product"
                  />
                  <button
                    onClick={() => onDeleteCategory(category)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total Result</th>
              <th scope="row" colSpan={3}>
                <ModelCategory
                  onCreate={(category: Category) => onAddCategory(category)}
                  buttonName="Add new category"
                  heading="Add new category"
                />
              </th>
            </tr>
          </tfoot>
        </table>
      </>
    );
  };

export default Categories;
