import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import ReviewsSlider from "@/components/main-page/rewievs-slider/rewievs-slider";
import styles from "./service.module.scss";

// Подключаем локальный JSON
import servicesData from "../services.json";

interface ServiceImage {
  url: string;
  alternativeText: string | null;
  formats: any | null;
}

interface ServiceData {
  id: number;
  documentId: string;
  ServiceName: string;
  ServiceDescription: string;
  slug: string;
  seoTitle?: string;       // Добавили SEO поле
  seoDescription?: string; // Добавили SEO поле
  keywords?: string;
  Body?: string;
  Content?: string | null;
  ServiceImage: ServiceImage | null;
}

// Простая функция поиска по slug
async function getService(slug: string): Promise<ServiceData | null> {
  const services = servicesData as ServiceData[];
  const service = services.find((s) => s.slug === slug);
  return service || null;
}

// В Next.js params теперь ожидаются как Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // Распаковываем params
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return {
      title: "Услуга не найдена",
    };
  }

  return {
    title: `${service.ServiceName} | Стоматология Дантист Кемерово`,
    description: service.ServiceDescription,
    keywords: `${service.ServiceName}, стоматология Кемерово, лечение зубов, услуги стоматолога`,
    openGraph: {
      title: service.ServiceName,
      description: service.ServiceDescription,
      type: "article",
      locale: "ru_RU",
      url: `https://dantistkem.ru/services/${resolvedParams.slug}`,
    },
    alternates: {
      canonical: `https://dantistkem.ru/services/${resolvedParams.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params; // Распаковываем params
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const imageUrl = service.ServiceImage?.url || "/services/serviceImage.jpg";
  const altText = service.ServiceImage?.alternativeText || service.ServiceName;
  const content = service.Body || service.Content || service.ServiceDescription;

  return (
    <section >
        <div className={`container ${styles.block}`}>
            <Breadcrumbs
                items={[
                { label: "Услуги", href: "/services" },
                { label: service.ServiceName },
                ]}
            />

            <h1 className={styles.title}>{service.ServiceName}</h1>

            <div className={styles.contentWrapper}>
                <div className={styles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={800}
                    height={600}
                    priority
                    className={styles.image}
                />
                </div>
                <div className={styles.textContent}>
                    {/* Обернули ReactMarkdown в обычный div с классом */}
                    <div className={styles.markdown}>
                        <ReactMarkdown>{content || ""}</ReactMarkdown>
                    </div>
                    <a href="tel:+73842333205" className={styles.appointmentButton}>
                        Записаться на услугу
                    </a>
                </div>
            </div>
        </div>
      

      <ReviewsSlider/>
    </section>
  );
}