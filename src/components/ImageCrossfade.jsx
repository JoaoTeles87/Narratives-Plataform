import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ImageCrossfade.module.css';

gsap.registerPlugin(ScrollTrigger);

const ImageCrossfade = ({
    drawingImage,
    photoImage,
    altDrawing = "Ilustração",
    altPhoto = "Foto real",
    labelStart = "Desenho",
    labelEnd = "Realidade",
}) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const photoRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const photo = photoRef.current;
        const progress = progressRef.current;

        if (!section || !container || !photo) return;

        // Cria a animação com ScrollTrigger + Pin
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',           // Começa quando o topo da seção atinge o topo da viewport
                end: '+=100%',              // Duração do pin: 100% da altura da viewport
                pin: true,                  // TRAVA A TELA
                pinSpacing: true,           // Adiciona espaço para compensar o pin
                scrub: 1,                   // Suavidade
                markers: false,             // Mude para true para debugar
                onUpdate: (self) => {
                    if (progress) {
                        progress.style.width = `${self.progress * 100}%`;
                    }
                }
            }
        });

        // Animação: opacidade de 0 para 1
        tl.to(photo, {
            opacity: 1,
            duration: 1,
            ease: 'none'
        });

        // Cleanup
        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.crossfadeSection}>
            <div className={styles.container} ref={containerRef}>
                {/* Imagem do Desenho (base) */}
                <img
                    src={drawingImage}
                    alt={altDrawing}
                    className={`${styles.image} ${styles.drawing}`}
                />

                {/* Imagem Real (sobreposta) */}
                <img
                    ref={photoRef}
                    src={photoImage}
                    alt={altPhoto}
                    className={`${styles.image} ${styles.photo}`}
                />

                {/* Indicador de Progresso */}
                <div className={styles.indicator}>
                    <span className={styles.label}>{labelStart}</span>
                    <div className={styles.progressBar}>
                        <div
                            ref={progressRef}
                            className={styles.progressFill}
                        />
                    </div>
                    <span className={styles.label}>{labelEnd}</span>
                </div>
            </div>
        </section>
    );
};

export default ImageCrossfade;