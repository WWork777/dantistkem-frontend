"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

interface ContactData {
  id: number;
  documentId: string;
  Adres: string;
  PhoneNumber: string;
  Email: string;
  Vk: string | null;
  Telegram: string;
  SecondPhoneNumber: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(false);

  // Функция для получения контактов
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
        console.warn("Данные контактов не найдены в ответе");
      }
    } catch (err) {
      console.error("Ошибка при загрузке контактов:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Функции для создания ссылок
  const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, "");
  };

  const getTelegramLink = (phone: string) => {
    const cleanPhone = cleanPhoneNumber(phone);
    return `https://t.me/+${cleanPhone}`;
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = cleanPhoneNumber(phone);
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled && !menuOpen ? styles.scrolled : ""
      }`}
    >
      <div>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo/logo.svg"
              alt="Логотип"
              width={1920}
              height={1080}
              priority
              className={`${styles.logo_white} ${
                isScrolled ? styles.visible : styles.hidden
              }`}
            />
            <Image
              src="/logo/logo-white.svg"
              alt="Логотип"
              width={1920}
              height={1080}
              priority
              className={`${styles.logo_black} ${
                !isScrolled ? styles.visible : styles.hidden
              }`}
            />
          </Link>

          {/* Навигация desktop */}
          <nav className={styles.nav}>
            <Link href="/#about">О нас</Link>
            <Link href="/#services">Услуги</Link>
            <Link href="/#specialists">Специалисты</Link>
            <Link href="#">Лицензии</Link>
            <Link href="/#contacts">Контакты</Link>
          </nav>

          {/* Контакты и кнопка */}
          <div className={styles.actions}>
            <div className={styles.contacts}>
              <div className={styles.socials}>
                {/* Telegram */}
                {contact?.Telegram && (
                  <Link
                    href={getTelegramLink(contact.Telegram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                  >
                    <Image
                      src="/socials/tg-white.svg"
                      alt="Telegram"
                      width={30}
                      height={30}
                      className={` ${
                        !isScrolled ? styles.visible : styles.hidden
                      }`}
                    />
                    <Image
                      src="/socials/tg.svg"
                      alt="Telegram"
                      width={30}
                      height={30}
                      className={` ${
                        isScrolled ? styles.visible : styles.hidden
                      }`}
                    />
                  </Link>
                )}

                {/* WhatsApp */}
                {contact?.PhoneNumber && (
                  <Link
                    href={getWhatsAppLink(contact.PhoneNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <Image
                      src="/socials/wa-white.svg"
                      alt="WhatsApp"
                      width={30}
                      height={30}
                      className={` ${
                        !isScrolled ? styles.visible : styles.hidden
                      }`}
                    />
                    <Image
                      src="/socials/wa.svg"
                      alt="WhatsApp"
                      width={30}
                      height={30}
                      className={` ${
                        isScrolled ? styles.visible : styles.hidden
                      }`}
                    />
                  </Link>
                )}
              </div>

              {/* Основной номер телефона */}
              {contact?.PhoneNumber && (
                <a
                  href={`tel:${cleanPhoneNumber(contact.PhoneNumber)}`}
                  className={styles.phone}
                >
                  {contact.PhoneNumber}
                </a>
              )}

              {!contact && !loading && (
                <a href="#" className={styles.phone}>
                  +7 900 000 00-00
                </a>
              )}
            </div>
          </div>

          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`${styles.mobileMenuOverlay} ${
          menuOpen ? styles.mobileMenuOverlayActive : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileMenuActive : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={styles.mobile_logo_container}
          >
            <img
              src="/logo/logo.svg"
              alt="Логотип"
              className={styles.mobile_logo}
            />
          </Link>
          <nav>
            <Link href="#about" onClick={() => setMenuOpen(false)}>
              О нас
            </Link>
            <Link href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </Link>
            <Link href="#specialists" onClick={() => setMenuOpen(false)}>
              Специалисты
            </Link>
            <Link href="#" onClick={() => setMenuOpen(false)}>
              Лицензии
            </Link>
            <Link href="#contacts" onClick={() => setMenuOpen(false)}>
              Контакты
            </Link>
          </nav>
          <div className={styles.mobileContacts}>
            {/* Основной телефон в мобильном меню */}
            {contact?.PhoneNumber && (
              <Link href={`tel:${cleanPhoneNumber(contact.PhoneNumber)}`}>
                <span>{contact.PhoneNumber}</span>
              </Link>
            )}

            {/* Второй телефон в мобильном меню */}
            {contact?.SecondPhoneNumber && (
              <Link href={`tel:${cleanPhoneNumber(contact.SecondPhoneNumber)}`}>
                <span>{contact.SecondPhoneNumber}</span>
              </Link>
            )}

            {(!contact ||
              (!contact.PhoneNumber && !contact.SecondPhoneNumber)) && (
              <Link href="tel:+7 900 000 00-00">
                <span>+7 900 000 00-00</span>
              </Link>
            )}

            <div className={styles.socials}>
              {/* VK в мобильном меню */}
              {contact?.Vk && (
                <Link
                  href={`https://${contact.Vk}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/socials/vk.svg"
                    alt="ВКонтакте"
                    width={24}
                    height={24}
                  />
                </Link>
              )}

              {/* WhatsApp в мобильном меню */}
              {contact?.PhoneNumber && (
                <Link
                  href={getWhatsAppLink(contact.PhoneNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/socials/wa.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </Link>
              )}

              {/* Telegram в мобильном меню */}
              {contact?.Telegram && (
                <Link
                  href={getTelegramLink(contact.Telegram)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/socials/tg.svg"
                    alt="Telegram"
                    width={24}
                    height={24}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
