import React, { useEffect, useState, useRef } from 'react';
import styles from './CasaAmarelaNarrative.module.css';

const CasaAmarelaNarrative = ({ onBack }) => {
    const [showAnimation, setShowAnimation] = useState(true);
    const headerRef = useRef(null);
    const overlayRef = useRef(null);

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
                <h1 className={styles.title}>CASA AMARELA</h1>
                <p className={styles.subtitle}>Zeis de morro</p>
            </header>

            <div className={styles.contentSection}>
                {/* Section 1: Origin (Side by Side Maps) */}
                <div className={styles.column}>
                    <div className={styles.textBox}>
                        <p>
                            Casa Amarela se originou de um povoamento ao redor do Arraial Velho do Bom Jesus, logo após a invasão holandesa no Recife, no século XVIII.
                        </p>
                        <p className={styles.caption}>
                            Forte Real do Arraial Velho do Bom Jesus
                        </p>
                    </div>

                    <div className={styles.doubleImageRow}>
                        <div className={styles.imageBox}>
                            <img src="/casa_amarela_2.png" alt="Forte Real do Arraial Velho do Bom Jesus" />
                            <p className={styles.imageCaption}>Forte Real do Arraial Velho do Bom Jesus. (SATLER)</p>
                        </div>
                        <div className={styles.imageBox}>
                            <img src="/casa_amarela_3.png" alt="Imagens de satélite" />
                            <p className={styles.imageCaption}>Imagens de satélite. (Google Maps, 2025)</p>
                        </div>
                    </div>
                    <p className={styles.imageCaption} style={{ marginTop: '-1rem' }}>Antes - 1629 | Depois - 2025</p>
                </div>

                {/* Section 2: Name Origin */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Seu nome tem origem da antiga propriedade do comendador portugês Joaquim dos Santos Oliveira, que passou a morar no bairro. Sua casa foi construída perto do Arraial do Bom Jesus, localidade onde hoje encontramos o Sítio da Trindade, e pintada ocre, um tom de amarelo mais escuro.
                        </p>
                        <p>
                            Ao longo dos anos, o ponto passou a ser armazém e mercearia, e atualmente é uma farmácia.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/casa_amarela_4.png" alt="Casa que deu origem ao nome do bairro" />
                        <p className={styles.imageCaption}>Casa que deu origem ao nome do bairro Casa Amarela. (Pelas Ruas, 2017)</p>
                    </div>
                </div>

                {/* Section 3: Heritage */}
                <div className={styles.row}>
                    <div className={styles.textBox}>
                        <p>
                            Casa Amarela tem forte presença histórica contando com patrimônios tombados como o chamado Conjunto paisagístico do Sítio da Trindade (Arraial Velho do Bom Jesus).
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/casa_amarela_5.png" alt="Sítio da Trindade" />
                        <p className={styles.imageCaption}>Sítio da Trindade. (Imagem: Prefeitura Municipal)</p>
                    </div>
                </div>

                {/* Section 4: Market */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            E também o Mercado de Casa Amarela, considerado um dos mais antigos da cidade, inaugurado em 1930.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/casa_amarela_7.jpg" alt="Mercado de Casa Amarela" />
                        <p className={styles.imageCaption}>Recortes de jornais. Acervo da Fundação Joaquim Nabuco.</p>
                    </div>
                </div>

                {/* Section 5: Resistance */}
                <div className={styles.column}>
                    <div className={styles.imageBox}>
                        <img src="/casa_amarela_9.png" alt="Movimento Terras de Ninguém" />
                    </div>
                    <div className={styles.textBox}>
                        <p>
                            Durante o período da Ditadura Militar, o bairro se destacou por sua ação combativa ao regime, sendo um território que concentrava grupos e movimentos sociais de resistência que iam para além.
                        </p>
                        <p>
                            Em 1975, originou-se no bairro o Movimento Terras de Ninguém que, liderado pelos moradores junto a Igreja Católica, reivindicava o direito à posse e a moradia que, na época, vivia sob um contexto de cobranças pela ocupação dos terrenos, por parte das famílias Marinho e Rosa Borges.
                        </p>
                    </div>
                </div>

                {/* Section 6: Urbanization */}
                <div className={`${styles.row} ${styles.reverse}`}>
                    <div className={styles.textBox}>
                        <p>
                            Após a instauração da Lei dos Doze Bairros, que buscava restringir a construção de grandes torres na cidade e proteger alguns bairros, Casa Amarela passou por um processo de urbanização marcado pela construção de grandes edificações.
                        </p>
                        <p>
                            A redefinição territorial resultou na expulsão das favelas, favorecendo a parte plana, que permaneceu com a denominação oficial de Casa Amarela e se tornou alvo da especulação imobiliária.
                        </p>
                    </div>
                    <div className={styles.imageBox}>
                        <img src="/casa_amarela_10.png" alt="Casa Amarela em 2020" />
                        <p className={styles.imageCaption}>Casa Amarela em 2020. (Freitas, 2024)</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CasaAmarelaNarrative;
