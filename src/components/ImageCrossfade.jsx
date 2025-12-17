import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ImageCrossfade.module.css';

gsap.registerPlugin(ScrollTrigger);

const ImageCrossfade = ({
    image1,
    image2,
    image3,
    alt1 = "Imagem 1",
    alt2 = "Imagem 2",
    alt3 = "Imagem 3",
}) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const img2 = image2Ref.current;
        const img3 = image3Ref.current;

        if (!section || !container || !img2 || !img3) return;

        // Cria a animação com ScrollTrigger + Pin
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=1200%',              // Duração maior para 2 transições
                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false,
            }
        });

        // Primeira transição: imagem 1 → imagem 2 (0% a 50% do scroll)
        tl.to(img2, {
            opacity: 1,
            duration: 1,
            ease: 'none'
        });

        // Segunda transição: imagem 2 → imagem 3 (50% a 100% do scroll)
        tl.to(img3, {
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
                {/* Imagem 1 (base) */}
                <img
                    src={image1}
                    alt={alt1}
                    className={`${styles.image} ${styles.image1}`}
                />

                {/* Imagem 2 (sobreposta, começa invisível) */}
                <img
                    ref={image2Ref}
                    src={image2}
                    alt={alt2}
                    className={`${styles.image} ${styles.image2}`}
                />

                {/* Imagem 3 (sobreposta, começa invisível) */}
                <img
                    ref={image3Ref}
                    src={image3}
                    alt={alt3}
                    className={`${styles.image} ${styles.image3}`}
                />
            </div>
        </section>
    );
};

export default ImageCrossfade;