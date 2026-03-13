"use client";

import styles from "./ServiceGrid.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Интерфейс для изображения услуги
interface ServiceImage {
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

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  altText?: string;
  imageWidth?: number;
  imageHeight?: number;
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
  ServiceImage: ServiceImage | null; // Добавляем поле для изображения
}

function ServiceCard({
  title,
  description,
  imageUrl,
  link,
  altText,
  imageWidth = 1080,
  imageHeight = 1920,
}: ServiceCardProps) {
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
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText || title}
          width={imageWidth}
          height={imageHeight}
          className={styles.service_image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className={styles.image_placeholder}>
          <span>Нет изображения</span>
        </div>
      )}
      <div className={styles.service_text}>
        <h3>{title}</h3>
        <span>{description}</span>
        <Link href={`/services/${link}`}>Узнать больше 🠒</Link>
      </div>
    </article>
  );
}

export default function ServiceGrid() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getServices = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?populate=*`;
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

  // Функция для получения URL изображения
  const getServiceImageUrl = (service: ServiceData) => {
    if (!service.ServiceImage) {
      return "/services/serviceImage.jpg"; // Дефолтное изображение
    }

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";
    const image = service.ServiceImage;

    // Используем medium формат для оптимального качества, или оригинал если нет medium
    const imageUrl = image.formats?.medium?.url || image.url;

    return imageUrl ? `${baseUrl}${imageUrl}` : "/services/serviceImage.jpg";
  };

  // Функция для получения альтернативного текста
  const getServiceImageAlt = (service: ServiceData) => {
    if (service.ServiceImage?.alternativeText) {
      return service.ServiceImage.alternativeText;
    }
    return service.ServiceName;
  };

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
      <section>
        <div className={styles.noData}>
          <p>Услуги не найдены</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={styles.services_grid}>
        {services.map((service) => {
          const imageUrl = getServiceImageUrl(service);
          const altText = getServiceImageAlt(service);
          const imageWidth = service.ServiceImage?.width || 1080;
          const imageHeight = service.ServiceImage?.height || 1920;

          return (
            <ServiceCard
              key={service.id}
              title={service.ServiceName}
              description={service.ServiceDescription}
              imageUrl={imageUrl}
              link={service.ServiceLink}
              altText={altText}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          );
        })}
      </div>
      {/* <button className={styles.all}>Смотреть все</button> */}
    </section>
  );
}
