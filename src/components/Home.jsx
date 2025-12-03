import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import MapStatic from './MapStatic';
import IburaNarrative from './IburaNarrative';
import CasaAmarelaNarrative from './CasaAmarelaNarrative';
import RosaSelvagemNarrative from './RosaSelvagemNarrative';

const Home = () => {
  const act2Ref = useRef(null);
  const mapRef = useRef(null);
  const [showAct2Content, setShowAct2Content] = useState(false);
  const [showIbura, setShowIbura] = useState(false);
  const [showCasaAmarela, setShowCasaAmarela] = useState(false);
  const [showRosaSelvagem, setShowRosaSelvagem] = useState(false);

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
    if (destination === 'ibura') {
      setShowIbura(true);
      window.scrollTo(0, 0);
    } else if (destination === 'casa-amarela') {
      setShowCasaAmarela(true);
      window.scrollTo(0, 0);
    } else if (destination === 'rosa-selvagem') {
      setShowRosaSelvagem(true);
      window.scrollTo(0, 0);
    }
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
      {showIbura && <IburaNarrative onBack={handleBack} />}
      {showCasaAmarela && <CasaAmarelaNarrative onBack={handleBack} />}
      {showRosaSelvagem && <RosaSelvagemNarrative onBack={handleBack} />}

      <div className={styles.container} style={{ display: (showIbura || showCasaAmarela || showRosaSelvagem) ? 'none' : 'block' }}>
        {/* ATO 1: INTRODUÇÃO */}
        <section className={styles.act1}>
          <div className={styles.contentFixed}>
            <h1>RECIFE E AS ZEIS DE MORRO</h1>
            <p>
              A capital pernambucana foi moldada pela alta desigualdade social e por uma política urbana que, historicamente, expulsou a população pobre das áreas centrais para atender aos interesses de uma elite proprietária.
            </p>
            <div className={styles.scrollIndicator}>
              <span>Role para descobrir</span>
              <div className={styles.arrow}>↓</div>
            </div>
          </div>
        </section>

        {/* ATO 2: DADOS E IMPACTO */}
        <section ref={act2Ref} className={styles.act2}>
          <div className={`${styles.imageContainer} ${showAct2Content ? styles.visible : ''}`}>
            {/* Background image set in CSS or inline if dynamic */}
          </div>

          <div className={`${styles.floatingBox} ${showAct2Content ? styles.visible : ''}`}>
            <h2>O Custo da Desigualdade</h2>
            <p>
              O Recife é o 5º município com maior número de moradores em áreas de risco a desastres naturais no Brasil, com <strong>206.761 habitantes</strong> (13,4% da população total do município), onde cerca de <strong>35% das famílias recifenses</strong> vivem nas áreas de morro, com padrões de ocupação irregulares e moradias bastante precárias.
            </p>
          </div>
        </section>

        {/* ATO 3: CONTEXTO ZEIS */}
        <section className={styles.act3}>
          <div className={styles.textContent}>
            <h2>O Surgimento das ZEIS</h2>
            <p>
              Em 1983, fruto dos movimentos sociais pelo acesso ao Direito à Cidade, foram criadas no Recife as primeiras <strong>Zonas Especiais de Interesse Social (ZEIS)</strong>.
            </p>
            <blockquote>
              “As ZEIS foram elaboradas com a finalidade de oferecer políticas públicas que melhorassem as condições de vida da população pobre, a começar pela regulação da propriedade da terra. Em seguida, naturalmente, programas que trouxessem água, esgotamento sanitário, pavimentação, arborização, o tratamento dos espaços públicos e instalação de equipamentos de caráter social, como centros sociais urbanos”
              <footer>— Tomás Lapa, urbanista e professor da UFPE</footer>
            </blockquote>
            <p>
              Hoje, o Recife conta com <strong>108 ZEIS</strong>, espalhadas por toda a cidade, do centro às periferias. Desse total, <strong>12 estão em área de morro</strong>.
            </p>
          </div>
        </section>

        {/* MAPA INTERATIVO */}
        <div ref={mapRef}>
          <MapStatic onNavigate={handleNavigate} />
        </div>
      </div>
    </>
  );
};

export default Home;
