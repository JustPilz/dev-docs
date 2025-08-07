import React, { useRef, useState } from "react";
import styles from "./styles.module.css";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  // Управляем явно maxHeight для анимации открытия и закрытия
  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (open) {
      setMaxHeight(`${content.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [open, children]); // если children меняются

  // Для плавности при изменении размера контента
  React.useEffect(() => {
    if (!open) return;
    const content = contentRef.current;
    if (!content) return;
    const onResize = () => {
      setMaxHeight(`${content.scrollHeight}px`);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div className={styles.accordion}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={styles.header}
        aria-expanded={open}
      >
        {title}
      </button>
      <div
        ref={contentRef}
        className={`${styles.content} ${open ? styles.contentOpen : ""}`}
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  );
};
