import { createContext, useEffect, useState } from "react";
import { GetProductNavigationResponse } from "../../interfaces/axios.interfaces";
import { productApi } from "../../utils/axios";
import { useSearchParams } from "react-router-dom";

interface ProductContextType {
  productResponse?: GetProductNavigationResponse;
  updateQueryParams: ({ page, itemCount }: ProductQueryParamsType) => void;
  triggerProductListUpdate: () => void;
}

type ProductQueryParamsType = {
  page?: string;
  itemCount?: string;
};

export const ProductContext = createContext<ProductContextType>({
  productResponse: undefined,
  updateQueryParams: () => {},
  triggerProductListUpdate: () => {},
});

export const ProductProvider = ({ children }: React.PropsWithChildren) => {
  const [productResponse, setProductResponse] =
    useState<GetProductNavigationResponse>();

  const [searchParams] = useSearchParams();

  const [queryParamState, setQueryParamState] =
    useState<ProductQueryParamsType>({
      page: searchParams.get("page") || "1",
      itemCount: searchParams.get("itemCount") || "20",
    });

  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

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
    setShouldUpdate((prev) => !prev);
  };

  useEffect(() => {
    if (searchParams.size == 0) {
      requestProductResponse("1", "20");
    } else {
      requestProductResponse(queryParamState.page!, queryParamState.itemCount!);
    }
  }, [queryParamState, shouldUpdate]);

  return (
    <ProductContext.Provider
      value={{
        productResponse,
        updateQueryParams,
        triggerProductListUpdate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
