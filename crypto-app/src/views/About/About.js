import React, { useState } from "react";
import "./About.css";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";

const AboutUs = () => {
    return (
        <div className="container-about-us">
            <div className="glow"></div>
            <div className="container-about-section-1">
                <div className="about-section-1-title">
                    <h5>Get to Know CoinMarketCap Team</h5>
                </div>
                <div className="about-section-1-p">
                    <p>
                        CoinMarketCap Team is one of the top algorithmic market makers and <br /> liquidity providers in the crypto space.
                    </p>
                </div>
            </div>
            <Fade delay={300} direction="top" duration={1000}>
                <div className="container-about-section-2">
                    <div className="about-section-2-left">
                        <div className="about-left-p first-left-p">
                            <p>CoinMarketCap Team is a crypto-native market maker founded by two childhood best friends Martins Benkitis and Edgars Laimite.</p>
                        </div>

                        <div className="about-left-p">
                            <p>
                                In 2017, they noticed a big price disparity in Bitcoin markets across the world and identified an opportunity to provide
                                everyone with fair crypto-asset pricing. They were soon joined by the third co-founder and CTO, Kriss Pujats.
                            </p>
                        </div>

                        <div className="about-left-p">
                            <p>
                                Now, CoinMarketCap Team is one of the leading algorithmic crypto trading firms with a focus on making crypto markets more
                                efficient and liquid.
                            </p>
                        </div>

                        <div className="about-left-p">
                            <p>We have a solid team of ~30 talented professionals, and we continue growing in team size, market volume, and global reach.</p>
                        </div>
                    </div>
                    <div className="about-section-2-right">
                        <div className="container-img-about-section-2"></div>
                    </div>
                </div>
            </Fade>

            <Fade triggerOnce={true} delay={500} direction="top">
                <div className="section-grid">
                    <div className="container-grid">
                        <div className="grid">
                            <h5>~$100 billion</h5>
                            <p>cumulative trading volume to date</p>
                        </div>
                        <div className="grid">
                            <h5>0.8%</h5>
                            <p>of the global crypto spot trading volume</p>
                        </div>
                        <div className="grid">
                            <h5>~30</h5>
                            <p>Gravity Teammates</p>
                        </div>
                        <div className="grid">
                            <h5>25+</h5>
                            <p>leading global and local crypto exchanges</p>
                        </div>
                        <div className="grid">
                            <h5>2017</h5>
                            <p>start, crypto-natives</p>
                        </div>
                        <div className="grid">
                            <h5>1,200+</h5>
                            <p>crypto-asset pairs</p>
                        </div>
                        <div className="grid">
                            <h5>24/7</h5>
                            <p>liquidity</p>
                        </div>
                        <div className="grid">
                            <h5>5 billion+</h5>
                            <p>trades done to date</p>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default AboutUs;
