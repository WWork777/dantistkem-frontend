import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import styles from "./services.module.scss";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import ServiceGrid from "@/components/services-page/ServiceGrid/ServiceGrid";

// Метаданные для страницы
export const metadata: Metadata = {
  title: "Услуги стоматологии в Кемерово | Стоматологическая клиника Дантист",
  description:
    "Полный спектр стоматологических услуг в Кемерово: лечение кариеса, протезирование, имплантация зубов, профессиональная гигиена и эстетическая стоматология. Современное оборудование и опытные врачи.",
  keywords:
    "стоматологические услуги Кемерово, лечение зубов, протезирование зубов, имплантация, чистка зубов, стоматология услуги и цены",
  openGraph: {
    title: "Услуги стоматологии в Кемерово | Стоматологическая клиника Дантист",
    description:
      "Профессиональные стоматологические услуги в Кемерово. Лечение, протезирование и имплантация зубов с гарантией качества.",
    type: "website",
    locale: "ru_RU",
    url: "https://dantistkem.ru/services",
    siteName: "Стоматология в Кемерово",
  },
  alternates: {
    canonical: "https://dantistkem.ru/services",
  },
};

export default function ServicesPage() {
  return (
    <>
    <section className={styles.container} id="services">
        <Breadcrumbs
            items={[
                { label: "Услуги"}
            ]}
        />
        <h1 className={styles.title}>Наши услуги</h1>
        
        <ServiceGrid />
    </section>
    </>
  );
}
