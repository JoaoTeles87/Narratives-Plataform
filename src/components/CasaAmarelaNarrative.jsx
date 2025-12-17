import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CasaAmarelaNarrative.module.css';

gsap.registerPlugin(ScrollTrigger);

const CasaAmarelaNarrative = ({ onBack, onNavigate }) => {
    const [showAnimation, setShowAnimation] = useState(true);

    // Header Refs
    const headerRef = useRef(null);
    const overlayRef = useRef(null);
    const titleRef = useRef(null);

    // Section Refs
    const act1Ref = useRef(null); // Origens
    const act2Ref = useRef(null); // Mercado (Slider)
    const act3Ref = useRef(null); // Resistência (Acumulativo)

    // Market Specific Refs
    const marketMaskRef = useRef(null); // Imagem "Antes" (c/ ClipPath)
    const marketHandleRef = useRef(null); // Linha divisória

    // --- SETUP GERAL ---
    useEffect(() => {
        const timer = setTimeout(() => setShowAnimation(false), 3000);

        // Header Parallax
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

        // Title Movement
        gsap.to(titleRef.current, {
            y: 500,
            ease: 'none',
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        const handleScroll = () => {
            if (!headerRef.current || !overlayRef.current) return;
            const scrollY = window.scrollY;
            const headerHeight = headerRef.current.offsetHeight;
            const opacity = Math.min(scrollY / (headerHeight * 0.8), 1);
            overlayRef.current.style.opacity = opacity;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- ACT 1: ORIGENS & FORTE (Crossfade Maps + Textos) ---
    useEffect(() => {
        if (!act1Ref.current) return;

        // Elements
        const mapOld = act1Ref.current.querySelector('.img-map-old');
        const mapSat = act1Ref.current.querySelector('.img-map-sat');
        const houseImg = act1Ref.current.querySelector('.img-house');

        const text1 = act1Ref.current.querySelector('.txt-1');
        const text2 = act1Ref.current.querySelector('.txt-2');
        const text3 = act1Ref.current.querySelector('.txt-3');

        // Initial States
        gsap.set([text1, text2, text3], { opacity: 0, y: 50 });
        gsap.set(mapSat, { opacity: 0 }); // Satélite invisível
        gsap.set(houseImg, { opacity: 0 }); // Casa invisível

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: act1Ref.current,
                start: "top top",
                end: "+=4000",
                pin: true,
                scrub: true,
                anticipatePin: 1
            },
        });

        // Sequência
        // 1. Texto 1 (Origem)
        tl.to(text1, { opacity: 1, y: 0, duration: 1 })
            .to(text1, { duration: 2 }) // Hold
            .to(text1, { opacity: 0, y: -50, duration: 1 });

        // 2. Transição Mapa Antigo -> Satélite + Texto 2
        tl.to(mapOld, { opacity: 0, duration: 2 }, "changeMap")
            .to(mapSat, { opacity: 1, duration: 2 }, "changeMap")
            .to(text2, { opacity: 1, y: 0, duration: 1 }, "-=1")
            .to(text2, { duration: 2 }) // Hold
            .to(text2, { opacity: 0, y: -50, duration: 1 });

        // 3. Transição Satélite -> Casa Amarela + Texto 3 (Nome)
        tl.to(mapSat, { opacity: 0, duration: 2 }, "changeHouse")
            .to(houseImg, { opacity: 1, duration: 2 }, "changeHouse")
            .to(text3, { opacity: 1, y: 0, duration: 1 }, "-=1")
            .to(text3, { duration: 3 }); // Hold final

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    }, []);

    // --- ACT 2: O MERCADO (Scroll-controlled Slider) ---
    useEffect(() => {
        if (!act2Ref.current) return;

        const introText = act2Ref.current.querySelector('.intro-text');
        const outroText = act2Ref.current.querySelector('.outro-text');

        // Initial States
        gsap.set([introText, outroText], { opacity: 0, y: 30, zIndex: 10 });
        // Handle e Mask começam no "Antes" (Esquerda visível, mask full)
        gsap.set(marketMaskRef.current, { clipPath: 'inset(0 0% 0 0)' });
        gsap.set(marketHandleRef.current, { left: '0%' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: act2Ref.current,
                start: "top top",
                end: "+=5000", // Longo para dar controle suave ao slider
                pin: true,
                scrub: 0.5, // Suavidade extra no slider
                anticipatePin: 1
            },
        });

        // 1. Introdução
        tl.to(introText, { opacity: 1, y: 0, duration: 2 })
            .to(introText, { duration: 3 })
            .to(introText, { opacity: 0, y: -30, duration: 2 });

        // 2. O SLIDER (A mágica acontece aqui)
        // Movemos a máscara de 0% (tudo visível) para 100% (nada visível) revelando a imagem de baixo
        // Simultaneamente movemos o handle
        tl.addLabel("sliderStart");
        tl.to(marketMaskRef.current, {
            clipPath: 'inset(0 100% 0 0)',
            duration: 10,
            ease: "none"
        }, "sliderStart");

        tl.to(marketHandleRef.current, {
            left: '100%',
            duration: 10,
            ease: "none"
        }, "sliderStart");

        // 3. Conclusão
        tl.to(outroText, { opacity: 1, y: 0, duration: 2 })
            .to(outroText, { duration: 3 });

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    }, []);

    // --- ACT 3: RESISTÊNCIA E URBANIZAÇÃO (Acumulativo) ---
    useEffect(() => {
        if (!act3Ref.current) return;

        const blocks = act3Ref.current.querySelectorAll(`.${styles.textBlock}`);
        gsap.set(blocks, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: act3Ref.current,
                start: "top top",
                end: "+=4000",
                pin: true,
                scrub: true,
                anticipatePin: 1
            },
        });

        // Bloco 1 (Topo)
        tl.to(blocks[0], { opacity: 1, y: 0, duration: 1 })
            .to({}, { duration: 2 }); // Pausa

        // Bloco 2 (Centro)
        tl.to(blocks[1], { opacity: 1, y: 0, duration: 1 })
            .to({}, { duration: 2 }); // Pausa

        // Bloco 3 (Fundo)
        tl.to(blocks[2], { opacity: 1, y: 0, duration: 1 })
            .to({}, { duration: 4 }); // Pausa Longa

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    }, []);

    return (
        <div className={styles.container}>
            {showAnimation && <div className={styles.introAnimationElement}><span>▼</span></div>}

            <div className={styles.backButton} onClick={onBack} title="Voltar ao Mapa">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </div>

            <header ref={headerRef} className={styles.header}>
                <div ref={overlayRef} className={styles.headerOverlay}></div>
                <div className={styles.headerCaption}>Vista aérea do bairro de Casa Amarela, 2024. (Fonte: Sennor Ramos)</div>
                <div ref={titleRef}>
                    <p className={styles.subtitle}>ZEIS de morro</p>
                    <h1 className={styles.title}>CASA AMARELA</h1>
                </div>
            </header>

            {/* --- ACT 1: ORIGENS --- */}
            <div ref={act1Ref} className={styles.stickySection}>
                <div className={styles.stickyImageContainer}>
                    {/* Camadas de Imagens para Crossfade */}
                    <img src="/casa_amarela_2.png" className={`${styles.stickyImage} img-map-old`} alt="Mapa 1629" style={{ zIndex: 1 }} />
                    <img src="/casa_amarela_3.png" className={`${styles.stickyImage} img-map-sat`} alt="Satélite 2025" style={{ zIndex: 2 }} />
                    <img src="/casa_amarela_4.png" className={`${styles.stickyImage} img-house`} alt="Casa Amarela Original" style={{ zIndex: 3 }} />
                </div>

                <div className={styles.scrollingTexts}>
                    <div className={`${styles.textBlock} txt-1`}>
                        <p>Casa Amarela se originou de um povoamento ao redor do Arraial Velho do Bom Jesus, logo após a invasão holandesa no Recife, no século XVIII.</p>
                        <p className={styles.caption}>Forte Real do Arraial Velho do Bom Jesus</p>
                    </div>
                    <div className={`${styles.textBlock} txt-2`}>
                        <p>A região evoluiu drasticamente ao longo dos séculos, transformando-se de um ponto estratégico de defesa em um denso aglomerado urbano.</p>
                        <p className={styles.caption}>Comparativo: 1629 vs 2025</p>
                    </div>
                    <div className={`${styles.textBlock} txt-3`}>
                        <p>Seu nome vem da antiga propriedade do comendador Joaquim dos Santos Oliveira. Sua casa, pintada de ocre amarelo, tornou-se referência geográfica e batizou o bairro.</p>
                    </div>
                </div>
            </div>

            <div style={{ height: '2vh', background: '#003366' }}></div>

            {/* --- ACT 2: O MERCADO (Slider) --- */}
            <div ref={act2Ref} className={styles.stickySection}>
                <div className={styles.marketWrapper}>
                    {/* Imagem "Depois" (Fica por baixo) */}
                    <img src="/casa_amarela_6.png" className={styles.marketImageAfter} alt="Mercado Atual" />

                    {/* Imagem "Antes" (Fica por cima com Máscara) */}
                    <div ref={marketMaskRef} className={styles.marketImageBefore}>
                        <img src="/casa_amarela_7.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mercado Antigo" />
                        <div className={`${styles.marketLabel} ${styles.labelBefore}`}>1930</div>
                    </div>

                    {/* Handle que corre a tela */}
                    <div ref={marketHandleRef} className={styles.marketHandle}></div>

                    <div className={`${styles.marketLabel} ${styles.labelAfter}`}>2025</div>
                </div>

                <div className={styles.scrollingTexts}>
                    <div className={`${styles.textBlock} intro-text`}>
                        <p>O Mercado de Casa Amarela, inaugurado em 1930, é o coração pulsante do comércio local e um dos mais antigos da cidade.</p>
                        <p style={{ fontSize: '0.9rem', color: '#ffcc00' }}>▼ Role para ver a transformação</p>
                    </div>
                    <div className={`${styles.textBlock} outro-text`}>
                        <p>Apesar das mudanças arquitetônicas e do crescimento do entorno, o mercado permanece como símbolo de vitalidade e tradição.</p>
                    </div>
                </div>
            </div>

            <div style={{ height: '2vh', background: '#003366' }}></div>

            {/* --- ACT 3: RESISTÊNCIA & URBANIZAÇÃO (Acumulativo) --- */}
            <div ref={act3Ref} className={styles.stickySection}>
                <div className={styles.stickyImageContainer}>
                    <img src="/casa_amarela_10.png" className={styles.stickyImage} alt="Skyline Casa Amarela" />
                </div>

                <div className={styles.scrollingTexts}>
                    <div className={`${styles.textBlock} ${styles.textBlockTop}`}>
                        <p>Durante a Ditadura Militar, o bairro foi palco de resistência. Em 1975, o Movimento Terras de Ninguém, apoiado pela Igreja, lutou contra a cobrança indevida de aluguéis do chão por famílias tradicionais.</p>
                    </div>

                    <div className={`${styles.textBlock} ${styles.textBlockCenter}`}>
                        <p>Com a Lei dos Doze Bairros, buscou-se proteger a área, mas o resultado foi contraditório: a "redefinição" expulsou favelas para os morros e liberou a parte plana para grandes torres.</p>
                    </div>

                    <div className={`${styles.textBlock} ${styles.textBlockBottom}`}>
                        <p>Hoje, Casa Amarela vive essa dualidade: entre a especulação imobiliária vertical e a resistência horizontal de sua identidade popular e histórica.</p>
                    </div>
                </div>
            </div>

            <div className={styles.footerNavigation}>
                <button className={styles.navButton} onClick={() => onNavigate('rosa-selvagem')}>
                    Próxima História: Rosa Selvagem →
                </button>
            </div>
        </div>
    );
};

export default CasaAmarelaNarrative;
