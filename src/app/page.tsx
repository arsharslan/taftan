import Image from "next/image";
import 'ionicons';

export default function Home() {
  return <div className="h-screen overflow-y-auto">
    <div className="topbar">
      <div className="container">
        <address className="topbar-item">
          <div className="icon">
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">
            A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path. Lucknow 226010
            U.P. India
          </span>
        </address>

        <div className="separator"></div>

        <div className="topbar-item item-2">
          <div className="icon">
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Daily : 8.00 am to 10.00 pm</span>
        </div>

        <a href="tel:+11234567890" className="topbar-item link">
          <div className="icon">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">7697333333</span>
        </a>

        <div className="separator"></div>

        <a href="mailto:www.taftans.com" className="topbar-item link">
          <div className="icon">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">www.taftans.com</span>
        </a>
      </div>
    </div>
    {/* <div className={styles.topbar}>
      <div className={styles.container}>
        <address className={styles.topbarItem}>
          <div className={styles.icon}>
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className={styles.span}>
            A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path. Lucknow 226010
            U.P. India
          </span>
        </address>

        <div className={styles.separator}></div>

        <div className={`${styles.topbarItem} ${styles.item2}`}>
          <div className={styles.icon}>
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className={styles.span}>Daily : 8.00 am to 10.00 pm</span>
        </div>

        <a href="tel:+11234567890" className={`${styles.topbarItem} ${styles.link}`}>
          <div className={styles.icon}>
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className={styles.span}>7697333333</span>
        </a>

        <div className={styles.separator}></div>

        <a href="mailto:www.taftans.com" className={`${styles.topbarItem} ${styles.link}`}>
          <div className={styles.icon}>
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className={styles.span}>www.taftans.com</span>
        </a>
      </div>
    </div> */}

    <header className="header" data-header>
      <div className="container">

        <a href="#" className="logo">
          <img
            src="./images/taftan_logo_alt-modified.png"
            width="160"
            height="50"
            alt="Grilli - Home"
          />
        </a>

        <nav className="navbar" data-navbar>

          <button className="close-btn" aria-label="close menu" data-nav-toggler>
            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
          </button>

          <a href="#" className="logo">
            <img
              src="./images/taftan_logo_alt-modified.png"
              width="160"
              height="50"
              alt="Grilli - Home"
            />
          </a>

          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#home" className="navbar-link hover-underline active">
                <div className="separator"></div>
                <span className="span">Home</span>
              </a>
            </li>

            <li className="navbar-item">
              <a href="#menu" className="navbar-link hover-underline">
                <div className="separator"></div>
                <span className="span">Menus</span>
              </a>
            </li>

            <li className="navbar-item">
              <a href="#about" className="navbar-link hover-underline">
                <div className="separator"></div>
                <span className="span">About Us</span>
              </a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link hover-underline">
                <div className="separator"></div>
                <span className="span">Our Chefs</span>
              </a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link hover-underline">
                <div className="separator"></div>
                <span className="span">Contact</span>
              </a>
            </li>
          </ul>

          <div className="text-center">
            <p className="headline-1 navbar-title">Visit Us</p>

            <address className="body-4">
              A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path. Lucknow 226010
              <br />
              U.P. India
            </address>

            <p className="body-4 navbar-text">Open: 9.30 am - 2.30pm</p>

            <a href="mailto:booking@taftan.com" className="body-4 sidebar-link">
              booking@taftan.com
            </a>

            <div className="separator"></div>

            <p className="contact-label">Booking Request</p>

            <a href="tel:+88123123456" className="body-1 contact-number hover-underline">
              +917697333333
            </a>
          </div>

        </nav>

        <a href="#" className="btn btn-secondary">
          <span className="text text-1">Find A Table</span>
          <span className="text text-2" aria-hidden="true">Find A Table</span>
        </a>

        <button className="nav-open-btn" aria-label="open menu" data-nav-toggler>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>

        <div className="overlay" data-nav-toggler data-overlay></div>

      </div>
    </header>

    <main>
      <article>
        <section className="hero text-center" aria-label="home" id="home">
          <ul className="hero-slider" data-hero-slider>
            <li className="slider-item active" data-hero-slider-item>
              <div className="slider-bg">
                <Image
                  src="/images/hero-slider-1.jpg"
                  width={1880}
                  height={950}
                  alt="Hero Slider 1"
                  className="img-cover"
                />
              </div>
              <p className="label-2 section-subtitle slider-reveal">Tradational & Hygine</p>
              <h1 className="display-1 hero-title slider-reveal">
                For the love of <br />
                delicious food
              </h1>
              <p className="body-2 hero-text slider-reveal">
                Come with family & feel the joy of mouthwatering food
              </p>
              <a href="#" className="btn btn-primary slider-reveal">
                <span className="text text-1">View Our Menu</span>
                <span className="text text-2" aria-hidden="true">
                  View Our Menu
                </span>
              </a>
            </li>

            <li className="slider-item" data-hero-slider-item>
              <div className="slider-bg">
                <Image
                  src="/images/hero-slider-2.jpg"
                  width={1880}
                  height={950}
                  alt="Hero Slider 2"
                  className="img-cover"
                />
              </div>
              <p className="label-2 section-subtitle slider-reveal">delightful experience</p>
              <h1 className="display-1 hero-title slider-reveal">
                Flavors Inspired by <br />
                the Seasons
              </h1>
              <p className="body-2 hero-text slider-reveal">
                Come with family & feel the joy of mouthwatering food
              </p>
              <a href="#" className="btn btn-primary slider-reveal">
                <span className="text text-1">View Our Menu</span>
                <span className="text text-2" aria-hidden="true">
                  View Our Menu
                </span>
              </a>
            </li>

            <li className="slider-item" data-hero-slider-item>
              <div className="slider-bg">
                <Image
                  src="/images/hero-slider-3.jpg"
                  width={1880}
                  height={950}
                  alt="Hero Slider 3"
                  className="img-cover"
                />
              </div>
              <p className="label-2 section-subtitle slider-reveal">amazing & delicious</p>
              <h1 className="display-1 hero-title slider-reveal">
                Where each bite <br />
                tells a story
              </h1>
              <p className="body-2 hero-text slider-reveal">
                Come with family & feel the joy of mouthwatering food
              </p>
              <a href="#" className="btn btn-primary slider-reveal">
                <span className="text text-1">View Our Menu</span>
                <span className="text text-2" aria-hidden="true">
                  View Our Menu
                </span>
              </a>
            </li>
          </ul>

          <button className="slider-btn prev" aria-label="slide to previous" data-prev-btn>
            <ion-icon name="chevron-back"></ion-icon>
          </button>

          <button className="slider-btn next" aria-label="slide to next" data-next-btn>
            <ion-icon name="chevron-forward"></ion-icon>
          </button>

          <a href="#" className="hero-btn has-after">
            <Image
              src="/images/hero-icon.png"
              width={48}
              height={48}
              alt="Booking Icon"
            />
            <span className="label-2 text-center span">Book A Table</span>
          </a>
        </section>

        <section className="section service bg-black-10 text-center" aria-label="service">
          <div className="container">

            <p className="section-subtitle label-2">Flavors For Royalty</p>

            <h2 className="headline-1 section-title">We Offer Top Notch</h2>

            <p className="section-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys
              standard dummy text ever.
            </p>

            <ul className="grid-list">
              <li>
                <div className="service-card">
                  <a href="#" className="has-before hover:shine">
                    <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                      <Image
                        src="/images/mughlai.jpg"
                        width={285}
                        height={336}
                        loading="lazy"
                        alt="Mughlai Cuisine"
                        className="img-cover"
                      />
                    </figure>
                  </a>
                  <div className="card-content">
                    <h3 className="title-4 card-title">
                      <a href="#">Mughlai Cuisine</a>
                    </h3>
                    <a href="#" className="btn-text hover-underline label-2">View Menu</a>
                  </div>
                </div>
              </li>

              <li>
                <div className="service-card">
                  <a href="#" className="has-before hover:shine">
                    <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                      <Image
                        src="/images/indian.jpg"
                        width={285}
                        height={336}
                        loading="lazy"
                        alt="Indian Cuisine"
                        className="img-cover"
                      />
                    </figure>
                  </a>
                  <div className="card-content">
                    <h3 className="title-4 card-title">
                      <a href="#">Indian Cuisine</a>
                    </h3>
                    <a href="#" className="btn-text hover-underline label-2">View Menu</a>
                  </div>
                </div>
              </li>

              <li>
                <div className="service-card">
                  <a href="#" className="has-before hover:shine">
                    <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                      <Image
                        src="/images/chinese.jpg"
                        width={285}
                        height={336}
                        loading="lazy"
                        alt="Chinese Cuisine"
                        className="img-cover"
                      />
                    </figure>
                  </a>
                  <div className="card-content">
                    <h3 className="title-4 card-title">
                      <a href="#">Chinese Cuisine</a>
                    </h3>
                    <a href="#" className="btn-text hover-underline label-2">View Menu</a>
                  </div>
                </div>
              </li>
            </ul>

            <Image
              src="/images/shape-1.png"
              width={246}
              height={412}
              loading="lazy"
              alt="Shape 1"
              className="shape shape-1 move-anim"
            />
            <Image
              src="/images/shape-2.png"
              width={343}
              height={345}
              loading="lazy"
              alt="Shape 2"
              className="shape shape-2 move-anim"
            />
          </div>
        </section>

        <section className="section about text-center" aria-labelledby="about-label" id="about">
          <div className="container">

            <div className="about-content">

              <p className="label-2 section-subtitle" id="about-label">Our Story</p>

              <h2 className="headline-1 section-title">Each Bite Tells a Story</h2>

              <p className="section-text">
                Taftan Catering is a premier catering company established in 2013, specializing in a diverse range of cuisines including Mughlai, Indian, Chinese, and Continental. With a commitment to excellence and a passion for culinary artistry, Taftan Catering is dedicated to delivering exceptional dining experiences for all types of events, from grand weddings to intimate family gatherings.
              </p>

              <div className="contact-label">Book Through Call</div>

              <a href="tel:+804001234567" className="body-1 contact-number hover-underline">+917697333333</a>

              <a href="#" className="btn btn-primary">
                <span className="text text-1">Read More</span>
                <span className="text text-2" aria-hidden="true">Read More</span>
              </a>

            </div>

            <figure className="about-banner">

              <Image
                src="/images/catering.jpeg"
                width={570}
                height={570}
                loading="lazy"
                alt="About Banner"
                className="w-100"
              />

              <div className="abs-img abs-img-1 has-before" data-parallax-item data-parallax-speed="1.75">
                <Image
                  src="/images/team.jpeg"
                  width={285}
                  height={285}
                  loading="lazy"
                  alt="Team"
                  className="w-100"
                />
              </div>

              <div className="abs-img abs-img-2 has-before">
                <Image
                  src="/images/2013-transparent.png"
                  width={133}
                  height={134}
                  loading="lazy"
                  alt="2013"
                />
              </div>

            </figure>

            <Image
              src="/images/shape-3.png"
              width={197}
              height={194}
              loading="lazy"
              alt="Shape"
              className="shape"
            />

          </div>
        </section>

        <section className="section vision text-center" aria-labelledby="vision-label" id="vision">
          <div className="container d-flex align-items-center">
            <div className="vision-content text-left">
              <p className="label-2 section-subtitle" id="vision-label">Our Vision</p>
              <h2 className="headline-1 section-title">To be recognized as the leading catering service</h2>
              <p className="section-text">
                To be recognized as the leading catering service that brings together the best flavors from different culinary traditions, ensuring memorable dining experiences for every occasion.
              </p>
            </div>
          </div>
        </section>

        <section className="section gallery text-center" aria-labelledby="gallery-label" id="gallery">
          <div className="container">
            <p className="label-2 section-subtitle" id="gallery-label">Gallery</p>
            <h2 className="headline-1 section-title">Our Culinary Creations</h2>
            <div className="gallery-grid">
              <div className="gallery-item">
                <Image src="/images/dish1.jpg" alt="Dish 1" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish2.jpg" alt="Dish 2" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish3.jpg" alt="Dish 3" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish4.jpg" alt="Dish 4" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish5.jpg" alt="Dish 5" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish6.jpg" alt="Dish 6" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish7.jpg" alt="Dish 7" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish8.jpg" alt="Dish 8" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish9.jpg" alt="Dish 9" width={300} height={200} />
              </div>
              <div className="gallery-item">
                <Image src="/images/dish1.jpg" alt="Dish 10" width={300} height={200} />
              </div>
            </div>
          </div>
        </section>

        <section className="section mission text-center" aria-labelledby="mission-label" id="mission">
          <div className="container d-flex align-items-center flex-row-reverse">
            <div className="mission-content text-left">
              <p className="label-2 section-subtitle" id="mission-label">Our Mission</p>
              <h2 className="headline-1 section-title">Creating Memorable Dining Experiences</h2>
              <p className="section-text">
                To create delicious and visually stunning meals that cater to the unique preferences of our clients while providing outstanding service that exceeds expectations.
              </p>
            </div>
          </div>
        </section>

        <section className="special-dish text-center" aria-labelledby="dish-label">
          <div className="special-dish-banner">
            <Image
              src="/images/biryani.jpg"
              alt="special dish"
              width={940}
              height={900}
              loading="lazy"
              className="img-cover"
            />
          </div>

          <div className="special-dish-content bg-black-10">
            <div className="container">
              <Image
                src="/images/badge-1.png"
                alt="badge"
                width={28}
                height={41}
                loading="lazy"
                className="abs-img"
              />

              <p className="section-subtitle label-2">Special Dish</p>

              <h2 className="headline-1 section-title">Biryani & Kebabs</h2>

              <p className="section-text">
                Experience the rich flavors of our aromatic Biryani, cooked to perfection with spices and tender meat, served alongside succulent Kebabs that melt in your mouth. A true feast for the senses!
              </p>

              <div className="wrapper">
                <del className="del body-3">₹800.00</del>
                <span className="span body-1">₹500.00</span>
              </div>

              <a href="#" className="btn btn-primary">
                <span className="text text-1">View All Menu</span>
                <span className="text text-2" aria-hidden="true">View All Menu</span>
              </a>
            </div>
          </div>

          <Image
            src="/images/shape-4.png"
            alt=""
            width={179}
            height={359}
            loading="lazy"
            className="shape shape-1"
          />

          <Image
            src="/images/shape-9.png"
            alt=""
            width={351}
            height={462}
            loading="lazy"
            className="shape shape-2"
          />
        </section>

        <section className="section menu" aria-label="menu-label" id="menu">
          <div className="container">
            <p className="section-subtitle text-center label-2">Special Selection</p>

            <h2 className="headline-1 section-title text-center">Delicious Menu</h2>

            <ul className="grid-list">
              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-1.png"
                      alt="Butter Chicken"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Butter Chicken</a>
                      </h3>
                      <span className="badge label-1">Classic</span>
                      <span className="span title-2">₹499</span>
                    </div>
                    <p className="card-text label-1">
                      Tender chicken cooked in a creamy tomato sauce with spices.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-2.png"
                      alt="Chicken Biryani"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Chicken Biryani</a>
                      </h3>
                      <span className="span title-2">₹399</span>
                    </div>
                    <p className="card-text label-1">
                      Aromatic basmati rice layered with marinated chicken and spices.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-3.png"
                      alt="Veg Manchurian"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Veg Manchurian</a>
                      </h3>
                      <span className="span title-2">₹299</span>
                    </div>
                    <p className="card-text label-1">
                      Fried vegetable balls tossed in a spicy Indo-Chinese sauce.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-4.png"
                      alt="Paneer Tikka"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Paneer Tikka</a>
                      </h3>
                      <span className="badge label-1">New</span>
                      <span className="span title-2">₹349</span>
                    </div>
                    <p className="card-text label-1">
                      Marinated paneer grilled with bell peppers and spices.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-5.png"
                      alt="Chow Mein"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Chow Mein</a>
                      </h3>
                      <span className="span title-2">₹199</span>
                    </div>
                    <p className="card-text label-1">
                      Stir-fried noodles with vegetables and your choice of protein.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="menu-card hover:card">
                  <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                    <Image
                      src="/images/menu-6.png"
                      alt="Cheese Naan"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">Cheese Naan</a>
                      </h3>
                      <span className="span title-2">₹149</span>
                    </div>
                    <p className="card-text label-1">
                      Soft Indian bread stuffed with melted cheese.
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <p className="menu-text text-center">
              During winter daily from <span className="span">7:00 pm</span> to <span className="span">9:00 pm</span>
            </p>

            <a href="#" className="btn btn-primary">
              <span className="text text-1">View All Menu</span>
              <span className="text text-2" aria-hidden="true">View All Menu</span>
            </a>

            <Image
              src="/images/shape-5.png"
              alt="shape"
              width={921}
              height={1036}
              loading="lazy"
              className="shape shape-2 move-anim"
            />
            <Image
              src="/images/shape-6.png"
              alt="shape"
              width={343}
              height={345}
              loading="lazy"
              className="shape shape-3 move-anim"
            />
          </div>
        </section>

        <section className="section team text-center has-bg-image" style={{ backgroundImage: 'url(/images/testimonial-bg.jpg)' }} aria-label="team">
          <div className="container">
            <p className="label-2 section-subtitle">The Team Behind Taftan</p>
            <h2 className="headline-1 section-title">Meet Our Experts</h2>

            <div className="team-members">
              {/* Siraj Ahmed Siddiqui */}
              <div className="team-member">
                <Image
                  src="/images/founder.png"
                  alt="Siraj Ahmed Siddiqui"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="team-img"
                />
                <p className="label-2 team-name">Siraj Ahmed Siddiqui</p>
                <p className="team-title">Founder and Culinary Expert</p>
                <p className="team-desc">With over 48 years of experience in the food and beverage industry, Siraj Ahmed Siddiqui is known for his passion for creating exceptional dining experiences...</p>
              </div>

              {/* Dr. Imran Ahmed Siddiqui */}
              <div className="team-member">
                <Image
                  src="/images/imran.jpeg"
                  alt="Dr. Imran Ahmed Siddiqui"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="team-img"
                />
                <p className="label-2 team-name">Dr. Imran Ahmed Siddiqui</p>
                <p className="team-title">CEO, Business Excellence Professional</p>
                <p className="team-desc">With 20 years of experience in business excellence, Dr. Imran Ahmed Siddiqui’s expertise in strategic planning plays a vital role in enhancing company performance...</p>
              </div>

              {/* Fahad Iqbal */}
              <div className="team-member">
                <Image
                  src="/images/fahad.png"
                  alt="Fahad Iqbal"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="team-img"
                />
                <p className="label-2 team-name">Fahad Iqbal</p>
                <p className="team-title">COO, Catering Services Expert</p>
                <p className="team-desc">With 15 years in catering services, Fahad Iqbal ensures that every occasion is executed flawlessly with the highest standards of quality and service...</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section testi text-center has-bg-image" style={{ backgroundImage: 'url(/images/testimonial-bg.jpg)' }} aria-label="testimonials">
          <div className="container">

            <div className="quote">”</div>

            <p className="headline-2 testi-text">
              At Taftan Catering, we believe that every meal is an opportunity to create cherished memories. Join us for a culinary experience where each bite tells a story!
            </p>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <div className="profile">
              <Image
                src="/images/founder.png"
                alt="Sam Jhonson"
                width={100}
                height={100}
                loading="lazy"
                className="img"
              />

              <p className="label-2 profile-name">Founder and Culinary Expert</p>
            </div>

          </div>
        </section>


        <section className="reservation">
          <div className="container">

            <div className="form reservation-form bg-black-10">

              <form action="" className="form-left">

                <h2 className="headline-1 text-center">Online Reservation</h2>

                <p className="form-text text-center">
                  Booking request <a href="tel:+88123123456" className="link">+917697333333</a>
                  or fill out the order form
                </p>

                <div className="input-wrapper">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    autoComplete="off"
                    className="input-field"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="off"
                    className="input-field"
                  />
                </div>

                <div className="input-wrapper">
                  <div className="icon-wrapper">
                    <ion-icon name="person-outline" aria-hidden="true"></ion-icon>

                    <select name="person" className="input-field">
                      <option value="1-person">1 Person</option>
                      <option value="2-person">2 Person</option>
                      <option value="3-person">3 Person</option>
                      <option value="4-person">4 Person</option>
                      <option value="5-person">5 Person</option>
                      <option value="6-person">6 Person</option>
                      <option value="7-person">7 Person</option>
                    </select>

                    <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                  </div>

                  <div className="icon-wrapper">
                    <ion-icon name="calendar-clear-outline" aria-hidden="true"></ion-icon>

                    <input
                      type="date"
                      name="reservation-date"
                      className="input-field"
                    />

                    <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                  </div>

                  <div className="icon-wrapper">
                    <ion-icon name="time-outline" aria-hidden="true"></ion-icon>

                    <select name="person" className="input-field">
                      <option value="08:00am">08:00 am</option>
                      <option value="09:00am">09:00 am</option>
                      <option value="10:00am">10:00 am</option>
                      <option value="11:00am">11:00 am</option>
                      <option value="12:00am">12:00 am</option>
                      <option value="01:00pm">01:00 pm</option>
                      <option value="02:00pm">02:00 pm</option>
                      <option value="03:00pm">03:00 pm</option>
                      <option value="04:00pm">04:00 pm</option>
                      <option value="05:00pm">05:00 pm</option>
                      <option value="06:00pm">06:00 pm</option>
                      <option value="07:00pm">07:00 pm</option>
                      <option value="08:00pm">08:00 pm</option>
                      <option value="09:00pm">09:00 pm</option>
                      <option value="10:00pm">10:00 pm</option>
                    </select>

                    <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                  </div>

                </div>

                <textarea
                  name="message"
                  placeholder="Message"
                  autoComplete="off"
                  className="input-field"
                ></textarea>

                <button type="submit" className="btn btn-secondary">
                  <span className="text text-1">Book A Table</span>
                  <span className="text text-2" aria-hidden="true">Book A Table</span>
                </button>

              </form>

              <div className="form-right text-center" style={{ backgroundImage: 'url(/images/form-pattern.png)' }}>

                <h2 className="headline-1 text-center">Contact Us</h2>

                <p className="contact-label">Booking Request</p>

                <a href="tel:+88123123456" className="body-1 contact-number hover-underline">+917697333333</a>

                <div className="separator"></div>

                <p className="contact-label">Location</p>

                <address className="body-4">
                  A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path. <br />
                  Lucknow 226010, U.P. India
                </address>

                <p className="contact-label">Lunch Time</p>

                <p className="body-4">
                  Monday to Sunday <br />
                  11:00 am - 2:30 pm
                </p>

                <p className="contact-label">Dinner Time</p>

                <p className="body-4">
                  Monday to Sunday <br />
                  05:00 pm - 10:00 pm
                </p>

              </div>

            </div>

          </div>
        </section>

        <section className="section features text-center" aria-label="features">
          <div className="container">

            <p className="section-subtitle label-2">Why Choose Taftan Catering?</p>

            <h2 className="headline-1 section-title">Our Strength</h2>

            <ul className="grid-list">

              <li className="feature-item">
                <div className="feature-card">

                  <div className="card-icon">
                    <img
                      src="./images/features-icon-1.png"
                      width="100"
                      height="80"
                      loading="lazy"
                      alt="icon"
                    />
                  </div>

                  <h3 className="title-2 card-title">Diverse Menu</h3>

                  <p className="label-1 card-text">
                    A wide variety of cuisines to suit different tastes and preferences, ensuring every guest is satisfied.
                  </p>

                </div>
              </li>

              <li className="feature-item">
                <div className="feature-card">

                  <div className="card-icon">
                    <img
                      src="./images/features-icon-2.png"
                      width="100"
                      height="80"
                      loading="lazy"
                      alt="icon"
                    />
                  </div>

                  <h3 className="title-2 card-title">Customized Menus</h3>

                  <p className="label-1 card-text">
                    Tailored catering options designed to meet the unique needs of each client and event.
                  </p>

                </div>
              </li>

              <li className="feature-item">
                <div className="feature-card">

                  <div className="card-icon">
                    <img
                      src="./images/features-icon-3.png"
                      width="100"
                      height="80"
                      loading="lazy"
                      alt="icon"
                    />
                  </div>

                  <h3 className="title-2 card-title">Exceptional Service</h3>

                  <p className="label-1 card-text">
                    A dedicated team focused on delivering outstanding hospitality and seamless event execution.
                  </p>

                </div>
              </li>

              <li className="feature-item">
                <div className="feature-card">

                  <div className="card-icon">
                    <img
                      src="./images/features-icon-4.png"
                      width="100"
                      height="80"
                      loading="lazy"
                      alt="icon"
                    />
                  </div>

                  <h3 className="title-2 card-title">Expertise</h3>

                  <p className="label-1 card-text">
                    Led by seasoned professionals in the food and beverage industry, ensuring high standards of quality and taste.
                  </p>

                </div>
              </li>

            </ul>

            <img
              src="./images/shape-7.png"
              width="208"
              height="178"
              loading="lazy"
              alt="shape"
              className="shape shape-1"
            />

            <img
              src="./images/shape-8.png"
              width="120"
              height="115"
              loading="lazy"
              alt="shape"
              className="shape shape-2"
            />

          </div>
        </section>

        <section className="section event bg-black-10" aria-label="event">
          <div className="container">

            <p className="section-subtitle label-2 text-center">Recent Updates</p>

            <h2 className="section-title headline-1 text-center">Services Offered</h2>

            <ul className="grid-list">

              <li>
                <div className="event-card has-before hover:shine">

                  <div className="card-banner img-holder" style={{ '--width': '350px', '--height': '450px' }}>
                    <img
                      src="./images/event-1.jpg"
                      width="350"
                      height="450"
                      loading="lazy"
                      alt="Flavour so good you’ll try to eat with your eyes."
                      className="img-cover"
                    />
                  </div>

                  <div className="card-content">
                    <p className="card-subtitle label-2 text-center">Outdoor Catering</p>

                    <h3 className="card-title title-2 text-center">
                      Customized catering solutions for weddings, receptions, and large-scale events.
                    </h3>
                  </div>

                </div>
              </li>

              <li>
                <div className="event-card has-before hover:shine">

                  <div className="card-banner img-holder" style={{ '--width': '350px', '--height': '450px' }}>
                    <img
                      src="./images/event-2.jpg"
                      width="350"
                      height="450"
                      loading="lazy"
                      alt="Flavour so good you’ll try to eat with your eyes."
                      className="img-cover"
                    />
                  </div>

                  <div className="card-content">
                    <p className="card-subtitle label-2 text-center">Corporate Events</p>

                    <h3 className="card-title title-2 text-center">
                      Professional catering services for corporate gatherings, conferences, and business meetings.
                    </h3>
                  </div>

                </div>
              </li>

              <li>
                <div className="event-card has-before hover:shine">

                  <div className="card-banner img-holder" style={{ '--width': '350px', '--height': '450px' }}>
                    <img
                      src="./images/event-3.jpg"
                      width="350"
                      height="450"
                      loading="lazy"
                      alt="Flavour so good you’ll try to eat with your eyes."
                      className="img-cover"
                    />
                  </div>

                  <div className="card-content">
                    <p className="card-subtitle label-2 text-center">Venue Catering</p>

                    <h3 className="card-title title-2 text-center">
                      Partnering with prestigious venues to provide comprehensive catering for various functions.
                    </h3>
                  </div>

                </div>
              </li>

            </ul>

            <a href="#" className="btn btn-primary">
              <span className="text text-1">View Our Blog</span>

              <span className="text text-2" aria-hidden="true">View Our Blog</span>
            </a>

          </div>
        </section>


      </article>
    </main>

    <footer className="footer section has-bg-image text-center" style={{ backgroundImage: "url('./images/footer-bg.jpg')" }}>
      <div className="container">

        <div className="footer-top grid-list">

          <div className="footer-brand has-before has-after">

            <a href="#" className="logo">
              <img src="./images/taftan_logo_alt-modified.png" width="160" height="50" loading="lazy" alt="taftan home" />
            </a>

            <address className="body-4">
              A-1/702 M I Rustle Court, Gomtinagar Ext-6, Shaheed Path. Lucknow 226010 U.P. India
            </address>

            <a href="mailto:booking@taftan.com" className="body-4 contact-link">booking@taftan.com</a>

            <a href="tel:+88123123456" className="body-4 contact-link">Booking Request : +917697333333</a>

            <p className="body-4">
              Open : 09:00 am - 01:00 pm
            </p>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <p className="title-1">Get News & Offers</p>

            <p className="label-1">
              Subscribe us & Get <span className="span">25% Off.</span>
            </p>

            <form action="" className="input-wrapper">
              <div className="icon-wrapper">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>

                <input type="email" name="email_address" placeholder="Your email" autoComplete="off" className="input-field" />
              </div>

              <button type="submit" className="btn btn-secondary">
                <span className="text text-1">Subscribe</span>
                <span className="text text-2" aria-hidden="true">Subscribe</span>
              </button>
            </form>

          </div>

          <ul className="footer-list">
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Home</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Menus</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">About Us</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Our Chefs</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Contact</a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Facebook</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Instagram</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Twitter</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Youtube</a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">Google Map</a>
            </li>
          </ul>

        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2024 Taftan. All Rights Reserved | Crafted by Shazia Afreen
          </p>
        </div>

      </div>
    </footer>

  </div>;
}