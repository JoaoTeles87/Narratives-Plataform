import React, { useEffect, useState, useRef } from 'react';
import styles from './IburaNarrative.module.css';

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
    const [stickyStage, setStickyStage] = useState(0);
    const headerRef = useRef(null);
    const overlayRef = useRef(null);
    const stickyRef = useRef(null);

    useScrollReveal();

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
                const scale = Math.max(1 - scrollY * 0.0005, 0.9);
                headerRef.current.style.transform = `scale(${scale})`;
                headerRef.current.style.transformOrigin = 'center top';
            }

            // Sticky Section Logic
            if (stickyRef.current) {
                const rect = stickyRef.current.getBoundingClientRect();
                const sectionHeight = rect.height;
                const windowHeight = window.innerHeight;

                if (rect.top <= 0 && rect.bottom >= windowHeight) {
                    const scrolled = Math.abs(rect.top);
                    const totalScrollable = sectionHeight - windowHeight;
                    const progress = scrolled / totalScrollable;

                    // Define stages based on scroll progress
                    // Adjusted thresholds to align with text blocks:
                    // Block 1 (Map) is at ~15-20%
                    // Block 2 (Risks/Arrows) is at ~50%
                    // Block 3 (Tragedy/Photo) is at ~80%

                    if (progress < 0.30) {
                        setStickyStage(0); // Map
                    } else if (progress < 0.40) {
                        setStickyStage(1); // Illustration ON, Arrows OFF
                    } else if (progress < 0.65) {
                        setStickyStage(1.5); // Illustration ON, Arrows ON
                    } else {
                        setStickyStage(2); // Photo ON
                    }
                } else if (rect.top > 0) {
                    setStickyStage(0);
                } else if (rect.bottom < windowHeight) {
                    setStickyStage(2);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

                <h1 className={styles.title}>IBURA</h1>
                <p className={styles.subtitle}>27 de Março</p>
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
                        <img src="/ibura (1).png" alt="Ibura Antigo - Pista de Pouso" />
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
                        <img src="/ibura (2).png" alt="Ibura Antigo - Engenho" />
                    </div>
                </div>

                {/* Sticky Section: Map -> Illustration -> Arrows -> Photo */}
                <div ref={stickyRef} className={styles.stickySection}>
                    <div className={styles.stickyImageContainer}>
                        {/* Layer 1: Map (Base) - Stage 0 */}
                        <img
                            src="/ibura (3).png"
                            alt="Mapa do Ibura"
                            className={`${styles.stickyImage} ${styles.active}`}
                        />

                        {/* Layer 2: Illustration (Overlay) - Stage 1+ */}
                        <img
                            src="/ibura (4).png"
                            alt="Ilustração de Risco"
                            className={styles.stickyImage}
                            style={{ opacity: stickyStage >= 1 ? 1 : 0 }}
                        />

                        {/* Layer 2.5: Arrows (Overlay) - Stage 1.5 only */}
                        <img
                            src="/ibura (6).png"
                            alt="Setas de Deslizamento"
                            className={styles.stickyImage}
                            style={{ opacity: (stickyStage >= 1.5 && stickyStage < 2) ? 1 : 0 }}
                        />

                        {/* Layer 3: Real Photo (Overlay) - Stage 2+ */}
                        <img
                            src="/ibura (5).png"
                            alt="Foto Jardim Monte Verde"
                            className={styles.stickyImage}
                            style={{ opacity: stickyStage >= 2 ? 1 : 0 }}
                        />
                    </div>

                    <div className={styles.scrollingTexts}>
                        {/* Stage 0 Text */}
                        <div className={`${styles.textBlock} ${styles.reveal}`} style={{ marginTop: '20vh' }}>
                            <h3>Divisão e Comunidades</h3>
                            <p>
                                O bairro do Ibura é dividido em duas partes: Ibura de Cima (a oeste) e Ibura de Baixo (a leste). A divisão se dá pela diferença de relevo marcada por uma barreira muito íngreme.
                            </p>
                            <p>
                                Somando um total de 21 comunidades, as UR’s (Unidades Residenciais) representam a maior parte do bairro, localizadas no Ibura de Cima.
                            </p>
                        </div>

                        {/* Stage 1/1.5 Text */}
                        <div className={`${styles.textBlock} ${styles.reveal}`} style={{ marginTop: '70vh' }}>
                            <h3>Riscos e Desafios</h3>
                            <p>
                                O Ibura enfrenta historicamente desafios envolvendo a urbanização e especialmente deslizamentos de terra.
                            </p>
                            <p>
                                Entre maio e junho de 2022, o Recife teve o maior volume de chuvas do ano, resultando na maior tragédia do século no estado.
                            </p>
                        </div>

                        {/* Stage 2 Text */}
                        <div className={`${styles.textBlock} ${styles.reveal}`} style={{ marginTop: '70vh' }}>
                            <h3>A Tragédia de 2022</h3>
                            <p>
                                A comunidade de Jardim Monte Verde foi a que mais registrou mortes: 20 vítimas fatais, sendo 17 na mesma rua.
                            </p>
                            <p>
                                Somente em 2023, um ano após a tragédia, foram anunciadas obras de contenção de encostas mais efetivas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 8: Current Situation */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={`${styles.textBox} ${styles.reveal}`}>
                        <p>
                            Essa comunidade tem registros de deslizamentos de terra e mortes desde 1987. A luta por moradia digna e segura continua sendo a principal pauta dos moradores.
                        </p>
                    </div>
                    <div className={`${styles.imageBox} ${styles.reveal}`}>
                        <img src="/ibura (8).png" alt="Obras de Contenção" />
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
