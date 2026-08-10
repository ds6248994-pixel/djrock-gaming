function Contact() {
    return (
        <div className="contact-page">
            <h1>Contact DJROCK</h1>

            <p>
                Have a question or need help with a project?
                Feel free to contact me.
            </p>

            <div className="contact-info">
                <h2>Get in Touch</h2>

                <p>
                    📧 Email: Your Email Here
                </p>

                <p>
                    💼 Fiverr: Deepak
                </p>

                <p>
                    💻 Services: Data Entry, Excel, Web & React
                </p>
            </div>
            <form className="contact-form">
             <input
                  type="text"
                  placeholder="Your Name"
             />

            <input  
                  type="email"
                  placeholder="Your Email"
          />

      <textarea
                placeholder="Your Message"
                rows="5"
       ></textarea>

        <button type="submit">
                Send Message
        </button>
       </form>
         </div>
            
    );
}

export default Contact;