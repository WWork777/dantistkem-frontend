// components/CookieConsent/CookieConsent.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли уже согласие в localStorage
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Небольшая задержка перед показом для плавности
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsAnimating(false);
    // Задержка для анимации скрытия
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "accepted");
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    setIsAnimating(false);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "declined");
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.overlay} ${isAnimating ? styles.visible : ""}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>🍪</div>
          <div className={styles.text}>
            <h3>Мы используем cookies</h3>
            <p>
              Продолжая использовать наш сайт, вы даете согласие на обработку
              файлов cookies и пользовательских данных.
            </p>
          </div>
          <div className={styles.buttons}>
            <button onClick={handleAccept} className={styles.acceptBtn}>
              Принять
            </button>
            <button onClick={handleDecline} className={styles.declineBtn}>
              Отклонить
            </button>
          </div>
          {/* <Link href="/privacy-policy" className={styles.link}>
            Политика конфиденциальности
          </Link> */}
        </div>
      </div>
    </div>
  );
}
