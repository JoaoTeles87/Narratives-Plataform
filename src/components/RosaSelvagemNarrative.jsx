import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RosaSelvagemNarrative.module.css';

gsap.registerPlugin(ScrollTrigger);

const RosaSelvagemNarrative = ({ onBack, onNavigate }) => {
    const [showAnimation, setShowAnimation] = useState(true);
    const headerRef = useRef(null);
    const overlayRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current || !overlayRef.current) return;

            const scrollY = window.scrollY;
            const headerHeight = headerRef.current.offsetHeight;

            const opacity = Math.min(scrollY / (headerHeight * 0.8), 1);

            overlayRef.current.style.opacity = opacity;
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

            <header ref={headerRef} className={styles.header}>
                <div ref={overlayRef} className={styles.headerOverlay}></div>

                <div className={styles.backButton} onClick={onBack} title="Voltar ao Mapa">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </div>
                <div ref={titleRef}>
                    <p className={styles.subtitle}>ZEIS de morro</p>
                    <h1 className={styles.title}>ROSA SELVAGEM</h1>
                </div>
            </header>

            <div className={styles.contentSection}>
                {/* Section 1: Location & Growth */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            Localizada dentro do bairro da Várzea, a comunidade Rosa Selvagem foi fruto de ocupações espontâneas que ganharam forma ao longo do século XX, acompanhando o crescimento populacional e a migração de famílias de baixa renda que buscavam alternativas de moradia próximas às oportunidades de estudo e trabalho da Zona Oeste.
                        </p>
                        <p>
                            Instalada em uma área de encosta com forte inclinação, Rosa Selvagem cresceu de maneira desordenada, com moradias distribuídas ao longo dos aclives e pequenas vias que funcionam como o único elo entre o alto e a parte plana da Várzea.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/rosa-selvagem_2.png" alt="Vista da comunidade Rosa Selvagem" />
                    </div>
                </div>

                {/* Section 2: Improvements */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Além das obras estruturais, o programa implementou melhorias no espaço urbano que incluíram requalificação de escadarias, criação de áreas de convivência, pintura de fachadas e mobilização comunitária.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/rosa_selvagem_3.png" alt="Melhorias urbanas em Rosa Selvagem" />
                    </div>
                </div>

                {/* Section 3: Resistance & Identity */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            Embora tenha um registro histórico mais escasso, Rosa Selvagem traduz a realidade de boa parte dos territórios populares da cidade: comunidades que se fortaleceram a partir da própria resistência de seus habitantes e que, mesmo diante da negligência do Estado, construíram laços, identidades e modos de vida que fazem parte do tecido urbano do Recife.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/rosa_selvagem_4.png" alt="Obra de contenção na comunidade Rosa Selvagem" />
                        <p className={styles.imageCaption}>Obra de contenção na comunidade Rosa Selvagem. (Foto: Andréa Rêgo Barros/PCR)</p>
                    </div>
                </div>

            </div>

            <div className={styles.footerNavigation}>
                <button className={styles.navButton} onClick={() => onNavigate('ibura')}>
                    Próxima História: Ibura →
                </button>
            </div>
        </div>
    );
};

export default RosaSelvagemNarrative;
