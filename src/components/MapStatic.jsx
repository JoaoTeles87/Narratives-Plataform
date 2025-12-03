import React from 'react';
import styles from './MapStatic.module.css';

const MapStatic = ({ onNavigate }) => {
    // ZEIS Data
    const zeisLocations = [
        { id: 'ibura', name: 'ZEIS Ibura (Morro)', top: '65%', left: '35%', color: '#FF4500' }, // OrangeRed
        { id: 'casa-amarela', name: 'ZEIS Casa Amarela', top: '37%', left: '40%', color: '#FFD700' }, // Gold
        { id: 'rosa-selvagem', name: 'ZEIS Rosa Selvagem', top: '43%', left: '13%', color: '#DA70D6', labelShift: '60px' }, // Orchid
    ];

    const handleNavigation = (zeisId) => {
        if (onNavigate) {
            onNavigate(zeisId);
        } else {
            alert(`Navegando para ${zeisId}...`);
        }
    };

    return (
        <section className={styles.mapSection}>
            <div className={styles.header}>
                <h2>Explore as ZEIS</h2>
                <p>Clique nos pontos para conhecer as histórias.</p>
            </div>

            <div className={styles.mapContainer}>
                <img
                    src="/mapa_satelite.jpg"
                    alt="Mapa Satélite de Recife"
                    className={styles.mapImage}
                />

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
