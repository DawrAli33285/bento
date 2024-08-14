import "../ownlink.css";

export default function OwnLink() {
    return (
        <div className="own-container">
            <div className="headings-group">
                <h1>Your unique link.</h1>
                <h2>And btw, the good ones are still free.</h2>
            </div>
            <div className="own-marq-container">
                <h1 className="subheading-marq">bento.me/</h1>
                <div className="vertical-carousel">
                    <div className="carousel-content">
                        {[
                            "tito", "selim", "mary", "valerie", "mugeeb", "silvan", "adeline",
                            "dennis", "michele", "eike", "may-li", "clara", "tito", "selim",
                            "mary", "valerie", "mugeeb", "silvan", "adeline", "dennis",
                            "michele", "eike", "may-li", "clara"
                        ].map((name, index) => (
                            <h1 className="subheading-1-b" key={index}>{name}</h1>
                        ))}
                        {[
                            "tito", "selim", "mary", "valerie", "mugeeb", "silvan", "adeline",
                            "dennis", "michele", "eike", "may-li", "clara", "tito", "selim",
                            "mary", "valerie", "mugeeb", "silvan", "adeline", "dennis",
                            "michele", "eike", "may-li", "clara"
                        ].map((name, index) => (
                            <h1 className="subheading-1-b" key={index + 24}>{name}</h1>
                        ))}
                    </div>
                    <div className="fade-out-top"></div>
                    <div className="fade-out-bottom"></div>
                </div>
                <div className="div-block-32-copy">
                    <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2.png" loading="lazy" width="390" sizes="(max-width: 991px) 100vw, 40vw" alt="" srcset="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2-p-800.png 800w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2-p-1080.png 1080w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2.png 1170w" className="image-52-copy" />
                </div>
                <div className="div-block-35-copy">
                    <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e91b425b939f59bea307ec_substackwidget2.png" loading="lazy" width="175" sizes="(max-width: 479px) 100vw, (max-width: 767px) 39vw, (max-width: 991px) 24vw, 19vw" alt="" srcset="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e91b425b939f59bea307ec_substackwidget2-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e91b425b939f59bea307ec_substackwidget2.png 525w" className="image-51" />
                </div>
                <div className="div-block-33-copy">
                    <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter.png" loading="lazy" width="175" sizes="(max-width: 991px) 100vw, 19vw" alt="" srcset="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter.png 525w" className="image-50-copy" />
                </div>
            </div>
            <div className="main-link-container">
                <a href="http://bento.me/signup?ref=techcrunch" className="link-block-340 w-inline-block">
                    <div className="text-block-28">Create Your Bento</div>
                </a>
            </div>
        </div>
    );
}
