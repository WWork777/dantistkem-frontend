import styles from "./styles.module.scss"; // или ./license.module.scss, если стили в отдельном файле
import Image from "next/image";

export default function License() {
  return (
    <section className="container" id="license">
      <div className={styles.license_container}>
        <div className={styles.license_text}>
          <h2>Лицензия</h2>
          <p>
            Мы заботимся о вашей безопасности и работаем строго в соответствии с
            законодательством. Наша клиника осуществляет медицинскую
            деятельность на основании официальной лицензии.
          </p>

          <div className={styles.license_info}>
            <span className={styles.license_number}>№ ЛО-42-010002838</span>
            <span className={styles.license_date}>от 17 апреля 2014 года</span>
          </div>
        </div>

        <div className={styles.license_image_container}>
          {/* Если есть скан лицензии, положите его в папку public/license/ */}
          <Image
            src="/about/license.avif" // Укажите правильный путь к изображению
            alt="Лицензия на осуществление медицинской деятельности ЛО-42-010002838"
            width={600}
            height={850}
            className={styles.license_image}
          />
        </div>
      </div>
    </section>
  );
}
