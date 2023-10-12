import React from "react";
import * as Icon from "react-bootstrap-icons";

const Contact = () => {
  return (
    <>
      <div>
        {/* <div className="container">
        <Navbar />
      </div> */}

        <section id="contact" className="contact">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="fw-normal fs-1">Contact Us</h2>
              <p className="text-muted">
                Architecto nobis eos vel nam quidem vitae temporibus voluptates
                qui hic deserunt iusto omnis nam voluptas asperiores sequi
                tenetur dolores incidunt enim voluptatem magnam cumque fuga.
              </p>
            </div>
          </div>

          <div className="map">
            <iframe
              width={"100%"}
              height={"300px"}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
              title="map"></iframe>
          </div>

          <div className="container mt-3">
            <div className="row gy-5 gx-lg-5 ">
              <div className="col-lg-4">
                <div className="p-4 card shadow rounded-0 border-0">
                  <h3 className="fw-normal">Get in touch</h3>
                  <p className="text-muted">
                    Et id eius voluptates atque nihil voluptatem enim in tempore
                    minima sit ad mollitia commodi minus.
                  </p>

                  <div className="info-item d-flex">
                    <div>
                      <div className="d-flex">
                        <em className="fs-5 mt-0">
                          <Icon.PinMap />
                        </em>{" "}
                        <h4
                          style={{ color: "navy" }}
                          className="fs-4 fw-medium ms-3">
                          Location:
                        </h4>
                      </div>
                      <p>A108 Adam Street, New York, NY 535022</p>
                    </div>
                  </div>

                  <div className="info-item d-flex">
                    <div>
                      <h4>
                        <em className="fs-5">
                          <Icon.Envelope />
                        </em>{" "}
                        <span
                          style={{ color: "navy" }}
                          className="fs-4 fw-medium ms-2">
                          Email:
                        </span>
                      </h4>
                      <p>info@example.com</p>
                    </div>
                  </div>
                  <div className="info-item d-flex">
                    <div>
                      <h4>
                        <em className="fs-5">
                          <Icon.Phone />
                        </em>{" "}
                        <span
                          style={{ color: "navy" }}
                          className="fs-4 fw-medium ms-2">
                          Call:
                        </span>
                      </h4>
                      <p>+1 5589 55488 55</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 h-100 p-4">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form mt-4">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control rounded-0 p-3"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control rounded-0 p-3"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control rounded-0 p-3"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control rounded-0 p-3 pb-5"
                      name="message"
                      placeholder="Message"
                      required></textarea>
                  </div>
                  {/* <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div> */}
                  <div className="text-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-success rounded-0 text-white"
                      style={{
                        border: "0",
                        padding: "13px 50px",
                        color: "var(--color-white)",
                        transition: "0.4s",
                      }}>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
