import React from "react";
import { gql, useQuery } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/style.css';
import { Figure, Row, Col, Container } from "react-bootstrap";

const HOMEPAGE = gql`
query homepage {
    homepage {
      data {
        attributes {
          content
          content2
          content3
          content4
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`;

export default function Homepage() {
    const { loading, error, data } = useQuery(HOMEPAGE);
    if (loading) return <p>Probíhá načítání stránky...</p>;
    if (error) return <p>Došlo k chybě: {JSON.stringify(error)}</p>;
    return (
        <Container>
            <Row>
                <Col>
                    <div class="mt-3">
                        {data.homepage.data.attributes.content}
                        <p></p>
                        {data.homepage.data.attributes.content2}
                        <p></p>
                        {data.homepage.data.attributes.content3}
                        <p></p>
                        {data.homepage.data.attributes.content4}
                    </div>
                </Col>
                <Col>
                    {data.homepage.data.attributes.image.data && (
                        <Figure class="mt-3">
                            <Figure.Image
                                src={`${process.env.REACT_APP_BACKEND_URL}${data.homepage.data.attributes.image.data.attributes.url}`}
                                rounded
                            />
                        </Figure>
                    )}
                </Col>
            </Row>
        </Container>
    );
}