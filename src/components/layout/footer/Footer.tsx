"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";

interface ContactData {
  id: number;
  documentId: string;
  Adres: string;
  PhoneNumber: string;
  Email: string;
  Vk: string | null;
  Telegram: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  SecondPhoneNumber: string;
}

export default function Footer() {
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

  // Функция для очистки номера телефона от всех нецифровых символов
  const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, "");
  };

  // Функция для создания Telegram ссылки
  const getTelegramLink = (phone: string) => {
    const cleanPhone = cleanPhoneNumber(phone);
    return `https://t.me/+${cleanPhone}`;
  };

  // Функция для создания WhatsApp ссылки
  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = cleanPhoneNumber(phone);
    return `https://wa.me/${cleanPhone}`;
  };

  if (loading) {
    return (
      <section className={styles.footer}>
        <div className={styles.loading}>
          <p>Загрузка контактов...</p>
        </div>
      </section>
    );
  }

  if (error || !contact) {
    return (
      <section className={styles.footer}>
        <div className={styles.error}>
          <p>Ошибка загрузки контактов</p>
          <button onClick={getContacts} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.footer}>
      <div className={styles.footer_left}>
        <div className={styles.footer_left_container}>
          <div className={styles.footer_left_item}>
            <img src="/logo/logo.svg" alt="Логотип стоматологической клиники" />
            <p>ООО "Дантистъ"</p>
            <p>ИНН: 4205161052</p>
            <p>ОГРН: 1084205014013</p>
            <p>КПП: 420501001</p>
            <p>Юр. адрес: 650070, г. Кемерово, ул. Свободы 6, 97</p>
            <p>Ген. директор - учредитель: Дудин Тимур Вениаминович</p>
          </div>
        </div>
      </div>
      <div className={styles.footer_center}>
        <div className={styles.footer_center_top}>
          <Link href="/#about" className={styles.footer_center_link}>
            <p>О нас</p>
          </Link>
          <Link href="/#services" className={styles.footer_center_link}>
            <p>Услуги</p>
          </Link>
          <Link href="/#specialists" className={styles.footer_center_link}>
            <p>Специалисты</p>
          </Link>
        </div>
        <div className={styles.footer_center_top}>
          <Link href="/#license" className={styles.footer_center_link}>
            <p>Лицензии</p>
          </Link>
          <Link href="/#contacts" className={styles.footer_center_link}>
            <p>Контакты</p>
          </Link>
        </div>
      </div>
      <div className={styles.footer_rigth}>
        <div className={styles.footer_rigth__item}>
          <Link href={`tel:${cleanPhoneNumber(contact.PhoneNumber)}`}>
            <p>{contact.PhoneNumber}</p>
          </Link>
          <div className={styles.footer_line}>|</div>
          {/* Если нужен второй телефон, добавьте поле в Strapi */}
          <Link href={`tel:${cleanPhoneNumber(contact.SecondPhoneNumber)}`}>
            <p>{contact.SecondPhoneNumber}</p>
          </Link>
          <div className={styles.footer_line}>|</div>
          <Link href={`tel:+7 (384) 233 32-05`}>
            <p>+7 (384-2) 333-205</p>
          </Link>
        </div>
        <div className={styles.footer_rigth__item}>
          <div className={styles.footer_schedule}>
            <p>Режим работы:</p>
            <p>Пн-Пт: 09:00 - 19:00</p>
            <p>Сб: 10:00 - 15:00 | Вс: Выходной</p>
          </div>
        </div>
        <div className={styles.footer_rigth__item}>
          <Link href={`mailto:${contact.Email}`}>
            <p>{contact.Email}</p>
          </Link>
        </div>
        <div className={styles.footer_socials}>
          {/* WhatsApp ссылка */}
          <Link
            href={getWhatsAppLink(contact.PhoneNumber)}
            className={styles.footer_socials_link}
            target="_blank"
            rel="noopener noreferrer"
            title="Написать в WhatsApp"
          >
            <img src="/socials/wa.svg" alt="WhatsApp" height={50} width={50} />
          </Link>

          {/* VK ссылка - показываем только если есть в Strapi */}
          {contact.Vk && (
            <Link
              href={`https://${contact.Vk}`}
              className={styles.footer_socials_link}
              target="_blank"
              rel="noopener noreferrer"
              title="ВКонтакте"
            >
              <img
                src="/socials/vk.svg"
                alt="ВКонтакте"
                height={50}
                width={50}
              />
            </Link>
          )}

          {/* Telegram ссылка */}
          <Link
            href={getTelegramLink(contact.Telegram)}
            className={styles.footer_socials_link}
            target="_blank"
            rel="noopener noreferrer"
            title="Написать в Telegram"
          >
            <img src="/socials/tg.svg" alt="Telegram" height={50} width={50} />
          </Link>
        </div>
      </div>
    </section>
  );
}
