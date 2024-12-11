"use client";
import React from "react";
import styles from "./style.module.css";

const HomeCatering = () => {
  const cards = [
    {
      image: "/images/catering1.jpg",
      date: "Apr 5, 2025",
      title: "Family Dinners",
      subtitle: "Gourmet meals for intimate gatherings.",
    },
    {
      image: "/images/catering2.jpg",
      date: "May 12, 2025",
      title: "Festive Celebrations",
      subtitle: "Celebrate traditions with exquisite cuisine.",
    },
    {
      image: "/images/catering3.jpg",
      date: "Jun 20, 2025",
      title: "Casual Get-Togethers",
      subtitle: "Flavors that bring everyone together.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.sectiontitle}>Home Catering: Bring Culinary Bliss to Your Doorstep</h1>

      {/* Long Description Section */}
      <div className={styles.longDescription}>
        <p>
          Transform your home into a haven of flavors with Taftan’s home catering services.  
          Whether it’s a cozy family dinner, a festive celebration, or a casual get-together,  
          we bring the magic of gourmet dining to your doorstep.  
        </p>
        <br />
        <p>
          🔥 **Freshly Crafted Delights**  
          Our signature Taftan bread and an array of handcrafted dishes are designed to elevate your dining experience.  
          Every bite is a testament to our commitment to quality and taste.  
        </p>
        <br />
        <p>
          🎉 **Tailored for Every Occasion**  
          From traditional festive feasts to contemporary casual menus, we customize every dish to match the mood of your gathering.  
          Imagine vibrant platters, live cooking stations, and beautifully plated meals—all within the comfort of your home.  
        </p>
        <br />
        <p>
          💎 **Effortless Hosting**  
          Let us take the stress out of hosting. From menu planning to serving, our professional team ensures a seamless experience,  
          so you can focus on enjoying time with your loved ones.  
        </p>
        <br />
        <img src="/images/catering-home.jpeg" alt="Home Catering Setup" className={styles.roundedImage} />
        <br />
        <p>
          🌟 **Comfort Meets Luxury**  
          Be it an intimate candlelit dinner or a lively family celebration,  
          our home catering blends the warmth of homemade meals with the sophistication of fine dining.  
        </p>
        <br />
        <img src="/images/catering-11.jpeg" alt="Gourmet Dishes Served at Home" className={styles.roundedImage} />
      </div>

      {/* Cards Section */}
      <h2 className={styles.sectiontitle}>Our Home Catering Highlights</h2>
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
      <h2 className={styles.sectiontitle}>Contact Us to Elevate Your Home Dining</h2>
      <div className={styles.contactCard}>
        <p className={styles.contactDetails}>
          📞 <strong>Phone:</strong> +91 7697333333<br />
          📧 <strong>Email:</strong> homecatering@taftan.com<br />
          📍 <strong>Address:</strong> A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path, Lucknow 226010, U.P. India
        </p>
      </div>
    </div>
  );
};

export default HomeCatering;
