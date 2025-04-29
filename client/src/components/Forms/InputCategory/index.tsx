import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Category } from "../../../interfaces/axios.interfaces";
import { categoryApi } from "../../../utils/axios";

interface InputCategoryProps {
  categoriesState: string[];
  setCategoriesState: Dispatch<SetStateAction<string[]>>;
  props?: InputHTMLAttributes<HTMLInputElement>;
}

const InputCategory = ({
  categoriesState,
  setCategoriesState,
  props,
}: InputCategoryProps) => {
  const [retrievedCategoryList, setRetrievedCategoryList] = useState<
    Category[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [filterResults, setFilterResults] = useState<Category[]>([]);
//   const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>(
//     []
//   );
  
//   useEffect(() => {
//     setSelectedCategoryList(categoriesState)
//   }, [categoriesState])
  
//   useEffect(() => {
//     setCategoriesState(selectedCategoryList);
//   }, [selectedCategoryList]);


  useEffect(() => {
    const stopTypingTimeout = setTimeout(() => {
      retrievedCategoryList &&
        setFilterResults(
          retrievedCategoryList.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase());
          })
        );
    }, 250);

    return () => clearTimeout(stopTypingTimeout);
  }, [inputValue]);

  useEffect(() => {
    categoryApi.get<Category[]>("/").then((res) => {
      setRetrievedCategoryList(res.data);
    });
  }, []);

  const handleSelectCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      retrievedCategoryList.some(
        (item) => item.name.toLowerCase() == inputValue.toLowerCase()
      ) &&
      !categoriesState.includes(inputValue)
    ) {
      setCategoriesState([...categoriesState, inputValue]);
      e.currentTarget.value = "";
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="search-results">
        {filterResults.map((item) => (
          <span>{item.name}</span>
        ))}
      </div>
      <input
        {...props}
        type="text"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSelectCategory(e);
          }

          if (e.key === "Tab") {
            e.preventDefault();
            e.currentTarget.value = filterResults[0].name;
            setInputValue(e.currentTarget.value);
          }
        }}
      />
      <div className="selected-categories-line">
        {categoriesState.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default InputCategory;
