"use client";
import React from "react";
import styles from "./style.module.css";

const CorporateCatering = () => {
  const cards = [
    {
      image: "/images/catering1.jpg",
      date: "Jan 15, 2025",
      title: "Conference Catering",
      subtitle: "Elegant setups for professional gatherings.",
    },
    {
      image: "/images/catering2.jpg",
      date: "Feb 10, 2025",
      title: "Team Celebrations",
      subtitle: "Delightful spreads to celebrate success.",
    },
    {
      image: "/images/catering3.jpg",
      date: "Mar 5, 2025",
      title: "Networking Events",
      subtitle: "Curated menus for impactful connections.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.sectiontitle}>Corporate Catering: Elevate Your Events with Taftan</h1>

      {/* Long Description Section */}
      <div className={styles.longDescription}>
        <p>
          Make a lasting impression at your next corporate event with Taftan’s professional catering services.  
          Whether you’re hosting a conference, a networking event, or a celebratory team dinner, we provide an impeccable culinary experience that complements the sophistication of your gathering.
        </p>
        <br />
        <p>
          🔥 <strong>Exceptional Culinary Excellence</strong>  
          Our signature Taftan bread, paired with a selection of gourmet dishes, is designed to please the most discerning palates. From light appetizers to elaborate main courses, every dish is crafted to perfection.  
        </p>
        <br />
        <p>
          🎉 <strong>Tailored for Corporate Vibes</strong>  
          We understand the importance of creating an ambiance that aligns with your company’s ethos. Our catering solutions are tailored to reflect professionalism, elegance, and attention to detail.  
        </p>
        <br />
        <p>
          💎 <strong>Unparalleled Service</strong>  
          Our experienced staff ensures seamless service, allowing you to focus on your guests and objectives. From setup to cleanup, we handle it all with precision and care.  
        </p>
        <br />
        <img src="/images/long-description.jpeg" alt="Corporate Event Setup" className={styles.roundedImage} />
        <br />
        <p>
          🌟 <strong>Menus Designed for Success</strong>  
          Be it formal sit-down meals or dynamic buffet setups, our diverse menu options cater to all corporate occasions. We ensure every detail is executed flawlessly, leaving your guests impressed and delighted.  
        </p>
        <br />
        <img src="/images/long-description.jpeg" alt="Networking Catering" className={styles.roundedImage} />
      </div>

      {/* Cards Section */}
      <h2 className={styles.sectiontitle}>Our Corporate Catering Highlights</h2>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => (
          <div key={index} className={styles.eventCard}>
            <div className={styles.cardBanner}>
              <img src={card.image} alt={card.title} className={styles.imgCover} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.publishDate}>{card.date}</span>
              <h3 className={styles.cardSubtitle}>{card.subtitle}</h3>
              <p className={styles.cardTitle}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Section */}
      <h2 className={styles.sectiontitle}>Book Your Catering Experience</h2>
      <form className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your full name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact">Contact Email:</label>
          <input type="email" id="contact" name="contact" placeholder="Enter your email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="persons">Number of Persons:</label>
          <input type="number" id="persons" name="persons" placeholder="Number of guests" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Event Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="time">Event Time:</label>
          <input type="time" id="time" name="time" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="purpose">Purpose of Event:</label>
          <select id="purpose" name="purpose" required>
            <option value="">Select purpose</option>
            <option value="venue-catering">Venue Catering</option>
            <option value="corporate-catering">Corporate Catering</option>
            <option value="wedding-catering">Wedding Catering</option>
            <option value="home-catering">Home Catering</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" placeholder="Additional details or requirements" rows="4"></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Contact Us Section */}
      <h2 className={styles.sectiontitle}>Get in Touch for Your Next Corporate Event</h2>
      <div className={styles.contactCard}>
        <p className={styles.contactDetails}>
          📞 <strong>Phone:</strong> +91 7697333333<br />
          📧 <strong>Email:</strong> corporatecatering@taftan.com<br />
          📍 <strong>Address:</strong> A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path, Lucknow 226010, U.P. India
        </p>
      </div>
    </div>
  );
};

export default CorporateCatering;
