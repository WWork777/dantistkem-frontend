import Hero from "@/components/main-page/Hero/Hero";
import About from "@/components/main-page/about/About";
import Services from "@/components/main-page/Services/Services";
import Specialists from "@/components/main-page/Specialists/Specialists";
import ReviewsSlider from "@/components/main-page/rewievs-slider/rewievs-slider";
import Contacts from "@/components/main-page/Contacts/Contacts";

export async function generateMetadata() {
  const canonicalURL = "https://ваш-сайт.рф";
  const title =
    "Стоматология в Кемерово | Качественное лечение зубов, имплантация";
  const description =
    "Современная стоматологическая клиника в Кемерово. Лечение кариеса, имплантация, протезирование, отбеливание, детская стоматология. Опытные врачи, новейшее оборудование, безболезненное лечение.";
  const keywords =
    "стоматология Кемерово, лечение зубов Кемерово, имплантация зубов Кемерово, протезирование зубов, отбеливание зубов, детский стоматолог Кемерово, стоматолог цены, клиника стоматологии";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalURL,
    },
    openGraph: {
      title: `${title} | Стоматология Тридцать Два`,
      description: description,
      url: canonicalURL,
      siteName: "Стоматология Тридцать Два - Кемерово",
      images: [
        {
          url: `${canonicalURL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Стоматологическая клиника в Кемерово",
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${canonicalURL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Дополнительные мета-теги
    verification: {
      google: "ваш-google-verification-code",
      yandex: "ваш-yandex-verification-code",
    },
    authors: [{ name: "Стоматология Тридцать Два" }],
    creator: "Стоматология Тридцать Два",
    publisher: "Стоматология Тридцать Два",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    // Структурированные данные для поисковых систем
    other: {
      "application/ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "Стоматология Тридцать Два",
          description: description,
          url: canonicalURL,
          logo: `${canonicalURL}/logo.png`,
          image: `${canonicalURL}/clinic-photo.jpg`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Ленина 67А",
            addressLocality: "Кемерово",
            postalCode: "650000",
            addressCountry: "RU",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "55.354968",
            longitude: "86.086774",
          },
          telephone: "+7-900-000-00-00",
          openingHours: "Mo-Fr 09:00-21:00, Sa 10:00-18:00, Su 10:00-16:00",
          priceRange: "$$",
          medicalSpecialty: [
            "Dentistry",
            "Orthodontics",
            "Prosthodontics",
            "Oral Surgery",
          ],
          service: [
            "Лечение зубов",
            "Имплантация",
            "Протезирование",
            "Отбеливание",
            "Исправление прикуса",
            "Детская стоматология",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Стоматология Тридцать Два",
          description: description,
          url: canonicalURL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Ленина 67А",
            addressLocality: "Кемерово",
            postalCode: "650000",
            addressCountry: "RU",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "55.354968",
            longitude: "86.086774",
          },
          telephone: "+7-900-000-00-00",
          openingHours: [
            "Mo-Fr 09:00-21:00",
            "Sa 10:00-18:00",
            "Su 10:00-16:00",
          ],
          priceRange: "$$",
        },
      ]),
    },
  };
}

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Specialists />
      <ReviewsSlider />
      <Contacts />
    </div>
  );
}
