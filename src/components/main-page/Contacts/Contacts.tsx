"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface ContactData {
  id: number;
  documentId: string;
  Adres: string;
  PhoneNumber: string;
  Email: string;
  Telegram: string;
  Vk: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Contacts() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContacts = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data?.[0]) {
        setContact(data.data[0]);
      } else {
        throw new Error("Данные контактов не найдены в ответе");
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
    getContacts();
  }, []);

  if (loading) {
    return (
      <section className="container" id="contacts">
        <div className={styles.contacts_container}>
          <div className={styles.loading}>
            <p>Загрузка контактов...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container" id="contacts">
        <div className={styles.contacts_container}>
          <div className={styles.error}>
            <p>Ошибка: {error}</p>
            <button onClick={getContacts} className={styles.retryButton}>
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!contact) {
    return (
      <section className="container" id="contacts">
        <div className={styles.contacts_container}>
          <div className={styles.noData}>
            <p>Контакты не найдены</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container" id="contacts">
      <div className={styles.contacts_container}>
        <div className={styles.map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Af7b04702461d0e7475d070968f606f547f95743f6a1f1dc303f3e35da0dce9cd&amp;source=constructor"
            width="500"
            height="400"
            frameBorder="0"
            title="Карта с расположением клиники"
          ></iframe>
        </div>
        <div className={styles.text}>
          <h2 className={styles.title}>Контакты</h2>
          <div className={styles.text_item}>
            <span>
              Адрес: <br />
            </span>
            <b>{contact.Adres}</b>
          </div>
          <div className={styles.text_item}>
            <span>
              Номер телефона: <br />
            </span>
            <Link href={`tel:${contact.PhoneNumber}`}>
              {contact.PhoneNumber}
            </Link>
            <Link href={`tel:+7 (384) 233 32-05`}>+7 (384-2)333-205</Link>
          </div>
          <div className={styles.text_item}>
            <span>
              E-mail: <br />
            </span>
            <Link href={`mailto:${contact.Email}`}>{contact.Email}</Link>
          </div>
          {contact.Vk && (
            <div className={styles.text_item}>
              <span>
                Социальные сети: <br />
              </span>
              <b>
                <a
                  href={`https://${contact.Vk}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.vkLink}
                >
                  {contact.Vk}
                </a>
              </b>
            </div>
          )}
          {contact.Telegram && (
            <div className={styles.text_item}>
              <span>
                Telegram: <br />
              </span>
              <b>
                <a
                  href={`https://t.me/+${contact.Telegram.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.vkLink}
                >
                  {contact.Telegram}
                </a>
              </b>
            </div>
          )}
        </div>
        
      </div>

      <div className={styles.text}>
          <h3 className={styles.title} style={{ marginTop: "40px", fontSize: "28px" }}>
            Контролирующие организации
          </h3>
          <div className={styles.numbers}>
            <div className={styles.text_item}>
              <span>
                Росздравнадзор (надзор в сфере здравоохранения): <br />
              </span>
              <Link href="tel:+73842441093">+7 (3842) 44-10-93</Link>
              <Link href="tel:+73842441092">+7 (3842) 44-10-92</Link>
            </div>
            <div className={styles.text_item}>
              <span>
                Роспотребнадзор (защита прав потребителей): <br />
              </span>
              <Link href="tel:+73842348788">+7 (3842) 34-87-88</Link>
              <Link href="tel:+73842368788">+7 (3842) 36-87-88</Link>
            </div>
            <div className={styles.text_item}>
              <span>
                Министерство здравоохранения Кузбасса: <br />
              </span>
              <Link href="tel:+73842364284">+7 (3842) 36-42-84</Link>
              <Link href="tel:+73842583655">+7 (3842) 58-36-55</Link>
            </div>
            <div className={styles.text_item}>
              <span>
                Управление лицензирования медико-фармацевтической деятельности: <br />
              </span>
              <Link href="tel:+73842543704">+7 (3842) 54-37-04</Link>
              <Link href="tel:+73842543672">+7 (3842) 54-36-72</Link>
            </div>
            <div className={styles.text_item}>
              <span>
                Отдел по защите прав потребителей администрации г. Кемерово: <br />
              </span>
              <Link href="tel:+73842757510">+7 (3842) 75-75-10</Link>
            </div>
          </div>
          
      </div>
    </section>
  );
}
