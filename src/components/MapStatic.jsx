import React from 'react';
import styles from './MapStatic.module.css';

const MapStatic = ({ onNavigate }) => {
    // As 3 ZEIS Principais (Interativas - Coloridas)
    const zeisLocations = [
        { id: 'ibura', name: 'ZEIS Ibura', top: '75%', left: '35%', color: '#FF4500' }, // Sul (RPA 6)
        { id: 'casa-amarela', name: 'ZEIS Casa Amarela', top: '30%', left: '42%', color: '#FFD700' }, // Norte (RPA 3)
        { id: 'rosa-selvagem', name: 'ZEIS Rosa Selvagem', top: '48%', left: '15%', color: '#DA70D6', labelShift: '60px' }, // Oeste (RPA 4)
    ];

    // As outras 9 ZEIS de Morro (Cinzas - Não interativas)
    // Baseado na concentração de morros: RPA 2, 3 (Norte) e 6 (Sul)
    const backgroundZeis = [
        // --- CLUSTER ZONA NORTE / NOROESTE (Perto de Casa Amarela) ---
        // Ex: Alto do Mandu, Dois Unidos, Linha do Tiro, Passarinho, Brejo da Guabiraba
        { top: '22%', left: '38%' },
        { top: '25%', left: '45%' },
        { top: '28%', left: '35%' },
        { top: '18%', left: '40%' },
        { top: '32%', left: '30%' },

        // --- CLUSTER ZONA OESTE (Perto de Rosa Selvagem) ---
        // Ex: Várzea / Caxangá (áreas de encosta)
        { top: '50%', left: '22%' },

        // --- CLUSTER ZONA SUL (Perto do Ibura) ---
        // Ex: Jordão, Cohab
        { top: '72%', left: '42%' },
        { top: '78%', left: '30%' },
        { top: '68%', left: '28%' }
    ];

    const handleNavigation = (zeisId) => {
        if (onNavigate) {
            onNavigate(zeisId);
        }
    };

    return (
        <section className={styles.mapSection}>
            <div className={styles.header}>
                <h2>Explore 3 das 12 ZEIS de Morros</h2>
                <p>Os pontos coloridos são as histórias selecionadas. Os pontos cinzas representam as outras ZEIS de morro do Recife.</p>
            </div>

            <div className={styles.mapContainer}>
                {/* Imagem do Mapa */}
                <img
                    src="/mapa_satelite.jpg"
                    alt="Mapa Satélite de Recife com relevo"
                    className={styles.mapImage}
                />

                {/* Renderização dos 9 pontos "Fantasmas" (Outras ZEIS de Morro) */}
                {backgroundZeis.map((pos, index) => (
                    <div
                        key={`bg-${index}`}
                        className={styles.backgroundMarker}
                        style={{ top: pos.top, left: pos.left }}
                        title="Outra ZEIS de Morro"
                    />
                ))}

                {/* Renderização das 3 ZEIS Principais */}
                {zeisLocations.map((zeis) => (
                    <div
                        key={zeis.id}
                        className={styles.markerContainer}
                        style={{ top: zeis.top, left: zeis.left }}
                        onClick={() => handleNavigation(zeis.id)}
                    >
                        <div
                            className={styles.marker}
                            style={{ backgroundColor: zeis.color }}
                        ></div>
                        <div
                            className={styles.tooltip}
                            style={{ marginLeft: zeis.labelShift || '0' }}
                        >
                            {zeis.name}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MapStatic;
