import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import MapStatic from './MapStatic';
import IburaNarrative from './IburaNarrative';
import CasaAmarelaNarrative from './CasaAmarelaNarrative';
import RosaSelvagemNarrative from './RosaSelvagemNarrative';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
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

const Home = () => {
  const act2Ref = useRef(null);
  const mapRef = useRef(null);
  const conclusionRef = useRef(null);
  const [showAct2Content, setShowAct2Content] = useState(false);
  const [showIbura, setShowIbura] = useState(false);
  const [showCasaAmarela, setShowCasaAmarela] = useState(false);
  const [showRosaSelvagem, setShowRosaSelvagem] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAct2Content(true);
        }
      },
      { threshold: 0.3 }
    );

    if (act2Ref.current) {
      observer.observe(act2Ref.current);
    }

    return () => {
      if (act2Ref.current) {
        observer.unobserve(act2Ref.current);
      }
    };
  }, []);

  const handleNavigate = (destination) => {
    // Reset all states first
    setShowIbura(false);
    setShowCasaAmarela(false);
    setShowRosaSelvagem(false);

    if (destination === 'ibura') {
      setShowIbura(true);
    } else if (destination === 'casa-amarela') {
      setShowCasaAmarela(true);
    } else if (destination === 'rosa-selvagem') {
      setShowRosaSelvagem(true);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setShowIbura(false);
    setShowCasaAmarela(false);
    setShowRosaSelvagem(false);
    // Wait for state update and re-render, then scroll to map
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {showIbura && <IburaNarrative onBack={handleBack} onNavigate={handleNavigate} />}
      {showCasaAmarela && <CasaAmarelaNarrative onBack={handleBack} onNavigate={handleNavigate} />}
      {showRosaSelvagem && <RosaSelvagemNarrative onBack={handleBack} onNavigate={handleNavigate} />}

      <div className={styles.container} style={{ display: (showIbura || showCasaAmarela || showRosaSelvagem) ? 'none' : 'block' }}>

        {/* ATO 1: AMEAÇA (REVISADO) */}
        <section className={styles.act1}>
          <div className={`${styles.contentFixed} ${styles.reveal}`}>
            <h1>RECIFE E AS ZEIS DE MORRO</h1>
            <p>
              O Recife não é apenas a cidade das águas, é também a cidade das encostas. Historicamente, a modernização do centro plano empurrou a população trabalhadora para o alto, transformando o morro na única alternativa de moradia e moldando uma cidade verticalizada pela exclusão.
            </p>
          </div>
          <div className={styles.scrollIndicator}>
            <span>Role para descobrir</span>
            <div className={styles.arrow}>↓</div>
          </div>
        </section>

        {/* ATO 2: FOCO DO RISCO (REVISADO COM DADOS) */}
        <section ref={act2Ref} className={styles.act2}>
          <div className={`${styles.imageContainer} ${showAct2Content ? styles.visible : ''}`}>
            {/* Background image set in CSS */}
          </div>

          <div className={`${styles.floatingBox} ${showAct2Content ? styles.visible : ''} ${styles.reveal}`}>
            <h2>A Geografia do Risco</h2>
            <p>
              O risco tem endereço. Cerca de <strong>67% do território do Recife é formado por morros</strong>, onde a fragilidade do solo encontra a densidade populacional.
            </p>
            <p>
              Dados mostram que <strong>89% dos deslizamentos</strong> ocorrem em áreas de risco alto ou muito alto, concentrados principalmente nas zonas Norte e Noroeste da cidade. Aqui, a chuva deixa de ser clima para virar ameaça.
            </p>
          </div>
        </section>

        {/* ATO 3: O CONCEITO E O RECORTE */}
        <section className={styles.act3}>
          <div className={`${styles.textContent} ${styles.reveal}`}>
            <h2>A Resposta Política: ZEIS</h2>

            {/* 1. A Citação do Professor (Fundação Teórica) */}
            <p>
              Em 1983, o Recife foi pioneiro ao criar as Zonas Especiais de Interesse Social:
            </p>
            <blockquote>
              “As ZEIS foram elaboradas com a finalidade de oferecer políticas públicas que melhorassem as condições de vida da população pobre... trazendo água, saneamento, pavimentação e a regulação da terra.”
            </blockquote><footer>— Tomás Lapa, urbanista e professor da UFPE</footer>

            {/* 2. O Funil de Dados (108 vs 12) */}
            <div className={styles.highlightData}>
              <p>
                Hoje, o Recife conta com <strong>108 ZEIS</strong>. Porém, o mapa abaixo recorta apenas as <strong>12 ZEIS de Morro</strong> (pontos no mapa), onde o risco geológico exige atenção máxima.
              </p>
            </div>

            {/* 3. A Preparação para o Mapa (Suavizando a escolha das 3) */}
            <p>
              Dentre elas, destacamos <strong>três histórias</strong> (pontos coloridos) para representar a realidade de quem vive nas encostas.
            </p>
          </div>
        </section>

        {/* MAPA INTERATIVO */}
        <div ref={mapRef}>
          <MapStatic onNavigate={handleNavigate} />
        </div>

        {/* NOVA SEÇÃO: CONCLUSÃO */}
        <section ref={conclusionRef} className={`${styles.act3} ${styles.conclusionSection}`}>
          <div className={`${styles.textContent} ${styles.reveal}`}>
            <hr className={styles.divider} />
            <h2>A Cidade Possível</h2>
            <p>
              Do trauma recente do <strong>Ibura</strong> à resistência histórica de <strong>Casa Amarela</strong> e à identidade comunitária de <strong>Rosa Selvagem</strong>, uma verdade emerge: o morro é vivo e pulsante.
            </p>
            <p>
              A solução para o Recife não é remover a cidade do alto, mas integrar o alto à cidade com dignidade e segurança. As ZEIS são apenas o primeiro degrau dessa longa escadaria rumo a uma justiça urbana real.
            </p>
            <div className={styles.finalBrand}>
              <p>PROJETO RECIFE E AS ZEIS DE MORRO • 2025</p>
              <p style={{ marginTop: '5px', fontSize: '0.6rem' }}>Foto: Divulgação/Prefeitura do Recife</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
