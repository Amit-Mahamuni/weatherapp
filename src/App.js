import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  Badge,
  Spinner,
  Accordion,
  Button,
} from "react-bootstrap";

function App() {
  const [data, setData] = useState({ status: false, data: {}, error: false });
  const [filterList, setFilterList] = useState({});
  const [cord, setcord] = useState({ lat: 18.516726, lon: 73.856255 });

  useEffect(() => {
    if (navigator.onLine) {
      getData();
    } else {
      alert("Please Check Network Connection.");
    }
  }, [cord]);

  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    } else {
      alert(
        "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
      );
    }
  }

  function successFunction(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    setcord({ lat, lon });
    getData();
  }

  async function getData() {
    try {
      let res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          cord.lat +
          "&lon=" +
          cord.lon +
          "&appid=<api_key>"
      );
      let out = await res.json();
      if (out.cod === "200") {
        setData({ status: true, data: out, error: false });
        let temp = {},
          newdate = 0;
        out.list.forEach((x) => {
          newdate = String(new Date(x.dt_txt).toLocaleDateString());
          if (Object.keys(temp).includes(newdate)) {
            temp[newdate].push(x);
          } else {
            temp[newdate] = [];
            temp[newdate].push(x);
          }
        });
        setFilterList(temp);
      } else {
        alert("Please Try Again!");
      }
    } catch (error) {
      setData({ status: false, data: {}, error: true });
    }
  }

  return (
    <div>
      <h1>Sonu</h1>
      <Container>
        <Row>
          <Col className="py-5">
            {!data.status ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Card>
                <Card.Header className="bg-white">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title>
                        <h1 className="fw-bold">{data.data.city.name}</h1>
                      </Card.Title>
                      <Card.Text>
                        {data.data.city.country +
                          " |  lat:" +
                          data.data.city.coord.lat +
                          ", lon:" +
                          data.data.city.coord.lon}
                      </Card.Text>
                    </div>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="ms-0 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-brightness-alt-high"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z" />
                        </svg>
                        <Card.Text className="text-center">
                          Sunrise
                          <br />
                          {new Date(
                            data.data.city.sunrise * 1000
                          ).toLocaleTimeString("en-US")}
                        </Card.Text>
                      </div>
                      <div className="ms-4 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-cloud-moon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .625.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .509-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                          <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z" />
                        </svg>
                        <Card.Text className="text-center">
                          Sunset
                          <br />
                          {new Date(
                            data.data.city.sunset * 1000
                          ).toLocaleTimeString("en-US")}
                        </Card.Text>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Accordion defaultActiveKey={Object.keys(filterList)[0]}>
                    {Object.keys(filterList).map((y) => (
                      <Accordion.Item eventKey={y} key={y}>
                        <Accordion.Header>
                          <h5 className="fw-bold">
                            {new Date(y).getDate() === new Date().getDate() ? (
                              <>{"Today : " + y}</>
                            ) : (
                              y
                            )}
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup>
                            {filterList[y].map((x, i) => (
                              <ListGroup.Item
                                key={y + "-" + i}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                              >
                                <div>
                                  {x.weather[0].id === 800 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36"
                                      height="36"
                                      fill="currentColor"
                                      className="bi bi-brightness-high"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                  ) : x.weather[0].id === 801 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36"
                                      height="36"
                                      fill="currentColor"
                                      className="bi bi-cloudy"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M13.405 8.527a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 14.5H13a3 3 0 0 0 .405-5.973zM8.5 5.5a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 5.5z" />
                                    </svg>
                                  ) : x.weather[0].id === 803 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36"
                                      height="36"
                                      fill="currentColor"
                                      className="bi bi-clouds"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z" />
                                      <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z" />
                                    </svg>
                                  ) : x.weather[0].id === 804 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36"
                                      height="36"
                                      fill="currentColor"
                                      className="bi bi-clouds-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5z" />
                                      <path d="M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z" />
                                    </svg>
                                  ) : x.weather[0].id === 802 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36"
                                      height="36"
                                      fill="currentColor"
                                      className="bi bi-cloud-sun"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                                      <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                    </svg>
                                  ) : null}
                                </div>
                                <div className="ms-3 me-auto">
                                  <Card.Title className="fw-bold mb-1">
                                    {new Date(x.dt_txt).toLocaleTimeString()}
                                  </Card.Title>
                                  <Card.Text className="mb-1 text-capitalize">
                                    {x.weather[0].description +
                                      ", " +
                                      x.weather[0].id}
                                  </Card.Text>
                                  <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="m-1 border border-dark"
                                  >
                                    {"Pressure: " + x.main.pressure}
                                  </Badge>
                                  <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="m-1 border border-dark"
                                  >
                                    {"Humidity: " + x.main.humidity}
                                  </Badge>
                                  <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="m-1 border border-dark"
                                  >
                                    {"Temp: " + x.main.temp}
                                  </Badge>
                                  <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="m-1 border border-dark"
                                  >
                                    {"Visibility: " + x.visibility}
                                  </Badge>
                                </div>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Button
            variant="light"
            className="getPosBtn"
            onClick={() => getPosition()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default App;
