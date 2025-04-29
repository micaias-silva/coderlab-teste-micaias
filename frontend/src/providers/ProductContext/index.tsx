import { createContext, useEffect, useState } from "react";
import { GetProductNavigationResponse } from "../../interfaces/axios.interfaces";
import { productApi } from "../../utils/axios";

interface ProductContextType {
  productResponse?: GetProductNavigationResponse;
  updateQueryParams: ({page, itemCount}: ProductQueryParamsType) => void
  triggerProductListUpdate: () => void
}

type ProductQueryParamsType = {
  page?: string;
  itemCount?: string;
};

export const ProductContext = createContext<ProductContextType>({
  productResponse: undefined,
  updateQueryParams: () => {},
  triggerProductListUpdate: () => {}
});

export const ProductProvider = ({ children }: React.PropsWithChildren) => {
  const [productResponse, setProductResponse] =
    useState<GetProductNavigationResponse>();

  const [queryParamState, setQueryParamState] =
    useState<ProductQueryParamsType>({ page: "1", itemCount: "20" });

const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const requestProductResponse = (page: string, itemCount: string) => {
    const queryParams = `page=${page || "1"}&itemCount=${itemCount || "20"}`;
    productApi
      .get(`/?${queryParams}`)
      .then((res) => {
        setProductResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQueryParams = ({ page, itemCount }: ProductQueryParamsType) => {
    setQueryParamState((prevState) => ({
        page: page || prevState.page,
        itemCount: itemCount || prevState.itemCount,
      }));
  };

  const triggerProductListUpdate = () => {
    setShouldUpdate(prev => !prev)
  }

  useEffect(() => {
    requestProductResponse(queryParamState.page!, queryParamState.itemCount!);
  }, [queryParamState, shouldUpdate]);


  return (
    <ProductContext.Provider
      value={{
        productResponse,
        updateQueryParams,
        triggerProductListUpdate
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
