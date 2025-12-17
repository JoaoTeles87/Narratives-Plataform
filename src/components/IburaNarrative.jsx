import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './IburaNarrative.module.css';
import ImageCrossfade from './ImageCrossfade.jsx';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    } else {
                        entry.target.classList.remove(styles.visible); // Reversible transition
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(`.${styles.reveal}`);
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);
};

const IburaNarrative = ({ onBack, onNavigate }) => {
    const [showAnimation, setShowAnimation] = useState(true);
    // const [stickyStage, setStickyStage] = useState(0); // Unused now
    const headerRef = useRef(null);
    const overlayRef = useRef(null);
    const stickyRef = useRef(null);
    const titleRef = useRef(null);
    const scrollTextsRef = useRef(null);

    useScrollReveal();

    // Efeito da Escadaria
    useEffect(() => {
        if (!stickyRef.current) return;

        const textsContainer = stickyRef.current.querySelector(`.${styles.scrollingTexts}`);
        if (!textsContainer) return;

        const blocks = textsContainer.querySelectorAll(`.${styles.textBlock}`);
        if (!blocks.length) return;

        // Reset any previous styles
        // Hide all initially with opacity 0 and pushed down
        gsap.set(blocks, { opacity: 0, y: 50, zIndex: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stickyRef.current,
                start: "top top",      // Lock when top hits top
                end: "+=2500",         // Duration of pin
                pin: true,
                scrub: true,           // Link smooth scroll
                anticipatePin: 1,
                refreshPriority: 1     // Calculate this FIRST since it pushes following content
            },
        });

        blocks.forEach((block, index) => {
            // Sequence: Enter -> Hold -> Exit
            tl.to(block, { opacity: 1, y: 0, zIndex: 10, duration: 1, ease: "power2.out" }) // Fade In
                .to(block, { duration: 3 }) // Hold
                .to(block, { opacity: 0, y: -50, zIndex: 1, duration: 1, ease: "power2.in" }) // Fade Out
                .set(block, { zIndex: 0 }); // Explicitly reset z-index after exit
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Header Effects
            if (headerRef.current && overlayRef.current) {
                const headerHeight = headerRef.current.offsetHeight;

                // Opacity for overlay
                const opacity = Math.min(scrollY / (headerHeight * 0.8), 1);
                overlayRef.current.style.opacity = opacity;

                // "Smash/Press" effect: Scale down the header
                // const scale = Math.max(1 - scrollY * 0.0005, 0.9);
                // headerRef.current.style.transform = `scale(${scale})`;
                // headerRef.current.style.transformOrigin = 'center top';
            }

            // Sticky Section Logic - Removed as per single background request
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Parallax effect for the header background
        gsap.to(headerRef.current, {
            backgroundPositionY: '120%',
            ease: 'none',
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Title movement effect
        gsap.to(titleRef.current, {
            y: 500, // Move the title down by 100px
            ease: 'none',
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, []);

    return (
        <div className={styles.container}>
            {showAnimation && (
                <div className={styles.introAnimationElement}>
                    <span>▼</span>
                </div>
            )}

            <div className={styles.backButton} onClick={onBack} title="Voltar ao Mapa">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </div>

            <header ref={headerRef} className={styles.header}>
                <div ref={overlayRef} className={styles.headerOverlay}></div>
                <div className={styles.headerCaption}>Vista aérea do bairro do Ibura, 2024. (Fonte: Sennor Ramos)</div>

                <div ref={titleRef}>
                    <p className={styles.subtitle}>ZEIS de morro</p>
                    <h1 className={styles.title}>IBURA</h1>
                </div>
            </header>

            <div className={styles.contentSection}>
                {/* Section 1: History & Airport */}
                <div className={styles.row}>
                    <div className={`${styles.textBox} ${styles.reveal}`}>
                        <p>
                            A ocupação do Ibura deu-se início na década de 1940, período da Segunda Guerra Mundial, e o local, onde hoje é o bairro, chegou a abrigar uma pista de pousos e decolagens conhecida como Ibura Field.
                        </p>
                        <p>
                            Essa pista estava localizada desde a Av. Barão de Souza Leão, em Boa Viagem, até a atual localidade do Parque da Aeronáutica. Foi o Ibura Field que acabou dando origem ao atual Aeroporto Internacional dos Guararapes.
                        </p>
                    </div>
                    <div className={`${styles.imageBox} ${styles.reveal}`}>
                        <div className={styles.imageWrapper}>
                            <img src="/ibura (1).png" alt="Ibura Antigo - Pista de Pouso" />
                            <div className={styles.imageOverlayCaption}>Campo de pouso no Ibura, Zona Sul do Recife. (Fonte: Jornal Digital Recife).</div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Population & Origins */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={`${styles.textBox} ${styles.reveal}`}>
                        <p>
                            Com uma população de mais de 50 mil habitantes e considerado o terceiro maior bairro do Recife, o Ibura surgiu ainda no século XIX e, antes de ser o que é hoje, era um engenho de cana-de-açúcar.
                        </p>
                    </div>
                    <div className={`${styles.imageBox} ${styles.reveal}`}>
                        <div className={styles.imageWrapper}>
                            <img src="/ibura (2).png" alt="Ibura Antigo - Engenho" />
                            <div className={styles.imageOverlayCaption}>Campo de pouso no Ibura, Zona Sul do Recife. (Fonte: Jornal Digital Recife).</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Sticky Section Wrapper to isolate pinning context */}
            <div style={{ position: 'relative', zIndex: 5 }}>
                <div ref={stickyRef} className={styles.stickySection}>
                    <div className={styles.stickyImageContainer}>
                        {/* Single Background: Real Photo (Staircase) */}
                        <img
                            src="/FOTO 46 Rua Edmar Amorim Fernandes - UR10 - Ibura2014 FOTO AURELINA MOUA.jpg"
                            alt="Foto escadaria do Ibura"
                            className={styles.stickyImage}
                            style={{ opacity: 1 }} // Always visible as background
                        />
                        <div className={styles.stickyImageCaption}>46 Rua Edmar Amorim Fernandes - UR10 - Ibura 2014, AURELINA MOUA.</div>
                    </div>

                    <div ref={scrollTextsRef} className={styles.scrollingTexts}>
                        <div className={styles.textBlock}>
                            <h3>Topografia e Ocupação</h3>
                            <p>O relevo acidentado do Ibura apresenta desafios significativos para a ocupação urbana, com muitas construções em áreas de encosta.</p>
                        </div>
                        <div className={styles.textBlock}>
                            <h3>Áreas de Risco</h3>
                            <p>A densidade das construções em áreas de alta declividade aumenta a vulnerabilidade geológica.</p>
                        </div>
                        <div className={styles.textBlock}>
                            <h3>Dinâmica do Solo</h3>
                            <p>Em períodos de chuva intensa, o solo encharcado torna-se instável, suscetível a movimentos de massa.</p>
                        </div>
                        <div className={styles.textBlock}>
                            <h3>A Realidade</h3>
                            <p>O Jardim Monte Verde exemplifica os riscos reais enfrentados pela população, onde o deslizamento deixou marcas profundas na comunidade.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Break - Minimal Spacer to force paint layer separation */}
            <div style={{ height: '1px', width: '100%', backgroundColor: '#003366' }}></div>


            {/* ===== SPACER PARA PREVENIR SOBREPOSIÇÃO (Também comentado) ===== */}
            {/* <div style={{ height: '50vh', width: '100%', position: 'relative', zIndex: 1 }}></div> */}

            {/* ===== CROSSFADE: Agora vem logo após a introdução histórica ===== */}
            <ImageCrossfade
                image1="/ibura (9).png"
                image2="/ibura (10).png"
                image3="/ibura (11).png"
                alt1="Ilustração do deslizamento de terra no Ibura"
                alt2="Foto real do deslizamento de terra no Ibura"
                labelStart="Desenho"
                labelEnd="Realidade"
            />

            <div className={styles.contentSection}>
                {/* Section 8: Current Situation */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={`${styles.textBox} ${styles.reveal}`}>
                        <p>
                            Essa comunidade tem registros de deslizamentos de terra e mortes desde 1987. A luta por moradia digna e segura continua sendo a principal pauta dos moradores.
                        </p>
                    </div>
                    <div className={`${styles.imageBox} ${styles.reveal}`}>
                        <div className={styles.imageWrapper}>
                            <img src="/ibura (8).png" alt="Obras de Contenção" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footerNavigation}>
                <button className={styles.navButton} onClick={() => onNavigate('casa-amarela')}>
                    Próxima História: Casa Amarela →
                </button>
            </div>
        </div>
    );
};

export default IburaNarrative;