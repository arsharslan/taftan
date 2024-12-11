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
          🔥 Exceptional Culinary Excellence  
          Our signature Taftan bread, paired with a selection of gourmet dishes, is designed to please the most discerning palates. From light appetizers to elaborate main courses, every dish is crafted to perfection.  
        </p>
        <br />
        <p>
          🎉 Tailored for Corporate Vibes  
          We understand the importance of creating an ambiance that aligns with your company’s ethos. Our catering solutions are tailored to reflect professionalism, elegance, and attention to detail.  
        </p>
        <br />
        <p>
          💎 Unparalleled Service  
          Our experienced staff ensures seamless service, allowing you to focus on your guests and objectives. From setup to cleanup, we handle it all with precision and care.  
        </p>
        <br />
        <img src="/images/long-description.jpeg" alt="Corporate Event Setup" className={styles.roundedImage} />
        <br />
        <p>
          🌟 Menus Designed for Success  
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
