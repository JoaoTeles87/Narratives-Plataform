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
    text1 = "O Ibura enfrenta historicamente desafios envolvendo a urbanização e especialmente deslizamentos de terra.",
    text2 = "Entre maio e junho de 2022, o Recife teve o maior volume de chuvas daquele ano. Sendo considerada a maior tragédia do século no estado, superando outras tragédias ocorridas na cidade, as chuvas daquele ano vitimaram 133 pessoas e afetaram mais de 2 mil.",
    text3 = "A comunidade de Jardim Monte Verde, foi a que mais registrou mortes, sendo 17 vítimas fatais na mesma rua, totalizando 20 pessoas mortas. Essa comunidade tem registros de deslizamentos de terra e mortes, desde 1987 e somente em 2023, um ano após a tragédia, foram anunciadas obras de contenção de encostas, urbanização mais efetiva no que tange segurança a população que vive nos morros.",
}) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const balloon1Ref = useRef(null);
    const balloon2Ref = useRef(null);
    const balloon3Ref = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const img2 = image2Ref.current;
        const img3 = image3Ref.current;
        const balloon1 = balloon1Ref.current;
        const balloon2 = balloon2Ref.current;
        const balloon3 = balloon3Ref.current;

        if (!section || !container || !img2 || !img3) return;

        // Cria a animação com ScrollTrigger + Pin
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=300%',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false,
            }
        });

        // Estado inicial: balão 1 visível, outros escondidos
        gsap.set(balloon1, { opacity: 1, y: 0 });
        gsap.set([balloon2, balloon3], { opacity: 0, y: 50 });

        // Primeira transição: imagem 1 → imagem 2
        tl.to(balloon1, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.in'
        })
            .to(img2, {
                opacity: 1,
                duration: 1,
                ease: 'none'
            }, "<")
            .to(balloon2, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, "-=0.3");

        // Pausa entre transições
        tl.to({}, { duration: 0.5 });

        // Segunda transição: imagem 2 → imagem 3
        tl.to(balloon2, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.in'
        })
            .to(img3, {
                opacity: 1,
                duration: 1,
                ease: 'none'
            }, "<")
            .to(balloon3, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, "-=0.3");

        // Cleanup
        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.crossfadeSection}>
            <div className={styles.container} ref={containerRef}>
                {/* Imagens */}
                <img
                    src={image1}
                    alt={alt1}
                    className={`${styles.image} ${styles.image1}`}
                />
                <img
                    ref={image2Ref}
                    src={image2}
                    alt={alt2}
                    className={`${styles.image} ${styles.image2}`}
                />
                <img
                    ref={image3Ref}
                    src={image3}
                    alt={alt3}
                    className={`${styles.image} ${styles.image3}`}
                />

                {/* Balões de texto */}
                <div ref={balloon1Ref} className={styles.balloon}>
                    <p>{text1}</p>
                </div>
                <div ref={balloon2Ref} className={styles.balloon}>
                    <p>{text2}</p>
                </div>
                <div ref={balloon3Ref} className={styles.balloon}>
                    <p>{text3}</p>
                </div>
            </div>
        </section>
    );
};

export default ImageCrossfade;