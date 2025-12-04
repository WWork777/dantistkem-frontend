"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

// Интерфейс для изображения
export interface AboutImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutData {
  id: number;
  documentId: string;
  AboutTitle: string;
  AboutText: string;
  FirstFieldText: string;
  FirstFieldNumber: string;
  SeconFieldText: string;
  SecondFieldNumber: string;
  ThirdFieldText: string;
  ThirdFieldNumber: string;
  FourthFieldText: string;
  FourthFieldNumber: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  AboutImage: AboutImage; // Добавляем поле для изображения
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAbout = async () => {
    try {
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/abouts?populate=*`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data?.[0]) {
        setAbout(data.data[0]);
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
    getAbout();
  }, []);

  if (loading) {
    return (
      <section className="container" id="about">
        <div className={styles.about_container}>
          <p>Загрузка...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container" id="about">
        <div className={styles.about_container}>
          <p>Ошибка: {error}</p>
        </div>
      </section>
    );
  }

  if (!about) {
    return (
      <section className="container" id="about">
        <div className={styles.about_container}>
          <p>Данные не загружены</p>
        </div>
      </section>
    );
  }

  // Формируем полный URL для изображения
  const getImageUrl = (image: AboutImage) => {
    // В зависимости от вашей конфигурации, может потребоваться добавить базовый URL
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";
    return image?.url ? `${baseUrl}${image.url}` : "";
  };

  // Используем изображение medium формата для лучшего качества
  const imageUrl = about.AboutImage
    ? about.AboutImage.formats?.medium?.url || about.AboutImage.url
    : "";

  const fullImageUrl = imageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${imageUrl}`
    : "";

  return (
    <section className="container" id="about">
      <div className={styles.about_container}>
        <div className={styles.about_image_container}>
          {about.AboutImage ? (
            <Image
              src={fullImageUrl}
              alt={
                about.AboutImage.alternativeText ||
                about.AboutTitle ||
                "Стоматология"
              }
              width={about.AboutImage.width || 750}
              height={about.AboutImage.height || 1125}
              className={styles.about_image}
              priority
              // Оптимизация Next.js Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Fallback если изображение не загрузилось
            <Image
              src="/about/about.jpg"
              alt="Стоматология"
              width={750}
              height={1125}
              className={styles.about_image}
              priority
            />
          )}
        </div>
        <div className={styles.about_text}>
          <h2>{about.AboutTitle}</h2>
          <p>{about.AboutText}</p>
          <div className={styles.about_grid}>
            <div className={styles.about_grid__item}>
              <span className={styles.about_grid__title}>
                {about.FirstFieldNumber}
              </span>
              <span className={styles.about_grid__desc}>
                {about.FirstFieldText}
              </span>
            </div>
            <div className={styles.about_grid__item}>
              <span className={styles.about_grid__title}>
                {about.SecondFieldNumber}
              </span>
              <span className={styles.about_grid__desc}>
                {about.SeconFieldText}
              </span>
            </div>
            <div className={styles.about_grid__item}>
              <span className={styles.about_grid__title}>
                {about.ThirdFieldNumber}
              </span>
              <span className={styles.about_grid__desc}>
                {about.ThirdFieldText}
              </span>
            </div>
            <div className={styles.about_grid__item}>
              <span className={styles.about_grid__title}>
                {about.FourthFieldNumber}
              </span>
              <span className={styles.about_grid__desc}>
                {about.FourthFieldText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
