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

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("submitting");

  try {
    // prepare payload
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/.netlify/functions/submit-contact", {
      method: "POST",
      body: new URLSearchParams(formData as any).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setShowModal(true);
    } else {
      throw new Error("Network response not OK");
    }
  } catch (err) {
    console.error("submit error:", err);
    setStatus("error");
  }
}


  return (
    <>
      {/* HERO */}
      <section className="hero-section text-white d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-left">
              <h1 className="display-4 fw-bold">Usluga praćenja - iznajmljivanje GPS uređaja</h1>
              <p className="lead mb-4">
                Praćenje lokacije uređaja u realnom vremenu u prethodnih 7 dana preko web pregleda — nije potrebna mobilna aplikacija.
                Pratite vozila, motore, čamce, bicikle, predmete ili osobe jednostavnim klikom, bez ugradnje uređaja, koji su veličine platne kartice i mase 30 grama sa integrisanom baterijom, koja traje do nekoliko meseci bez dopunjavanja. 
                Pregled nivoa baterije uređaja i temperature okruženja. 
              </p>

              <div className="d-flex gap-2">
                <Button variant="light" size="lg" onClick={() => navigate("/devices")}>
                  Pregled uređaja 
                </Button>
                <Button variant="outline-light" size="lg" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
}>
                  Kontaktirajte prodaju
                </Button>
              </div>

              <div className="mt-4 d-flex flex-wrap gap-3">
                <div className="hero-pill">pregled na mapi</div>
                <div className="hero-pill">lokacije prethodnih 7 dana</div>
                <div className="hero-pill">baterija & temperatura</div>
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
                  <Card.Title>Triger na pokret uređaja</Card.Title>
                  <Card.Text>Podesivi intervali slanja koordinata uređaja sa pregledom istorije kretanja u tabeli.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Img variant="top" src={itsSimple} />
                <Card.Body>
                  <Card.Title>Jednostavno korišćene - bez dodatnog prijavljivanja i podešavanja</Card.Title>
                  <Card.Text>Intuitivan prikaz lokacije na mapi i u tabeli sa podacima o vremenu zapisa, temperaturi i naponu baterije.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Img variant="top" src={itsReliable} />
                <Card.Body>
                  <Card.Title>Minimalni period za korišćenje - 1 mesec</Card.Title>
                  <Card.Text>Pokrivanje na široj teritoriji Beograda, kao i u većim gradovima. Logovanje GPS lokacijskih zapisa u slučaju nedostatka pokrivanja i isporuka podataka kada se uređaj vrati u zonu pokrivanaja.</Card.Text>
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
              <h3>Jednostavan vizuelni prikaz</h3>
              <p className="text-muted">
                Praćenje promene lokacije u stilu Airtag. Za svaki pojedinačni uređaj poseban link za praćenje i pregled. 
              </p>
              <ul className="text-muted">
                <li>Marker na mapi za svaku zabeleženu GPS lokaciju</li>
                <li>Klikom na željeno vreme u tabeli se dobija pozicija na mapi u datom trenutku</li>
          
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
                  <h2 className="display-6">7 dana</h2>
                  <p className="text-muted">istorije</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center stat-card h-100">
                <Card.Body>
                  <h2 className="display-6">GPS pozicioniranje na detekciju pokreta</h2>
                  <p className="text-muted">Mobilni punjač</p>
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
                <p className="text-muted">Kontaktirajte nas za sve dodatne informacije u vezi sa uslovima korišćenje</p>

                <Form
  name="contact"
  method="POST"
  data-netlify="true"
  action="/.netlify/functions/submit-contact"
  onSubmit={handleSubmit}
>
  {/* Netlify hidden field */}
  <input type="hidden" name="form-name" value="contact" />

  <Form.Group className="mb-3" controlId="formName">
    <Form.Label>Ime</Form.Label>
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
    <Form.Label>Poruka</Form.Label>
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
    <Button type="submit" variant="primary" disabled={status === "submitting"}>
      {status === "submitting" ? "Sending…" : "Send Message"}
    </Button>
    {status === "error" && (
      <div className="text-danger">Failed to send — try again.</div>
    )}
  </div>
</Form>
</Card>
</Col>
</Row>
 </Container>
      </section>

      <footer className="py-4 text-center text-muted">
        © {new Date().getFullYear()} IoT Dashboard · Praćenje
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