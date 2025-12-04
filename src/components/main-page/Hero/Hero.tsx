"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroData {
  id: number;
  documentId: string;
  HeroTitle: string;
  HeroDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getHeroData = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-blocks`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data?.[0]) {
        setHeroData(data.data[0]);
      } else {
        throw new Error("Данные не найдены в ответе");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeroData();
  }, []);

  if (loading) {
    return (
      <section className={styles.hero}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <div className={styles.loading}>
              <p>Загрузка...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.hero}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <div className={styles.error}>
              <p>Ошибка: {error}</p>
              <button onClick={getHeroData} className={styles.retryButton}>
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className={styles.hero}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <div className={styles.noData}>
              <p>Данные не загружены</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className={styles.hero_container}>
        <div className={styles.hero_content}>
          <div className={styles.hero_text}>
            <h1>{heroData.HeroTitle}</h1>
            <span className={styles.hero_subtitle}>
              {heroData.HeroDescription}
            </span>
            <Link
              href="https://t.me/+89029833205"
              className={styles.cta_button}
            >
              Записаться на прием
            </Link>
          </div>
          <span className={styles.hero_under__text}>Здоровые зубы</span>
        </div>

        {/* Контейнер для изображения */}
        <div className={styles.hero_image_container}>
          {/* Зеленый блюр под изображением */}
          <div className={styles.hero_image_blur}></div>

          {/* Обертка для изображения */}
          <div className={styles.hero_image_wrapper}>
            <Image
              className={styles.hero_line_second}
              src={"/hero/ewq.svg"}
              alt="линия"
              width={1920}
              height={1080}
              priority
            />
            <Image
              src={"/hero/hero-image.png"}
              width={1920}
              height={1080}
              alt="Стоматологическая клиника"
              className={styles.hero_image}
              priority
            />
            <Image
              className={styles.hero_line}
              src={"/hero/qwe.svg"}
              alt="линия"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
