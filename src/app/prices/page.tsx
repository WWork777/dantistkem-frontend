// app/prices/page.tsx
import Contacts from "@/components/main-page/Contacts/Contacts";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import styles from "./prices.module.scss";

// Метаданные для страницы
export const metadata: Metadata = {
  title: "Цены на стоматологические услуги | Стоматология в Кемерово",
  description:
    "Актуальные цены на стоматологические услуги в Кемерово. Лечение зубов, протезирование, имплантация, гигиена. Прозрачное ценообразование, доступные цены.",
  keywords:
    "цены стоматология Кемерово, стоимость лечения зубов, прайс лист стоматологии, цены на имплантацию, протезирование зубов цена",
  openGraph: {
    title: "Цены на стоматологические услуги | Стоматология в Кемерово",
    description:
      "Актуальные цены на стоматологические услуги в Кемерово. Прозрачное ценообразование.",
    type: "website",
    locale: "ru_RU",
    url: "https://dantistkem.ru/prices",
    siteName: "Стоматология в Кемерово",
  },
  alternates: {
    canonical: "https://dantistkem.ru/prices",
  },
};

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

// Функция для форматирования цены (вынесена отдельно для переиспользования)
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

// Функция для группировки цен
const groupPrices = (prices: StrapiPrice[]): GroupedPrices => {
  return prices.reduce<GroupedPrices>((acc, price) => {
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
};

// Функция для генерации JSON-LD разметки
const generateJsonLd = (
  prices: StrapiPrice[],
  groupedPrices: GroupedPrices,
) => {
  // Создаем список всех услуг для микроразметки
  const services = prices.map((price) => ({
    "@type": "MedicalProcedure",
    name: price.ServiceName,
    description: `Код услуги: ${price.Code}`,
    procedureCategory: price.Category,
    procedureType: price.Type,
    offer: {
      "@type": "Offer",
      price: price.Price.replace(/\s/g, "").split(",")[0].replace(/[^\d]/g, ""),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
    },
  }));

  // Создаем список категорий для навигации
  const categories = Object.keys(groupedPrices).map((category) => ({
    "@type": "CategoryCode",
    name: category,
    description: `Стоматологические услуги в категории ${category}`,
    url: `https://dantistkem.ru/prices#${category.toLowerCase().replace(/\s+/g, "-")}`,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dantistkem.ru/prices",
        url: "https://dantistkem.ru/prices",
        name: "Цены на стоматологические услуги | Стоматология в Кемерово",
        description:
          "Актуальные цены на стоматологические услуги в Кемерово. Лечение зубов, протезирование, имплантация, гигиена.",
        isPartOf: {
          "@id": "https://dantistkem.ru/#website",
        },
        breadcrumb: {
          "@id": "https://dantistkem.ru/prices/#breadcrumb",
        },
        about: {
          "@type": "MedicalBusiness",
          name: "Стоматология в Кемерово",
          description: "Стоматологические услуги с прозрачными ценами",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: service,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://dantistkem.ru/prices/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://dantistkem.ru",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Цены",
            item: "https://dantistkem.ru/prices",
          },
        ],
      },
      {
        "@type": "MedicalBusiness",
        "@id": "https://dantistkem.ru/#organization",
        name: "Стоматология в Кемерово",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Кемерово",
          addressCountry: "RU",
        },
        priceRange: "$$",
        telephone: "+7 (3842) 00-00-00",
        openingHours: "Mo-Fr 09:00-20:00, Sa 10:00-18:00",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Стоматологические услуги",
          itemListElement: categories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.name,
            description: category.description,
            url: category.url,
          })),
        },
      },
    ],
  };
};

