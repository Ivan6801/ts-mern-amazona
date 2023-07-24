/* eslint-disable @typescript-eslint/no-non-null-assertion */
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Row, Col } from "react-bootstrap";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { getError } from "../utils";
import { useGetProductsQuery } from "../hooks/productHooks";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      {products?.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
