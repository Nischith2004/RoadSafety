import "./Contact.css";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "Your_apikey");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert("Message sent successfully!");
      event.target.reset();
    } else {
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <section className="contact">
      <form onSubmit={onSubmit}>
        <h2>Contact Form</h2>

        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="field"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="field"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-box">
          <label>Phone Number (Optional)</label>
          <input
            type="tel"
            name="phone"
            className="field"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="input-box">
          <label>Subject</label>
          <select name="subject" className="field">
            <option value="general">General Inquiry</option>
            <option value="support">Support Request</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div className="input-box">
          <label>Your Message</label>
          <textarea
            name="message"
            className="field mess"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="reset" className="clear-btn">
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
