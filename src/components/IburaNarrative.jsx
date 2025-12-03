import React, { useEffect, useState, useRef } from 'react';
import styles from './IburaNarrative.module.css';

const IburaNarrative = ({ onBack }) => {
    const [showAnimation, setShowAnimation] = useState(true);
    const headerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // Remove the animation element from DOM after it finishes
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

            // Calculate opacity based on scroll position relative to header height
            // Start fading in immediately, full opacity by the time we scroll past header
            const opacity = Math.min(scrollY / (headerHeight * 0.8), 1);

            overlayRef.current.style.opacity = opacity;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.container}>
            {/* The requested animated element */}
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
                {/* Title hidden via CSS as requested to show background image text */}
                <h1 className={styles.title}>IBURA</h1>
                <p className={styles.subtitle}>27 de Março</p>
            </header>

            <div className={styles.contentSection}>
                {/* Section 1: History & Airport */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            A ocupação do Ibura deu-se início na década de 1940, período da Segunda Guerra Mundial, e o local, onde hoje é o bairro, chegou a abrigar uma pista de pousos e decolagens conhecida como Ibura Field.
                        </p>
                        <p>
                            Essa pista estava localizada desde a Av. Barão de Souza Leão, em Boa Viagem, até a atual localidade do Parque da Aeronáutica. Foi o Ibura Field que acabou dando origem ao atual Aeroporto Internacional dos Guararapes.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (1).png" alt="Ibura Antigo - Pista de Pouso" />
                    </div>
                </div>

                {/* Section 2: Population & Origins */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Com uma população de mais de 50 mil habitantes e considerado o terceiro maior bairro do Recife, o Ibura surgiu ainda no século XIX e, antes de ser o que é hoje, era um engenho de cana-de-açúcar.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (2).png" alt="Ibura Antigo - Engenho" />
                    </div>
                </div>

                {/* Section 3: Division */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            O bairro do Ibura é dividido em duas partes: Ibura de Cima (a oeste) e Ibura de Baixo (a leste).
                        </p>
                        <p>
                            A divisão se dá pela diferença de relevo marcada por uma barreira muito íngreme que separa as comunidades do Ibura de Baixo das chamadas “UR’s”, ou Unidades Residenciais, que estão localizadas no Ibura de cima.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (3).png" alt="Ibura - Divisão Geográfica" />
                    </div>
                </div>

                {/* Section 4: Communities */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Somando um total de 21 comunidades, as UR’s, são as áreas que representam a maior parte do bairro. Dentre as comunidades existentes no Ibura estão: UR’s de um à doze, além das comunidades de Três Carneiros Alto e Baixo, Lagoa Encantada, Zumbi Pacheco, etc.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (4).png" alt="Ibura - Comunidades" />
                    </div>
                </div>

                {/* Section 5: Risks */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            O Ibura enfrenta historicamente desafios envolvendo a urbanização e especialmente deslizamentos de terra.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (5).png" alt="Risco de Deslizamento" />
                    </div>
                </div>

                {/* Section 6: 2022 Tragedy */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Entre maio e junho de 2022, o Recife teve o maior volume de chuvas daquele ano. Sendo considerada a maior tragédia do século no estado, superando outras tragédias ocorridas na cidade, as chuvas daquele ano vitimaram 133 pessoas e afetaram mais de 2 mil.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (6).png" alt="Tragédia de 2022" />
                    </div>
                </div>

                {/* Section 7: Jardim Monte Verde */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            A comunidade de Jardim Monte Verde, foi a que mais registrou mortes, sendo 17 vítimas fatais na mesma rua, totalizando 20 pessoas mortas.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (7).png" alt="Jardim Monte Verde" />
                    </div>
                </div>

                {/* Section 8: Current Situation */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Essa comunidade tem registros de deslizamentos de terra e mortes, desde 1987 e somente em 2023, um ano após a tragédia, foram anunciadas obras de contenção de encostas, urbanização mais efetiva no que tange segurança a população que vive nos morros.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/ibura (8).png" alt="Obras de Contenção" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IburaNarrative;
