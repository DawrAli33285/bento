import React from 'react';
import "../marquee.css";

export default function Marquee() {
    const icons = [
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e16e32a22e92c45639_iconproducthunt.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e28e33361fe6608850_icondiscord.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e2bea4fedeb4f83d43_iconmedium.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e2a46bc01c675922ac_iconwebflow.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e257c3c1338e638279_iconreddit.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e25033cc36b11a4bda_iconbuymeacoffee.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e22e70ce51de717701_icontwitch.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e2e356c51e9e7a7976_iconbehance.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e2ed2c69168196fb91_iconpinterest.svg",
        "https://cdn.prod.website-files.com/6335b33630f88833a92915fc/638e17e2170dc3848f4b014f_icondevto.svg",
    ];

    return (
        <div className="marquee-container">
            <h1>And many more</h1>
            <div className="horizontal-carousel">
                <div className="horizontal-carousel-content">
                    {icons.concat(icons).map((src, index) => (
                        <div key={index} className="icon-container">
                            <img src={src} loading="lazy" alt="" />
                        </div>
                    ))}
                </div>
                <div className="gradient-left"></div>
                <div className="gradient-right"></div>
            </div>
        </div>
    );
}
