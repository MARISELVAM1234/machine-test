// styles
import styles from "./styles.module.scss";

// packages and hooks
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
import Image from "next/image";
import Link from "next/link";

// components
import LoadingScreen from "../LoadingScreen";

// assets
import facebook from "../../../public/assets/facebook.png";
import twitter from "../../../public/assets/twitter.png";
import linkedin from "../../../public/assets/likedin.png";
import youtube from "../../../public/assets/youtube.png";
import rightArrow from "../../../public/assets/right-arrow.png";
import leftArrow from "../../../public/assets/left-arrow.png";

interface countryType {
  name: string;
  region: string;
  flag: string;
}

const HomeCard = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [countries, setCountries] = useState<countryType[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);
  const [initialCount, setInitialCount] = useState<number>(12);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

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

  // fetch countries data
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,flag")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        const uniqueRegions = Array.from(
          new Set(data.map((c: { region: string }) => c.region).filter(Boolean))
        ) as string[];
        setRegions(uniqueRegions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setShowAll(false);
    setActiveIndex(0);
  }, [activeTab]);

  const filteredCountries =
    activeTab === "All"
      ? countries
      : countries.filter((c) => c.region === activeTab);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, initialCount);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container fluid className={styles.home_container}>
          {/* header */}
          <Navbar
            expand="md"
            className="pt-3 pb-2 bg-white"
            expanded={navbarExpanded}
            onToggle={() => setNavbarExpanded((prev) => !prev)}
          >
            <Navbar.Brand className={styles.logo}>Countries</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar" className="justify-content-end">
              <div className={styles.tabs_scroll}>
                <Nav
                  variant="tabs"
                  activeKey={activeTab}
                  className={styles.tabs}
                  as="div"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="All"
                      onClick={() => {
                        setActiveTab("All");
                        setNavbarExpanded(false);
                      }}
                      className={activeTab === "All" ? styles.active : ""}
                    >
                      All
                    </Nav.Link>
                  </Nav.Item>
                  {regions.map((region) => (
                    <Nav.Item key={region}>
                      <Nav.Link
                        eventKey={region}
                        onClick={() => {
                          setActiveTab(region);
                          setNavbarExpanded(false);
                        }}
                        className={activeTab === region ? styles.active : ""}
                      >
                        {region}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            </Navbar.Collapse>
          </Navbar>

          <div className={styles.welcome_divider}>
            <span>WELCOME</span>
          </div>

          {/* coutry part */}
          <Row className="justify-content-center mb-3">
            <Col md={12}>
              <Row className={styles.carousel_row}>
                <Col md={3} className="order-1 order-md-2">
                  <Card className={styles.carousel_side}>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <div className={styles.feature_img}></div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={9} className="order-2 order-md-1">
                  <Card className={styles.carousel_main}>
                    <Carousel
                      indicators={true}
                      controls={true}
                      activeIndex={activeIndex}
                      onSelect={handleSelect}
                      prevIcon={
                        <span className={styles.arrow_icon}>
                          {" "}
                          <Image
                            src={leftArrow}
                            alt="facebook"
                            width={16}
                            height={16}
                          />
                        </span>
                      }
                      nextIcon={
                        <span className={styles.arrow_icon}>
                          {" "}
                          <Image
                            src={rightArrow}
                            alt="rightArrow"
                            width={16}
                            height={16}
                          />
                        </span>
                      }
                    >
                      {filteredCountries?.slice(0, 6).map((country, idx) => (
                        <Carousel.Item key={idx}>
                          <div className={styles.carousel_img_wrap}>
                            <Image
                              src={country.flag}
                              alt={country.name}
                              className={styles.carousel_img}
                              width={120}
                              height={120}
                              layout="fixed"
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className={styles.countries_grid}>
            {visibleCountries?.map((country, idx) => (
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
            ))}
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

          {/* footer */}
          <footer className={styles.footer}>
            <div className={styles.socials}>
              <Link href="#" className={styles.social_icon}>
                <Image src={facebook} alt="facebook" width={48} height={48} />
              </Link>
              <Link href="#" className={styles.social_icon}>
                <Image src={twitter} alt="twitter" width={48} height={48} />
              </Link>
              <Link href="#" className={styles.social_icon}>
                <Image src={linkedin} alt="linkedin" width={48} height={48} />
              </Link>
              <Link href="#" className={styles.social_icon}>
                <Image src={youtube} alt="youtube" width={48} height={48} />
              </Link>
            </div>
            <div className={styles.footer_text}>example@email.com</div>
            <div className={styles.footer_copy}>
              Copyright © 2025 Name. All rights reserved.
            </div>
          </footer>
        </Container>
      )}
    </>
  );
};

export default HomeCard;