// Функция для получения цен на сервере
async function getPrices() {
  try {
    const response = await fetch(
      "https://admin.dantistkem.ru/api/prices?sort[0]=Category&sort[1]=Type&pagination[limit]=1000",
      {
        next: { revalidate: 3600 }, // Перезапрашивать данные каждый час
      },
    );

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке цен: ${response.status}`);
    }

    const data: StrapiResponse = await response.json();
    return { prices: data.data, error: null };
  } catch (err) {
    console.error("Error fetching prices:", err);
    return {
      prices: [],
      error:
        err instanceof Error
          ? err.message
          : "Произошла ошибка при загрузке цен",
    };
  }
}

// Серверный компонент
const PricesPage = async () => {
  const { prices, error } = await getPrices();

  // Группируем цены
  const groupedPrices = groupPrices(prices);

  // Генерируем JSON-LD разметку
  const jsonLd = generateJsonLd(prices, groupedPrices);

  // Обработка ошибки на сервере
  if (error) {
    return (
      <>
        <section className={styles.container}>
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
          <div className={styles.error} role="alert">
            <p>Извините, произошла ошибка при загрузке цен.</p>
            <p className={styles.error_detail}>{error}</p>
            <p>
              Пожалуйста, попробуйте обновить страницу или обратитесь к
              администратору.
            </p>
          </div>
        </section>
        <Contacts />
      </>
    );
  }

  // Обработка пустого списка
  if (prices.length === 0) {
    return (
      <>
        <section className={styles.container}>
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
          <div className={styles.empty}>
            <p>На данный момент нет доступных цен.</p>
            <p>
              Пожалуйста, зайдите позже или свяжитесь с нами для уточнения
              информации.
            </p>
          </div>
        </section>
        <Contacts />
      </>
    );
  }

  return (
    <>
      {/* JSON-LD разметка для Яндекс и других поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Яндекс.Вебмастер мета-теги */}
      <meta name="yandex-verification" content="ваш_код_верификации" />
      <meta name="yandex" content="index, follow" />

      <section className={styles.container}>
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

        {/* Навигация по категориям для улучшения UX и SEO */}
        {/* <nav
          className={styles.category_nav}
          aria-label="Навигация по категориям услуг"
        >
          <h2 className={styles.visually_hidden}>Категории услуг</h2>
          <ul className={styles.category_list}>
            {Object.keys(groupedPrices).map((category) => (
              <li key={category} className={styles.category_item}>
                <a
                  href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className={styles.category_link}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}

        {/* Блок цен */}
        <section className={styles.prices_container}>
          {/* Перебираем все категории */}
          {Object.entries(groupedPrices).map(([category, types]) => (
            <div
              key={category}
              className={styles.section}
              id={category.toLowerCase().replace(/\s+/g, "-")}
              itemScope
              itemType="https://schema.org/MedicalProcedure"
            >
              <h2 className={styles.section_title} itemProp="name">
                {category}
              </h2>
              <meta itemProp="procedureCategory" content={category} />

              <div className={styles.table_wrapper}>
                {/* Перебираем все типы внутри категории */}
                {Object.entries(types).map(([type, services]) => (
                  <React.Fragment key={`${category}-${type}`}>
                    <h3
                      id={type.toLowerCase().replace(/\s+/g, "-")}
                      className={styles.subsection_title}
                      itemProp="procedureType"
                    >
                      {type}
                    </h3>
                    <table className={styles.prices_table}>
                      {/* <caption className={styles.visually_hidden}>
                        Цены на услуги в категории {category} - {type}
                      </caption> */}
                      <thead>
                        <tr className={styles.header_row}>
                          <th className={styles.header_cell} scope="col">
                            Наименование услуги
                          </th>
                          <th className={styles.header_cell_price} scope="col">
                            Цена
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr
                            key={service.id}
                            className={styles.table_row}
                            itemScope
                            itemType="https://schema.org/MedicalProcedure"
                          >
                            <td className={styles.table_cell}>
                              <div
                                className={styles.service_name}
                                itemProp="name"
                              >
                                {service.ServiceName}
                              </div>
                              <div className={styles.service_description}>
                                <span itemProp="code">{service.Code}</span>
                                <meta
                                  itemProp="procedureCategory"
                                  content={category}
                                />
                                <meta itemProp="procedureType" content={type} />
                              </div>
                            </td>
                            <td className={styles.table_cell_price}>
                              <span
                                itemProp="offers"
                                itemScope
                                itemType="https://schema.org/Offer"
                              >
                                <meta itemProp="priceCurrency" content="RUB" />
                                <meta
                                  itemProp="price"
                                  content={service.Price.replace(/\s/g, "")
                                    .split(",")[0]
                                    .replace(/[^\d]/g, "")}
                                />
                                <meta
                                  itemProp="availability"
                                  content="https://schema.org/InStock"
                                />
                                {formatPrice(service.Price)} ₽
                              </span>
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

        {/* SEO-текст для улучшения ранжирования */}
        {/* <div className={styles.seo_text}>
          <h2 className={styles.visually_hidden}>Информация о ценах</h2>
          <p>
            В нашей стоматологии в Кемерово мы предлагаем прозрачное
            ценообразование на все виды услуг. Все цены актуальны на текущую
            дату. Для точного расчета стоимости лечения рекомендуем записаться
            на консультацию к нашему специалисту.
          </p>
        </div> */}
      </section>
      <Contacts />
    </>
  );
};

export default PricesPage;
