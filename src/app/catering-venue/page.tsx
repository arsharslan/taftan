"use client";
import React from "react";
import styles from "./style.module.css";

const OutdoorCatering = () => {
  const cards = [
    {
      image: "/images/catering1.jpg",
      date: "Dec 12, 2024",
      title: "Wedding Catering",
      subtitle: "Make your big day special!",
    },
    {
      image: "/images/catering2.jpg",
      date: "Jan 5, 2025",
      title: "Corporate Events",
      subtitle: "Professional catering solutions",
    },
    {
      image: "/images/catering3.jpg",
      date: "Feb 14, 2025",
      title: "Birthday Parties",
      subtitle: "Celebrate with flavors!",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.sectiontitle}>Venue Catering at Taftan: A Culinary Experience Like No Other</h1>

      {/* Long Description Section */}
      <div className={styles.longDescription}>
        <p>
        Step into a world where the aroma of perfectly baked Taftan bread fills the air, tantalizing your taste buds and leaving your guests raving for more. Whether it&apos;s a wedding, corporate gala, birthday bash, or a cozy family gathering, our Venue Catering for Taftan promises to transform every event into a feast of flavors and elegance.
<br></br><br />
Why Choose Taftan for Your Event?
<br /><br />
🔥 Signature Flavors, Timeless Appeal
Our Taftan is crafted to perfection—golden, flaky, and infused with just the right hint of saffron and cardamom. It’s a showstopper on any menu, paired seamlessly with aromatic curries, grilled meats, or fresh salads.
<br /><br />
🎉 Customized to Your Event Theme
From traditional spreads to modern gourmet twists, we tailor our Taftan presentations to suit your event’s vibe. Think live-baking stations, artful platters, or even bespoke mini Taftan canapés.
<br /><br />
💎 Unmatched Quality & Presentation
Every Taftan is baked fresh on-site by our master chefs, ensuring a perfect blend of softness and texture. Served warm and elegantly plated, it’s not just bread—it’s an experience your guests will savor.
<br /><br />
🌟 A Stress-Free Experience
Our expert catering team takes care of everything, from setup to cleanup. All you need to do is sit back, relax, and soak in the compliments from your delighted guests. </p>
        <br /><br />
        <img src="/images/long-description.jpeg" alt="Elegant Outdoor Wedding" className={styles.roundedImage} />
        
        <br />
        <p>
          Our team specializes in creating custom menus tailored to your preferences and event theme. 
          Imagine savoring gourmet appetizers under a starry sky, enjoying freshly grilled delicacies at a beachside event, 
          or indulging in decadent desserts amidst a lush garden setting. Whatever your vision, 
          we work closely with you to bring it to life, ensuring that every dish is a masterpiece.
        </p>

        <br />
        
        <img src="/images/long-description.jpeg" alt="Gourmet Live Cooking Setup" className={styles.roundedImage} />
      </div>

      {/* Cards Section */}
      <h2 className={styles.sectiontitle}>Our Expert Caterings</h2>
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
          <textarea id="message" name="message" placeholder="Additional details or requirements" rows={4}></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Contact Us Section */}
      <h2 className={styles.sectiontitle}>Contact Us Now</h2>
      <div className={styles.contactCard}>
        <p className={styles.contactDetails}>
          📞 <strong>Phone:</strong> +91 7697333333<br />
          📧 <strong>Email:</strong> taftancatering@gmail.com<br />
          📍 <strong>Address:</strong> Opposite Novelty Cinema, Lalbagh, Lucknow 226001
          U.P. India
        </p>
        <a href="https://g.co/kgs/K3YxQXc" className="text-white pb-1 pt-4 mx-auto uppercase" target="_blank" rel="noopener noreferrer">View on Google</a>

      </div>
    </div>
  );
};

export default OutdoorCatering;
