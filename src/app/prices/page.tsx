"use client";
import Contacts from "@/components/main-page/Contacts/Contacts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./prices.module.scss";

interface Props {
  className?: string;
}

// Интерфейс для цены из Strapi
interface StrapiPrice {
  id: number;
  documentId: string;
  ServiceName: string;
  Price: string;
  Code: string;
  Category: string;
  Type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Интерфейс для ответа от Strapi
interface StrapiResponse {
  data: StrapiPrice[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Интерфейс для сгруппированных данных
interface GroupedPrices {
  [category: string]: {
    [type: string]: StrapiPrice[];
  };
}

const PricesPage: React.FC<Props> = ({ className }) => {
  const [prices, setPrices] = useState<StrapiPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        // Добавляем сортировку по категории и типу
        const response = await fetch(
          "https://admin.dantistkem.ru/api/prices?sort[0]=Category&sort[1]=Type",
        );

        if (!response.ok) {
          throw new Error("Ошибка при загрузке цен");
        }

        const data: StrapiResponse = await response.json();
        setPrices(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Группируем цены по категориям и типам
  const groupedPrices = prices.reduce<GroupedPrices>((acc, price) => {
    const category = price.Category;
    const type = price.Type;

    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][type]) {
      acc[category][type] = [];
    }
    acc[category][type].push(price);

    return acc;
  }, {});

  // Функция для форматирования цены
  const formatPrice = (price: string) => {
    if (price.includes(",")) {
      return price.replace(",", " / ");
    }
    // Убираем пробелы и преобразуем в число для форматирования
    const numericPrice = parseInt(price.replace(/\s/g, ""));
    if (!isNaN(numericPrice)) {
      return numericPrice.toLocaleString();
    }
    return price;
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.loading}>Загрузка цен...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container}>
        <div className={styles.error}>Ошибка: {error}</div>
      </section>
    );
  }

  return (
    <>
      <section className={`${styles.container} ${className || ""}`}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <div className={styles.breadcrumbItem}>
            <Link href="/" className={styles.link}>
              <span>Главная</span>
            </Link>
            <span className={styles.separator}>/</span>
          </div>
          <div className={styles.breadcrumbItem}>
            <span className={styles.currentPage} aria-current="page">
              Цены
            </span>
          </div>
        </nav>

        <h1 className={styles.title}>Цены на услуги</h1>

        {/* Блок цен */}
        <section className={styles.prices_container}>
          {/* Перебираем все категории */}
          {Object.entries(groupedPrices).map(([category, types]) => (
            <div key={category} className={styles.section}>
              <h2 className={styles.section_title}>{category}</h2>
              <div className={styles.table_wrapper}>
                {/* Перебираем все типы внутри категории */}
                {Object.entries(types).map(([type, services]) => (
                  <React.Fragment key={`${category}-${type}`}>
                    <h3 className={styles.subsection_title}>{type}</h3>
                    <table className={styles.prices_table}>
                      <thead>
                        <tr className={styles.header_row}>
                          <th className={styles.header_cell}>
                            Наименование услуги
                          </th>
                          <th className={styles.header_cell_price}>Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.id} className={styles.table_row}>
                            <td className={styles.table_cell}>
                              <div className={styles.service_name}>
                                {service.ServiceName}
                              </div>
                              <div className={styles.service_description}>
                                Код: {service.Code}
                              </div>
                            </td>
                            <td className={styles.table_cell_price}>
                              {formatPrice(service.Price)} ₽
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
      <Contacts />
    </>
  );
};

export default PricesPage;
