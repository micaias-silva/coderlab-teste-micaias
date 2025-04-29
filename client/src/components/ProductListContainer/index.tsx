import { productApi } from "../../utils/axios";
import { GetProductNavigationResponse } from "../../interfaces/axios.interfaces";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import ProductList from "../ProductList";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { generateNumbersAround } from "../../utils/general.utils";

const ProductListContainer = () => {
  const [response, setResponse] = useState<GetProductNavigationResponse>();

  const [searchParams] = useSearchParams();

  const [pageParam, setPageParam] = useState<string | null>(
    searchParams.get("page") || "1"
  );
  const [itemCountParam, setItemCountParam] = useState<string | null>(
    searchParams.get("itemCount") || "20"
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = `page=${pageParam || "1"}&itemCount=${
      itemCountParam || "20"
    }`;
    productApi
      .get(`/?${queryParams}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      }),
      [pageParam];
  });

  const HandlePaginate = (
    toPage: number,
    itemCount: number = Number(itemCountParam)
  ) => {
    const queryParams = `page=${toPage}&itemCount=${itemCount}`;
    setPageParam(toPage.toString());
    setItemCountParam(itemCount.toString());
    navigate(`${location.pathname}?${queryParams}`);
  };

  const calculateSurroudingPages = () => {
    return generateNumbersAround(
      response!.currentPage,
      5,
      0,
      response!.pageCount
    );
  };

  return (
    <div>
      {response && (
        <>
          <ProductList products={response.navigation} />
          <div className="page-list-container">
            {calculateSurroudingPages().map((pageNumber) => {
              const href = `page=${pageNumber}&itemCount=${itemCountParam}`;
              return (
                <a
                  className="page-link"
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    HandlePaginate(pageNumber);
                  }}
                >
                  {pageNumber.toString()}
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListContainer;
