"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface ReviewData {
  id: number;
  documentId: string;
  RewieName: string;
  RewieDate: string;
  RewieText: string;
  RewieStars?: string;
  Source?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface AggregatorData {
  id: string;
  name: string;
  rating: string; // Изменил на string для фиксации decimal
  reviewsCount: number;
  icon: string;
}

interface SliderCardProps {
  name: string;
  date: string;
  stars: string;
  text: string;
  onClick: () => void;
}

const SliderCard = ({ name, date, stars, text, onClick }: SliderCardProps) => {
  return (
    <div className={styles.slider_card} onClick={onClick}>
      <div className={styles.card_content}>
        <h3>{name}</h3>
        <span>{date}</span>
        <div className={styles.stars_container}>
          {Array.from({ length: parseInt(stars) || 5 }, (_, i) => (
            <img key={i} src="/rewievs/star.svg" alt="star" />
          ))}
        </div>
        <p className={styles.review_text}>{text}</p>
      </div>
      <b className={styles.read_more}>Читать полностью</b>
    </div>
  );
};

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAggregator, setActiveAggregator] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const swiperRef = useRef<any>(null);

  const getReviews = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rewies?pagination[pageSize]=100`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
      const data = await response.json();
      if (data?.data) setReviews(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  // --- ДИНАМИЧЕСКИЙ ПОДСЧЕТ СТАТИСТИКИ ---
  const aggregatorsStats = useMemo(() => {
    const stats = [
      { id: "all", name: "Все отзывы", icon: "" },
      {
        id: "prodoktorov",
        name: "ПРОдокторов",
        icon: "/rewievs/prodoktorov-icon.svg",
      },
      { id: "yandex", name: "Яндекс", icon: "/rewievs/yandex-icon.svg" },
      { id: "gis", name: "2GIS", icon: "/rewievs/2gis-icon.svg" },
    ];

    return stats.map((agg) => {
      const filtered = reviews.filter((r) =>
        agg.id === "all"
          ? true
          : r.Source?.toLowerCase() === agg.id.toLowerCase(),
      );

      const count = filtered.length;
      const sum = filtered.reduce(
        (acc, curr) => acc + parseInt(curr.RewieStars || "5"),
        0,
      );
      const average = count > 0 ? (sum / count).toFixed(1) : "0.0";

      return {
        ...agg,
        rating: average,
        reviewsCount: count,
      };
    });
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (activeAggregator === "all") return true;
      return review.Source?.toLowerCase() === activeAggregator.toLowerCase();
    });
  }, [reviews, activeAggregator]);

  const currentAggregator =
    aggregatorsStats.find((agg) => agg.id === activeAggregator) ||
    aggregatorsStats[0];

  const handleAggregatorChange = (aggregatorId: string) => {
    setActiveAggregator(aggregatorId);
    if (swiperRef.current) swiperRef.current.slideTo(0);
  };

  if (loading)
    return (
      <section className="container">
        <div className={styles.loading}>Загрузка...</div>
      </section>
    );
  if (error)
    return (
      <section className="container">
        <div className={styles.error}>
          {error} <button onClick={getReviews}>Повторить</button>
        </div>
      </section>
    );

  return (
    <section id="reviews" className="container">
      <div className={styles.rewievs_container}>
        <div className={styles.rewievs_header_wrapper}>
          <div className={styles.rewievs_header_main}>
            <h2 className={styles.title}>Отзывы</h2>
            <div className={styles.custom_navigation}>
              <div className={styles.custom_prev}></div>
              <div className={styles.custom_next}></div>
            </div>
          </div>

          <div className={styles.rewievs_buttons}>
            {aggregatorsStats.map((agg) => (
              <button
                key={agg.id}
                className={activeAggregator === agg.id ? styles.active : ""}
                onClick={() => handleAggregatorChange(agg.id)}
              >
                <p>
                  {agg.name} <span>({agg.reviewsCount})</span>
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.rewievs_container__bottom}>
          <div className={styles.rating}>
            <h3>{currentAggregator.rating}</h3>
            <div className={styles.rewievs_name}>
              <div className={styles.rewievs_geo}>
                {currentAggregator.icon && (
                  <img src="/rewievs/geo.svg" alt="" />
                )}
                <p>{currentAggregator.name}</p>
              </div>
              <div className={styles.summary_marks}>
                <p>{currentAggregator.reviewsCount} отзывов получено</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.home_team_slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          className={styles.mySwiper}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: `.${styles.custom_next}`,
            prevEl: `.${styles.custom_prev}`,
          }}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {filteredReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <SliderCard
                name={review.RewieName}
                date={review.RewieDate}
                text={review.RewieText}
                stars={review.RewieStars || "5"}
                onClick={() => setSelectedReview(review)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedReview && (
        <div
          className={styles.modal_overlay}
          onClick={() => setSelectedReview(null)}
        >
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.close_button}
              onClick={() => setSelectedReview(null)}
            >
              &times;
            </button>
            <div className={styles.modal_header}>
              <h3>{selectedReview.RewieName}</h3>
              <span>{selectedReview.RewieDate}</span>
              <div className={styles.stars_container}>
                {Array.from(
                  { length: parseInt(selectedReview.RewieStars || "5") },
                  (_, i) => (
                    <img key={i} src="/rewievs/star.svg" alt="star" />
                  ),
                )}
              </div>
            </div>
            <div className={styles.modal_body}>
              <p>{selectedReview.RewieText}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
