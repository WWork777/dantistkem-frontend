"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ServiceData {
  id: number;
  documentId: string;
  ServiceName: string;
  ServiceDescription: string;
  ServiceLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

function ServiceCard({ title, description, image, link }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.decor}>
        <div className={styles.circle}>
          <Image src="/services/zub.svg" alt="круг" width={50} height={50} />
        </div>
        <div className={styles.tooth}>
          <Image src="/services/zub2.svg" alt="зуб" width={30} height={30} />
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        height={1920}
        width={1080}
        className={styles.service_image}
      />
      <div className={styles.service_text}>
        <h3>{title}</h3>
        <span>{description}</span>
        <Link href={`/services/${link}`}>Узнать больше 🠒</Link>
      </div>
    </article>
  );
}

export default function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getServices = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data) {
        setServices(data.data);
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
    getServices();
  }, []);

  if (loading) {
    return (
      <section className="container" id="services">
        <div className={styles.loading}>
          <p>Загрузка услуг...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container" id="services">
        <div className={styles.error}>
          <p>Ошибка: {error}</p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="container" id="services">
        <div className={styles.noData}>
          <p>Услуги не найдены</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container" id="services">
      <h2 className={styles.title}>Услуги</h2>
      <div className={styles.services_grid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.ServiceName}
            description={service.ServiceDescription}
            image="/services/serviceImage.jpg" // Используем дефолтное изображение или можно добавить поле в Strapi
            link={service.ServiceLink}
          />
        ))}
      </div>
      <button className={styles.all}>Смотреть все</button>
    </section>
  );
}
