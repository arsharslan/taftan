"use client";
import React from "react";
import styles from "./style.module.css";

const WeddingCatering = () => {
  const cards = [
    {
      image: "/images/catering1.jpg",
      date: "Mar 10, 2025",
      title: "Grand Receptions",
      subtitle: "A feast as grand as your love story.",
    },
    {
      image: "/images/catering2.jpg",
      date: "Apr 20, 2025",
      title: "Intimate Ceremonies",
      subtitle: "Elegant dining for cherished moments.",
    },
    {
      image: "/images/catering3.jpg",
      date: "May 15, 2025",
      title: "Themed Weddings",
      subtitle: "Customized menus for every unique theme.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.sectiontitle}>Wedding Catering: Celebrate Love with Taftan</h1>

      {/* Long Description Section */}
      <div className={styles.longDescription}>
        <p>
          Your wedding is a once-in-a-lifetime celebration, and we’re here to make it unforgettable.  
          With Taftan’s premium wedding catering services, every bite tells a story of love, tradition, and sophistication.  
        </p>
        <br />
        <p>
          🔥 **Exquisite Culinary Creations**  
          From our signature Taftan bread, delicately infused with saffron, to lavish multi-course meals, we offer a menu that delights every palate.  
          Our dishes are crafted to perfection, ensuring your wedding feast is as memorable as the day itself.  
        </p>
        <br />
        <p>
          🎉 **Customized Wedding Themes**  
          Whether you’re planning a traditional wedding, a modern celebration, or a themed extravaganza,  
          our catering seamlessly integrates with your vision. Think floral-decorated food stations, live cooking setups,  
          and artfully plated dishes that are a treat for the eyes and the taste buds.  
        </p>
        <br />
        <p>
          💎 **Flawless Execution**  
          Our experienced team takes care of every detail, from setup to service, so you can focus on cherishing your special moments.  
          We ensure that your guests are served with the utmost professionalism, leaving them raving about the experience.  
        </p>
        <br />
        <img src="/images/catering-4.jpeg" alt="Wedding Feast Setup" className={styles.roundedImage} />
        <br />
        <p>
          🌟 **Unforgettable Ambiance**  
          Imagine a grand spread under a canopy of twinkling lights or a luxurious buffet at a picturesque outdoor venue.  
          With Taftan, your wedding dining experience will be as enchanting as the vows you exchange.  
        </p>
        <br />
        <img src="/images/catering-5.jpeg" alt="Live Cooking Setup at Wedding" className={styles.roundedImage} />
      </div>

      {/* Cards Section */}
      <h2 className={styles.sectiontitle}>Our Wedding Catering Highlights</h2>
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
      <h2 className={styles.sectiontitle}>Contact Us to Plan Your Dream Wedding</h2>
      <div className={styles.contactCard}>
        <p className={styles.contactDetails}>
          📞 <strong>Phone:</strong> +91 7697333333<br />
          📧 <strong>Email:</strong> weddingcatering@taftan.com<br />
          📍 <strong>Address:</strong> Opposite Novelty Cinema, Lalbagh, Lucknow 226001, U.P. India
        </p>
        <a href="https://g.co/kgs/K3YxQXc" className="text-white pb-1 pt-4 mx-auto uppercase" target="_blank" rel="noopener noreferrer">View on Google Maps</a>

      </div>
    </div>
  );
};

export default WeddingCatering;
