"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAbout = async () => {
    try {
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/abouts`;
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

  return (
    <section className="container" id="about">
      <div className={styles.about_container}>
        <div className={styles.about_image_container}>
          <Image
            src={"/about/about.jpg"}
            alt="Стоматология"
            width={1920}
            height={1080}
            className={styles.about_image}
            priority
          />
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
