import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Card,
  Carousel,
} from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import styles from "./styles.module.scss";
import Image from "next/image";

const tabs = ["All", "Asia", "Europe"];
const countries = [
  { name: "Afghanistan", region: "Asia" },
  { name: "Albania", region: "Europe" },
];

const carouselItems = [
  { title: "India", img: "/images/india.png" },
  { title: "France", img: "/images/france.png" },
  { title: "Japan", img: "/images/japan.png" },
];

const HomeCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [countries, setCountries] = useState<
    { name: string; region: string; flag: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(12);

  // Detect screen size for initial count
  useEffect(() => {
    const updateInitialCount = () => {
      if (window.innerWidth < 768) {
        setInitialCount(8);
      } else {
        setInitialCount(12);
      }
    };
    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,flag")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCountries =
    activeTab === "All"
      ? countries
      : countries.filter((c) => c.region === activeTab);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, initialCount);

  return (
    <Container fluid className={styles.home_container}>
      <Navbar expand="md" className="pt-3 pb-2  bg-white">
        <Navbar.Brand className={styles.logo}>Countries</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav variant="tabs" activeKey={activeTab} className={styles.tabs}>
            {tabs.map((tab) => (
              <Nav.Item key={tab}>
                <Nav.Link
                  eventKey={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? styles.active : ""}
                >
                  {tab}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className={styles.welcome_divider}>
        <span>WELCOME</span>
      </div>

      <Row className="justify-content-center mb-3">
        <Col md={12}>
          <Row>
            <Col md={9}>
              <Card className={styles.carousel_main}>
                <Carousel indicators={true} controls={true}>
                  {carouselItems.map((item, idx) => (
                    <Carousel.Item key={idx}>
                      <div className={styles.carousel_img_wrap}>
                        <img
                          src={item.img}
                          alt={item.title}
                          className={styles.carousel_img}
                        />
                        <div className={styles.carousel_caption}>
                          {item.title}
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card>
            </Col>
            <Col md={3}>
              <Card className={styles.carousel_side}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className={styles.feature_img}></div>
                  <div className={styles.feature_title}>Feature</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className={styles.countries_grid}>
        {loading ? (
          <Col xs={12} className="text-center">
            Loading...
          </Col>
        ) : (
          visibleCountries.map((country, idx) => (
            <Col md={6} key={idx} className="mb-3">
              <Card className={styles.country_card}>
                <Card.Body className="d-flex align-items-center gap-3">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    className={styles.country_img_placeholder}
                    width={127}
                    height={96}
                    layout="fixed"
                  />
                  <div>
                    <div className={styles.country_name}>{country.name}</div>
                    <div className={styles.country_region}>
                      {country.region}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {!showAll && filteredCountries.length > initialCount && (
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              className={styles.load_more_btn}
              onClick={() => setShowAll(true)}
            >
              Load more
            </Button>
          </Col>
        </Row>
      )}

      <footer className={styles.footer}>
        <div className={styles.socials}>
          <a href="#" className={styles.social_icon}>
            <FaGoogle />
          </a>
          <a href="#" className={styles.social_icon}>
            <FaFacebookF />
          </a>
          <a href="#" className={styles.social_icon}>
            <FaLinkedinIn />
          </a>
          <a href="#" className={styles.social_icon}>
            <FaTwitter />
          </a>
        </div>
        <div className={styles.footer_text}>example@email.com</div>
        <div className={styles.footer_copy}>
          Copyright © 2024 Name. All rights reserved.
        </div>
      </footer>
    </Container>
  );
};

export default HomeCard;
