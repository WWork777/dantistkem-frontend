"use client";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef, useEffect } from "react";

interface ReviewData {
  id: number;
  documentId: string;
  RewieName: string;
  RewieDate: string;
  RewieText: string;
  RewieStars?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface AggregatorData {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  ratingsCount: number;
  icon: string;
}

interface SliderCardProps {
  name: string;
  date: string;
  stars: string;
  text: string;
}

const SliderCard = ({ name, date, stars, text }: SliderCardProps) => {
  return (
    <div className={styles.slider_card}>
      <h3>{name}</h3>
      <span>{date}</span>
      <div className={styles.stars_container}>
        {Array.from({ length: parseInt(stars) || 5 }, (_, i) => (
          <img key={i} src="/rewievs/star.svg" alt="star" />
        ))}
      </div>
      <p>{text}</p>
      <b>Читать полностью</b>
    </div>
  );
};

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAggregator, setActiveAggregator] = useState<string>("all");
  const swiperRef = useRef<any>(null);

  // Данные агрегаторов
  const aggregatorsData: AggregatorData[] = [
    {
      id: "all",
      name: "Все отзывы",
      rating: 4.6,
      reviewsCount: 209,
      ratingsCount: 456,
      icon: "",
    },
    {
      id: "prodoktorov",
      name: "ПРОдокторов",
      rating: 4.8,
      reviewsCount: 156,
      ratingsCount: 156,
      icon: "/rewievs/prodoktorov-icon.svg",
    },
    {
      id: "yandex",
      name: "Яндекс",
      rating: 4.5,
      reviewsCount: 89,
      ratingsCount: 245,
      icon: "/rewievs/yandex-icon.svg",
    },
    {
      id: "2gis",
      name: "2GIS",
      rating: 4.3,
      reviewsCount: 45,
      ratingsCount: 55,
      icon: "/rewievs/2gis-icon.svg",
    },
  ];

  const getReviews = async () => {
    try {
      setLoading(true);

      // Используем правильный endpoint
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rewies`;
      console.log("Запрос к:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Полученные данные:", data);

      // Проверяем структуру ответа Strapi
      if (data?.data) {
        setReviews(data.data);
      } else {
        console.warn("Неожиданный формат данных:", data);
        setReviews([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(errorMessage);
      console.error("Ошибка при загрузке отзывов:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const currentAggregator =
    aggregatorsData.find((agg) => agg.id === activeAggregator) ||
    aggregatorsData[0];

  const handleAggregatorChange = (aggregatorId: string) => {
    setActiveAggregator(aggregatorId);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };

  if (loading) {
    return (
      <section id="reviews" className="container">
        <div className={styles.loading}>
          <p>Загрузка отзывов...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="container">
        <div className={styles.error}>
          <p>Ошибка: {error}</p>
          <button onClick={getReviews} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="container">
        <div className={styles.noData}>
          <p>Отзывы не найдены</p>
          <p>Добавьте отзывы в Strapi</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="reviews" className="container">
        <div className={styles.rewievs_container}>
          <div className={styles.rewievs_container__top}>
            <div>
              <h2 className={styles.title}>Отзывы</h2>
            </div>
            <div className={`${styles.custom_navigation}`}>
              <div className={`${styles.custom_prev}`}></div>
              <div className={`${styles.custom_next}`}></div>
            </div>
          </div>
          <div className={styles.rewievs_container__bottom}>
            <div className={styles.rating}>
              <h3>{currentAggregator.rating}</h3>
              <div className={styles.rewievs_name}>
                <div className={styles.rewievs_geo}>
                  {currentAggregator.icon && (
                    <img src="/rewievs/geo.svg" alt={currentAggregator.name} />
                  )}
                  <p>{currentAggregator.name}</p>
                </div>
                <div className={styles.summary_marks}>
                  <p>{currentAggregator.ratingsCount} оценок</p>
                </div>
              </div>
              <div className={styles.rewievs_button}>
                <button>
                  <p>Оставить отзыв</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.home_team_slider}>
          <Swiper
            modules={[Navigation, Pagination]}
            className={styles.mySwiper}
            spaceBetween={20}
            slidesPerView="auto"
            navigation={{
              nextEl: `.${styles.custom_next}`,
              prevEl: `.${styles.custom_prev}`,
              disabledClass: "swiper-button-disabled",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            onInit={(swiper) => {
              swiperRef.current = swiper;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <SliderCard
                  name={review.RewieName}
                  date={review.RewieDate}
                  text={review.RewieText}
                  stars={review.RewieStars || "5"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
