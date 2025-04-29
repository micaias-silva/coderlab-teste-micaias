import { useContext, useEffect, useState } from "react";
import ProductList from "../ProductList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { generateNumbersAround } from "../../utils/general.utils";
import "./style.css";
import { ProductContext } from "../../providers/ProductContext";

const ProductListContainer = () => {
  const { productResponse, updateQueryParams } = useContext(ProductContext);
  const [searchParams] = useSearchParams();


  const [itemCountParam, setItemCountParam] = useState<string | null>(
    searchParams.get("itemCount") || "20"
  );

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    updateQueryParams({
      page: searchParams.get("page") || "1",
      itemCount: searchParams.get("itemCount") || "20",
    });
  }, [searchParams]);

  const HandlePaginate = (
    toPage: number,
    itemCount: number = Number(itemCountParam)
  ) => {
    updateQueryParams({
      page: toPage.toString(),
      itemCount: itemCount.toString(),
    });
    setItemCountParam(itemCount.toString());
    
    const buildQueryParams = `page=${toPage}&itemCount=${itemCount}`;
    navigate(`${location.pathname}?${buildQueryParams}`);
  };

  const calculateSurroudingPages = () => {
    return generateNumbersAround(
      productResponse!.currentPage,
      5,
      0,
      productResponse!.pageCount
    );
  };

  return (
    <div>
      {productResponse && (
        <div className="product-list-container">
          <ProductList products={productResponse.navigation} />
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
        </div>
      )}
    </div>
  );
};

export default ProductListContainer;
