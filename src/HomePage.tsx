import { useState } from "react";
import { Container, Row, Col, Button, Card, Form, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mapImage from "./assets/map.png";
import homePoster from "./assets/poster.png";
import fastCar from "./assets/fast_car.jpg";
import itsSimple from "./assets/its_simple.jpg";
import itsReliable from "./assets/device.png";
/*
  Presentation-style Home Page using React-Bootstrap.
  - Netlify form: method POST + hidden form-name. Uses AJAX fetch to submit to Netlify without reload.
  - Uses Unsplash images for placeholders (you can replace with local /public/assets images).
*/

export default function HomePage() {
  const navigate = useNavigate();

  // contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [showModal, setShowModal] = useState(false);

function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const { name, value } = e.target;
  setForm((p) => ({ ...p, [name]: value }));
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus("submitting");

  const form = e.currentTarget;
  const data = new FormData(form);

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    });

    setStatus("success");
    form.reset();
  } catch (error) {
    console.error("Form submit failed:", error);
    setStatus("error");
  }
};


  return (
    <>
      {/* HERO */}
      <section className="hero-section text-white d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-left">
              <h1 className="display-4 fw-bold">Tracking Device Dashboard</h1>
              <p className="lead mb-4">
                Real-time tracking, seven days of history and a clean web dashboard — no mobile app required.
                Monitor fleet, assets or personal trackers instantly.
              </p>

              <div className="d-flex gap-2">
                <Button variant="light" size="lg" onClick={() => navigate("/devices")}>
                  View Devices
                </Button>
                <Button variant="outline-light" size="lg" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
}>
                  Contact Sales
                </Button>
              </div>

              <div className="mt-4 d-flex flex-wrap gap-3">
                <div className="hero-pill">Live map</div>
                <div className="hero-pill">7-day history</div>
                <div className="hero-pill">Battery & temp</div>
              </div>
            </Col>

            <Col md={6} className="hero-right text-center d-none d-md-block">
              {/* placeholder device image; replace with your image in /public/assets */}
              <Image
                src={homePoster}
                alt="poster"
                rounded
                fluid
                className="shadow-lg hero-device"
               
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Img variant="top" src={fastCar} />
                <Card.Body>
                  <Card.Title>Fast Location Updates</Card.Title>
                  <Card.Text>Near real-time updates on device location with smooth map playback for history.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Img variant="top" src={itsSimple} />
                <Card.Body>
                  <Card.Title>Simple Management</Card.Title>
                  <Card.Text>Single dashboard to manage devices, view battery and temperature, and export history.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Img variant="top" src={itsReliable} />
                <Card.Body>
                  <Card.Title>Secure & Scalable</Card.Title>
                  <Card.Text>AWS-backed infrastructure and best-practice policies for data protection and scale.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VISUAL HIGHLIGHT */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3>Beautiful map playback & route visualization</h3>
              <p className="text-muted">
                Visualize device movement with an Apple-AirTag style timeline. Download CSV of device path or share a link to a device view.
              </p>
              <ul className="text-muted">
                <li>Polyline path + markers for each recorded ping</li>
                <li>Click timeline to jump to a moment</li>
                <li>Export or share device snapshot</li>
              </ul>
            </Col>

            <Col md={6} className="text-center">
              <Image
                src={mapImage}
                fluid
                rounded
                className="shadow-sm highlight-image"
                alt="Map preview"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS / STATS */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="text-center stat-card h-100">
                <Card.Body>
                  <h2 className="display-6">99.9%</h2>
                  <p className="text-muted">Uptime (last 30 days)</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center stat-card h-100">
                <Card.Body>
                  <h2 className="display-6">7 days</h2>
                  <p className="text-muted">History window</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center stat-card h-100">
                <Card.Body>
                  <h2 className="display-6">Global</h2>
                  <p className="text-muted">Works in most countries with LoRaWAN coverage</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTACT (Netlify) */}
      <section id="contact-form" className="py-5 bg-white">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4">
                <h4>Contact Us</h4>
                <p className="text-muted">Questions, sales or integration help — contact us.</p>

                <Form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  onSubmit={handleSubmit}
>
  {/* Hidden fields for Netlify */}
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </p>

  <Form.Group className="mb-3" controlId="formName">
    <Form.Label>Name</Form.Label>
    <Form.Control
      name="name"
      value={form.name}
      onChange={handleChange}
      required
      placeholder="Your name"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      required
      placeholder="you@example.com"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formMessage">
    <Form.Label>Message</Form.Label>
    <Form.Control
      as="textarea"
      rows={4}
      name="message"
      value={form.message}
      onChange={handleChange}
      required
    />
  </Form.Group>

  <div className="d-flex gap-2 align-items-center">
    <Button
      type="submit"
      variant="primary"
      disabled={status === "submitting"}
    >
      {status === "submitting" ? "Sending…" : "Send Message"}
    </Button>
    {status === "error" && (
      <div className="text-danger">Failed to send — try again.</div>
    )}
    {status === "success" && (
      <div className="text-success">✅ Message sent!</div>
    )}
  </div>
</Form>

              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="py-4 text-center text-muted">
        © {new Date().getFullYear()} IoT Dashboard · Built for tracking
      </footer>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you — we received your message. We will get back to you shortly.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
