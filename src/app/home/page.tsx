import styles from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    return <>

        <div className={styles.preload} data-preaload>
            <div className="circle"></div>
            <p className="text">taftan</p>
        </div>

        <div className="topbar">
            <div className="container">

                <address className="topbar-item">


                    <span className="span">

                    </span>
                </address>

                <div className="separator"></div>

                <div className="topbar-item item-2">

                </div>

                <a href="tel:+917697333333" className="topbar-item link">
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

        <header className="header" data-header>
            <div className="container">

                <Link href="#" className="logo">
                    <Image src="./images/taftan_new_logo.png" width={80} height={40} alt="Taftan - Home" />
                </Link>

                <nav className="navbar" data-navbar>

                    <button className="close-btn" aria-label="close menu" data-nav-toggler>
                        <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
                    </button>

                    <Link href="#" className="logo">
                        <Image src="./images/taftan_new_logo.png" width={160} height={50} alt="Taftan - Home" />
                    </Link>

                    <ul className="navbar-list">

                        <li className="navbar-item">
                            <Link href="index.html" className="navbar-link hover-underline active">
                                <div className="separator"></div>

                                <span className="span">Home</span>
                            </Link>
                        </li>

                        <li className="navbar-item">
                            <Link href="about-us.html" className="navbar-link hover-underline  ">
                                <div className="separator"></div>

                                <span className="span">About Us</span>
                            </Link>
                        </li>

                        <li className="navbar-item">
                            <Link href="culinary-delights.html" className="navbar-link hover-underline">
                                <div className="separator"></div>

                                <span className="span">Services</span>
                            </Link>
                            <ul className="dropdown">

                                <li className="dropdown-item">
                                    <Link href="/online-order" className="navbar-link hover-underline">Online Orders</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link href="/catering-wedding" className="navbar-link hover-underline">Wedding Catering</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link href="/catering-corporate" className="navbar-link hover-underline">Corporate Catering</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link href="/catering-venue" className="navbar-link hover-underline">Venue Catering</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link href="/online-home" className="navbar-link hover-underline">Home Catering</Link>
                                </li>
                            </ul>
                        </li>



                        <li className="navbar-item">
                            <Link href="contact-us.html" className="navbar-link hover-underline">
                                <div className="separator"></div>

                                <span className="span">Contact Us</span>
                            </Link>
                        </li>

                        <li className="navbar-item">
                            <Link href="/sign-in?redirect=orders-received" className="navbar-link hover-underline">
                                <div className="separator"></div>
                                <span className="span">Admin Login</span>
                            </Link>
                        </li>

                    </ul>

                    <div className="text-center">
                        <p className="headline-1 navbar-title">Visit Us</p>

                        <address className="body-4">
                            Opposite Novelty Cinema, Lalbagh, Lucknow 226001.
                            <br />
                            U.P. India
                        </address>

                        <p className="body-4 navbar-text">Open: 9.30 am - 2.30pm</p>

                        <a href="mailto:booking@taftan.com" className="body-4 sidebar-link">booking@taftan.com</a>

                        <div className="separator"></div>

                        <p className="contact-label">Booking Request</p>

                        <a href="tel:+88123123456" className="body-1 contact-number hover-underline">
                            +917697333333
                        </a>
                    </div>

                </nav>

                <a href="https://wa.me/917697333333" className="hero-btn has-after" target="_blank">
                    <Image src="./images/whatsapp.png" width={48} height={48} alt="WhatsApp icon" />
                    <span className="label-2 text-center span">Chat with us</span>
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



                    <a href="tel:+917697333333" className="hero-btn has-after">
                        <Image src="./images/smartphone-black.png" width={48} height={48} alt="booking icon" />
                        <span className="label-2 text-center span">Contact Us Now</span>
                    </a>

                    <ul className="hero-slider" data-hero-slider>


                        <li className="slider-item active" data-hero-slider-item>

                            <div className="slider-bg">
                                <Image src="./images/dish1.jpg" width={1880} height={950} alt="" className="img-cover" /* style={{filter: brightness(20%);}} */ />
                            </div>

                            <p className="label-2 section-subtitle slider-reveal">Tradational & Hygine</p>

                            <h1 className="display-1 hero-title slider-reveal">
                                For the love of <br />
                                delicious food
                            </h1>

                            <p className="body-2 hero-text slider-reveal">
                                Come with family & feel the joy of mouthwatering food
                            </p>

                            <Link href="/online-order/0" className="btn btn-primary slider-reveal">
                                <span className="text text-1">Order Now</span>

                                <span className="text text-2" aria-hidden="true">Order Now</span>
                            </Link>

                        </li>

                        <li className="slider-item" data-hero-slider-item>

                            <div className="slider-bg">
                                <Image src="./images/dish3.jpg" width={1880} height={950} alt="" className="img-cover" /* style="filter: brightness(20%);" */ />
                            </div>

                            <p className="label-2 section-subtitle slider-reveal">delightful experience</p>

                            <h1 className="display-1 hero-title slider-reveal">
                                Flavors Inspired by <br />
                                the Seasons
                            </h1>

                            <p className="body-2 hero-text slider-reveal">
                                Come with family & feel the joy of mouthwatering food
                            </p>

                            <Link href="/online-order/0" className="btn btn-primary slider-reveal">
                                <span className="text text-1">Order now</span>

                                <span className="text text-2" aria-hidden="true">Order now</span>
                            </Link>

                        </li>

                        <li className="slider-item" data-hero-slider-item>

                            <div className="slider-bg">
                                <Image src="./images/dish7.jpg" width={1880} height={950} alt="" className="img-cover" /* style="filter:brightness(20%);" */ />
                            </div>

                            <p className="label-2 section-subtitle slider-reveal">amazing & delicious</p>

                            <h1 className="display-1 hero-title slider-reveal">
                                Where each bite <br />
                                tells a story
                            </h1>

                            <p className="body-2 hero-text slider-reveal">
                                Come with family & feel the joy of mouthwatering food
                            </p>

                            <Link href="/online-order/0" className="btn btn-primary slider-reveal">
                                <span className="text text-1">Order now</span>

                                <span className="text text-2" aria-hidden="true">Order now</span>
                            </Link>

                        </li>

                    </ul>

                    <a href="https://wa.me/917697333333" className="hero-btn has-after" target="_blank">
                        <Image src="./images/whatsapp.png" width={48} height={48} alt="WhatsApp icon" />
                        <span className="label-2 text-center span">Chat with us</span>
                    </a>




                    <button className="slider-btn prev" aria-label="slide to previous" data-prev-btn>
                        <ion-icon name="chevron-back"></ion-icon>
                    </button>

                    <button className="slider-btn next" aria-label="slide to next" data-next-btn>
                        <ion-icon name="chevron-forward"></ion-icon>
                    </button>



                    <a href="tel:+917697333333" className="hero-btn has-after">
                        <Image src="./images/smartphone-black.png" width={48} height={48} alt="booking icon" />
                        <span className="label-2 text-center span">Contact Us Now</span>
                    </a>





                </section>






                <section className="section event bg-black-10" aria-label="event">

                    <a href="" className="hero-btn has-after">
                        <Image src="./images/quality-BLACK.png" width={48} height={48} alt="booking icon" />
                        <span className="label-2 text-center span">FSSAI CERTIFIED</span>
                    </a>

                    <div className="container">




                        <p className="section-subtitle label-2 text-center">Explore Exquisite Services in Every Bite!</p>

                        <h2 className="section-title headline-1 text-center">Services Offered</h2>

                        <ul className="grid-list" style={{ textAlign: "center", margin: "10px 0" }}
                        >



                            <li>
                                <div className="event-card has-before hover:shine">

                                    <div className="card-banner img-holder" style={{ width: "350", height: "450" }}>
                                        <Image src="./images/catering-5.jpeg" width={350} height={450} loading="lazy"
                                            alt="Flavour so good you’ll try to eat with your eyes." className="img-cover" />


                                    </div>

                                    <div className="card-content">
                                        <p className="card-subtitle label-2 text-center"> <Link href="catering-wedding"> Wedding Catering </Link></p>

                                        <h3 className="card-title title-2 text-center" style={{ fontSize: "20px" }}>
                                            Partnering with prestigious venues to provide comprehensive catering for various functions.

                                        </h3>
                                    </div>

                                </div>
                            </li>

                            <li>
                                <div className="event-card has-before hover:shine">

                                    <div className="card-banner img-holder" style={{ width: 350, height: 450 }}>
                                        <Image src="./images/catering-corporate.jpeg" width={350} height={450} loading="lazy"
                                            alt="Flavour so good you’ll try to eat with your eyes." className="img-cover" />


                                    </div>

                                    <div className="card-content">
                                        <p className="card-subtitle label-2 text-center"> <Link href="/catering-corporate"> Corporate Catering </Link></p>

                                        <h3 className="card-title title-2 text-center" style={{ fontSize: "20px" }}                                        >
                                            Professional catering services for corporate gatherings, conferences, and meetings.

                                        </h3>
                                    </div>

                                </div>
                            </li>

                            <li>
                                <div className="event-card has-before hover:shine">

                                    <div className="card-banner img-holder" style={{ width: 350, height: 450 }}>
                                        <Image src="./images/catering-outdoor.jpeg" width={350} height={450} loading="lazy"
                                            alt="Flavour so good you’ll try to eat with your eyes." className="img-cover" />


                                    </div>

                                    <div className="card-content">
                                        <p className="card-subtitle label-2 text-center"><Link href="/catering-venue"> Venue Catering</Link></p>

                                        <h3 className="card-title title-2 text-center" style={{ fontSize: "20px" }}                                        >
                                            Exquisite Customized Catering Solutions for Weddings, Receptions, and Large-Scale Events!
                                        </h3>
                                    </div>

                                </div>
                            </li>

                            <li>
                                <div className="event-card has-before hover:shine" style={{ flexBasis: "100%", textAlign: "center" }}                                >

                                    <div className="card-banner img-holder" style={{ width: 350, height: 450 }}>
                                        <Image src="./images/catering-home.jpeg" width={350} height={450} loading="lazy"
                                            alt="Flavour so good you’ll try to eat with your eyes." className="img-cover" />


                                    </div>

                                    <div className="card-content">
                                        <p className="card-subtitle label-2 text-center"><Link href="catering-home">Home Catering</Link></p>

                                        <h3 className="card-title title-2 text-center" style={{ fontSize: "20px" }}                                        >
                                            Partnering with prestigious venues to provide comprehensive catering for various functions.

                                        </h3>
                                    </div>

                                </div>
                            </li>

                        </ul>

                        <Link href="#" className="btn btn-primary">
                            <span className="text text-1">View Our Blog</span>

                            <span className="text text-2" aria-hidden="true">View Our Blog</span>
                        </Link>

                    </div>
                </section>


                <section className="section gallery text-center" aria-labelledby="gallery-label" id="gallery">
                    <div className="container">
                        <p className="label-2 section-subtitle" id="gallery-label">Gallery</p>
                        <h2 className="headline-1 section-title">Our Culinary Creations</h2>
                        <div className="gallery-grid">
                            <div className="gallery-item"><Image src="./images/dish1.jpg" alt="Dish 1" /></div>
                            <div className="gallery-item"><Image src="./images/dish2.jpg" alt="Dish 2" /></div>
                            <div className="gallery-item"><Image src="./images/dish3.jpg" alt="Dish 3" /></div>
                            <div className="gallery-item"><Image src="./images/dish4.jpg" alt="Dish 4" /></div>
                            <div className="gallery-item"><Image src="./images/dish5.jpg" alt="Dish 5" /></div>
                            <div className="gallery-item"><Image src="./images/dish6.jpg" alt="Dish 6" /></div>
                            <div className="gallery-item"><Image src="./images/dish7.jpg" alt="Dish 7" /></div>
                            <div className="gallery-item"><Image src="./images/dish8.jpg" alt="Dish 8" /></div>
                            <div className="gallery-item"><Image src="./images/dish9.jpg" alt="Dish 9" /></div>
                            <div className="gallery-item"><Image src="./images/dish1.jpg" alt="Dish 10" /></div>
                        </div>
                    </div>
                </section>



            </article>
        </main >


        <footer className="footer section has-bg-image text-center" style={{ backgroundImage: './images/footer-bg.jpg' }}>
            <div className="container">

                <div className="footer-top grid-list">

                    <div className="footer-brand has-before has-after">

                        <Link href="#" className="logo">
                            <Image src="./images/taftan_new_logo.png" width={160} height={50} loading="lazy" alt="taftan home" />
                        </Link>

                        <address className="body-4">
                            Opposite Novelty Cinema, Lalbagh, Lucknow 226001.
                            U.P. India
                        </address>

                        <a href="mailto:booking@taftan.com" className="body-4 contact-link">booking@taftan.com</a>

                        <a href="tel:+88123123456" className="body-4 contact-link">Booking Request : +917697333333</a>

                        <p className="body-4">

                        </p>

                        <div className="wrapper">
                            <div className="separator"></div>
                            <div className="separator"></div>
                            <div className="separator"></div>
                        </div>

                        <p className="title-1">Get News & Offers</p>

                        <p className="label-1">

                        </p>

                        <form action="" className="input-wrapper">
                            <div className="icon-wrapper">
                                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>

                                <input type="email" name="email_address" placeholder="Your email" className="input-field" />
                            </div>

                            <button type="submit" className="btn btn-secondary">
                                <span className="text text-1">Subscribe</span>

                                <span className="text text-2" aria-hidden="true">Subscribe</span>
                            </button>
                        </form>

                    </div>

                    <ul className="footer-list">

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Home</Link>
                        </li>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Menus</Link>
                        </li>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">About Us</Link>
                        </li>



                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Contact Us</Link>
                        </li>

                    </ul>



                    <ul className="footer-list">

                        <p className="label-2 section-subtitle">Social Handles</p>
                        <h2 className="headline-1 section-title"></h2>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Facebook</Link>
                        </li>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Instagram</Link>
                        </li>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Follow us on X</Link>
                        </li>

                        <li>
                            <Link href="#" className="label-2 footer-link hover-underline">Youtube</Link>
                        </li>

                        <p className="label-2 section-subtitle"></p>
                        <h2 className="headline-1 section-title"></h2>

                        <li>
                            <Link href="/sign-in?redirect=orders-received" className="label-2 footer-link hover-underline">Admin Login</Link>
                        </li>

                        <li>
                            <Link href="refund-policy.html " className="label-2 footer-link hover-underline">Refund Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; 2024 Taftan. All Rights Reserved
                    </p>
                </div>
            </div>
            <footer className="taftan-footer">
                <div className="marquee">
                    <ul className="social-links">
                        <li><p className="label-2 footer-link hover-underline" style={{ paddingTop: 10 }}> Follow us for more exclusive updates on </p></li>
                        <li>
                            <a href="https://facebook.com/taftan" target="_blank" title="Facebook">
                                <Image src="./images/facebook.png" alt="Facebook" width={24} height={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/taftan" target="_blank" title="Instagram">
                                <Image src="./images/instagram.png" alt="Instagram" width={24} height={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/taftan" target="_blank" title="Twitter">
                                <Image src="./images/twitter.png" alt="Twitter" width={24} height={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/917697333333" target="_blank" title="WhatsApp">
                                <Image src="./images/whatsapp-gold.png" alt="WhatsApp" width={24} height={24} />
                            </a>
                        </li>

                    </ul>
                </div>
            </footer>

        </footer>


        <a href="#top" className="back-top-btn active" aria-label="back to top" data-back-top-btn>
            <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
        </a>


        {/* <script src="./script.js"></script>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
    </>;
}