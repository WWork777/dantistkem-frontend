"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SpecialistCardProps {
  title: string;
  image: string;
  link: string;
  name: string;
}

interface SpecialistData {
  id: number;
  documentId: string;
  SpecialistSpecial: string;
  SpecialistName: string;
  SpecilaistImage?: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

function SpecialistsCard({ title, image, name, link }: SpecialistCardProps) {
  return (
    <div className={styles.card_container}>
      <article className={styles.card}>
        <Link href={link} className={styles.card_link}>
          <Image
            src="/specialists/link.svg"
            width={30}
            height={30}
            alt="стрелка"
          />
        </Link>
        <div className={styles.specialists_image_blur}></div>
        <div className={styles.image_wrapper}>
          <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            className={styles.specialists_image}
          />
        </div>
        <div className={styles.specialists_special}>
          <span>{title}</span>
        </div>
      </article>
      <div className={styles.specialists_name}>
        <span>{name}</span>
      </div>
    </div>
  );
}

export default function Specialists() {
  const [specialists, setSpecialists] = useState<SpecialistData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSpecialists = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/specialists?populate=*`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data) {
        setSpecialists(data.data);
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

  const getImageUrl = (image?: SpecialistData["SpecilaistImage"]) => {
    if (!image) {
      return "/specialists/specialist.png";
    }

    const formatUrl =
      image.formats?.medium?.url || image.formats?.small?.url || image.url;

    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${formatUrl}`;
  };

  useEffect(() => {
    getSpecialists();
  }, []);

  if (loading) {
    return (
      <section className="container" id="specialists">
        <div className={styles.loading}>
          <p>Загрузка специалистов...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container" id="specialists">
        <div className={styles.error}>
          <p>Ошибка: {error}</p>
        </div>
      </section>
    );
  }

  if (specialists.length === 0) {
    return (
      <section className="container" id="specialists">
        <div className={styles.noData}>
          <p>Специалисты не найдены</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container" id="specialists">
      <h2 className={styles.title}>Специалисты</h2>
      <p className={styles.description}>
        Наша команда состоит из опытных специалистов, которые используют
        современные технологии и новейшие методы лечения, чтобы гарантировать
        ваше здоровье.
      </p>

      <div className={styles.slider_container}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          className={styles.swiper}
        >
          {specialists.map((specialist) => (
            <SwiperSlide key={specialist.id}>
              <SpecialistsCard
                title={specialist.SpecialistSpecial}
                name={specialist.SpecialistName}
                link={`/specialists/${specialist.documentId}`}
                image={getImageUrl(specialist.SpecilaistImage)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомные кнопки навигации */}
      </div>
    </section>
  );
}
