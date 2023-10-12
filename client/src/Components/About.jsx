import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import about from "../Assets/MicrosoftTeams-image (2).jpg";
const About = () => {
  useEffect(() => {}, []);
  console.log("return about");

  return (
    <Container>
      <section class="banner1 pt-4 banner" id="product-banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 align-middle my-auto">
              <div class="top-small-banner-heading">A Chance To Know More</div>
              <h1
                id="banner-long-title"
                class="text-primary fw-bold text-uppercase">
                ABOUT US
              </h1>
              <p class="mb-lg-5 mb-sm-3 justify-content-between">
                We always aim at providing superior, proactive banking service
                to niche market globally, while providing cost effective and
                responsive services
              </p>
            </div>
            <div class="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 pr-0 pr-mob-grid">
              <img src={about} alt="bank" width={630} height={500} />
            </div>
          </div>
        </div>
      </section>
      <section class="details-tab-wrap  py-3-xxl">
        <div class="container tabbable">
          <div class="row">
            <div class="col-12 px-0 px-mob-grid">
              <ul id="tabs" class="nav nav-tabs " role="tablist">
                <li class="nav-item" role="presentation">
                  <a
                    id="tab-A"
                    href="#pane-A"
                    class="nav-link active"
                    data-toggle="tab"
                    role="tab">
                    {" "}
                    WHO WE ARE{" "}
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tab-B"
                    href="#pane-B"
                    class="nav-link"
                    data-toggle="tab"
                    role="tab">
                    {" "}
                    OUR LEADERS{" "}
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tab-C"
                    href="#pane-C"
                    class="nav-link"
                    data-toggle="tab"
                    role="tab">
                    {" "}
                    OUR POLICIES{" "}
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tab-D"
                    href="#pane-D"
                    class="nav-link"
                    data-toggle="tab"
                    role="tab">
                    {" "}
                    REDRESSAL TEAM{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;
