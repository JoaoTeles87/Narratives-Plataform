import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RosaSelvagemNarrative.module.css';

gsap.registerPlugin(ScrollTrigger);

const RosaSelvagemNarrative = ({ onBack, onNavigate }) => {
    const [showAnimation, setShowAnimation] = useState(true);

    // Refs
    const headerRef = useRef(null);
    const overlayRef = useRef(null);
    const titleRef = useRef(null);

    // Section Refs
    const section1Ref = useRef(null); // História
    const section2Ref = useRef(null); // Obras/Urbanização
    const section3Ref = useRef(null); // Conclusão

    // --- SETUP GERAL (Header Parallax & Intro) ---
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


    // --- SEÇÃO 1: HISTÓRIA E ORIGENS (Sequencial: Entra -> Sai) ---
    useEffect(() => {
        if (!section1Ref.current) return;
        const textsContainer = section1Ref.current.querySelector(`.${styles.scrollingTexts}`);
        const blocks = textsContainer.querySelectorAll(`.${styles.textBlock}`);

        gsap.set(blocks, { opacity: 0, y: 50, zIndex: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section1Ref.current,
                start: "top top",
                end: "+=2500", // Comprimento da rolagem
                pin: true,
                scrub: true,
                anticipatePin: 1
            },
        });

        blocks.forEach((block) => {
            tl.to(block, { opacity: 1, y: 0, zIndex: 10, duration: 1 }) // Fade In
                .to(block, { duration: 3 }) // Hold
                .to(block, { opacity: 0, y: -50, zIndex: 1, duration: 1 }) // Fade Out
                .set(block, { zIndex: 0 });
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);


    // --- SEÇÃO 2: URBANIZAÇÃO E OBRAS (Sequencial: Entra -> Sai) ---
    useEffect(() => {
        if (!section2Ref.current) return;
        const textsContainer = section2Ref.current.querySelector(`.${styles.scrollingTexts}`);
        const blocks = textsContainer.querySelectorAll(`.${styles.textBlock}`);

        gsap.set(blocks, { opacity: 0, y: 50, zIndex: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section2Ref.current,
                start: "top top",
                end: "+=3500", // Um pouco mais longo pois tem 3 blocos
                pin: true,
                scrub: true,
                anticipatePin: 1
            },
        });

        blocks.forEach((block) => {
            tl.to(block, { opacity: 1, y: 0, zIndex: 10, duration: 1 }) // Fade In
                .to(block, { duration: 3 }) // Hold
                .to(block, { opacity: 0, y: -50, zIndex: 1, duration: 1 }) // Fade Out
                .set(block, { zIndex: 0 });
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);


    // --- SEÇÃO 3: CONCLUSÃO E IDENTIDADE (Acumulativo: Entra -> Fica) ---
    useEffect(() => {
        if (!section3Ref.current) return;
        const textsContainer = section3Ref.current.querySelector(`.${styles.scrollingTexts}`);
        // Seleciona blocos específicos
        const block1 = textsContainer.querySelector('.block1');
        const block2 = textsContainer.querySelector('.block2');

        // Reset inicial
        gsap.set([block1, block2], { opacity: 0, y: 30 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section3Ref.current,
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: true,
                anticipatePin: 1
            },
        });

        // 1. Entra Bloco Superior
        tl.to(block1, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
            .to({}, { duration: 2 }) // Pausa para leitura

            // 2. Entra Bloco Inferior (Superior permanece visível)
            .to(block2, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
            .to({}, { duration: 3 }); // Pausa final com ambos visíveis

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <div className={styles.container}>
            {showAnimation && (
                <div className={styles.introAnimationElement}>
                    <span>▼</span>
                </div>
            )}

            {/* HEADER */}
            <header ref={headerRef} className={styles.header}>
                <div ref={overlayRef} className={styles.headerOverlay}></div>
                <div className={styles.headerCaption}>Vista aérea da ZEIS Rosa Selvagem, 2024. (Fonte: Sennor Ramos)</div>
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

            {/* SEÇÃO 1: HISTÓRIA (Sticky) */}
            <div ref={section1Ref} className={styles.stickySection}>
                <div className={styles.stickyImageContainer}>
                    <img src="/rosa-selvagem_2.png" alt="Rosa Selvagem Aérea" className={styles.stickyImage} />
                    <div className={styles.stickyImageCaption}>Vista aérea da ZEIS Rosa Selvagem, 2024.</div>
                </div>
                <div className={styles.scrollingTexts}>
                    <div className={styles.textBlock}>
                        <p>
                            Localizada dentro do bairro da Várzea, a comunidade Rosa Selvagem foi fruto de ocupações espontâneas que ganharam forma ao longo do século XX, acompanhando o crescimento populacional e a migração de famílias de baixa renda.
                        </p>
                    </div>
                    <div className={styles.textBlock}>
                        <p>
                            Instalada em uma área de encosta com forte inclinação, Rosa Selvagem cresceu de maneira desordenada, com moradias distribuídas ao longo dos aclives e pequenas vias que funcionam como o único elo entre o alto e a parte plana.
                        </p>
                    </div>
                </div>
            </div>

            {/* Spacer visual para garantir separação de pins */}
            <div style={{ height: '2vh', background: '#003366' }}></div>

            {/* SEÇÃO 2: URBANIZAÇÃO (Sticky) */}
            <div ref={section2Ref} className={styles.stickySection}>
                <div className={styles.stickyImageContainer}>
                    <img src="/rosa_selvagem_4.png" alt="Obras de Urbanização" className={styles.stickyImage} />
                    <div className={styles.stickyImageCaption}>Urbanização de encosta na Rua Pelopidas Arroxelas, 2024.</div>
                </div>
                <div className={styles.scrollingTexts}>
                    <div className={styles.textBlock}>
                        <p>
                            Essa ocupação em terreno naturalmente frágil fez com que o risco de deslizamentos se tornasse uma preocupação constante para os moradores.
                        </p>
                    </div>
                    <div className={styles.textBlock}>
                        <p>
                            Foi nesse contexto que, em 2021, a comunidade se tornou a 55ª beneficiada pelo programa Mais Vida nos Morros.
                        </p>
                    </div>
                    <div className={styles.textBlock}>
                        <p>
                            Recebendo a maior obra de contenção de encostas da década na rua João Carneiro da Cunha, a comunidade Rosa Selvagem passou por uma profunda transformação.
                        </p>
                    </div>
                </div>
            </div>

            {/* Spacer visual */}
            <div style={{ height: '2vh', background: '#003366' }}></div>

            {/* SEÇÃO 3: CONCLUSÃO (Sticky & Accumulating) */}
            <div ref={section3Ref} className={styles.stickySection}>
                <div className={styles.stickyImageContainer}>
                    <img src="/rosa_selvagem_5.png" alt="Comunidade Concluída" className={styles.stickyImage} />
                    <div className={styles.stickyImageCaption}>Obra de contenção na comunidade Rosa Selvagem.</div>
                </div>
                <div className={styles.scrollingTexts}>
                    {/* Note as classes extras 'block1/2' e 'textBlockTop/Bottom' */}
                    <div className={`${styles.textBlock} ${styles.textBlockTop} block1`}>
                        <p>
                            Além das obras estruturais, o programa implementou melhorias no espaço urbano que incluíram requalificação de escadarias, criação de áreas de convivência e pintura de fachadas.
                        </p>
                    </div>

                    <div className={`${styles.textBlock} ${styles.textBlockBottom} block2`}>
                        <p>
                            Embora tenha um registro histórico mais escasso, Rosa Selvagem traduz a realidade de boa parte dos territórios populares da cidade: comunidades que se fortaleceram a partir da própria resistência de seus habitantes.
                        </p>
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
