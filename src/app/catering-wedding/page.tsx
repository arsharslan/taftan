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

      {/* Contact Us Section */}
      <h2 className={styles.sectiontitle}>Contact Us to Plan Your Dream Wedding</h2>
      <div className={styles.contactCard}>
        <p className={styles.contactDetails}>
          📞 <strong>Phone:</strong> +91 7697333333<br />
          📧 <strong>Email:</strong> weddingcatering@taftan.com<br />
          📍 <strong>Address:</strong> A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path, Lucknow 226010, U.P. India
        </p>
      </div>
    </div>
  );
};

export default WeddingCatering;
