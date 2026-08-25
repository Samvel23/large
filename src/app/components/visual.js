"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Ensure path matches your project structure

const uiTranslations = {
  headerBadge: {
    hy: "Ծառայությունների Ցանկ",
    ru: "Список услуг",
    en: "Services List",
  },
  title: {
    hy: "Ինչ ենք առաջարկում",
    ru: "Что мы предлагаем",
    en: "What We Offer",
  },
  subtitle: {
    hy: "Բարձրորակ դիզայն, պրոֆեսիոնալ տպագրություն և թվային համալիր լուծումներ",
    ru: "Высококачественный дизайн, профессиональная печать и комплексные цифровые решения",
    en: "High-quality design, professional printing, and comprehensive digital solutions",
  },
  placeholder: {
    hy: "Ընտրեք ծառայությունը՝ մանրամասները տեսնելու համար",
    ru: "Выберите услугу, чтобы увидеть подробности",
    en: "Select a service to view details",
  },
};

const servicesData = [
  {
    id: "env-design",
    name: {
      hy: "Միջավայրի դիզայն",
      ru: "Дизайн среды",
      en: "Environmental Design",
    },
    description: {
      hy: "Միջավայրի և ինտերիերի դիզայնի պատրաստում, տարածքային ձևավորում:",
      ru: "Проектирование среды и интерьера, пространственное оформление.",
      en: "Environmental and interior design, spatial decoration.",
    },
    image: "/services/environment.jpeg",
  },
  {
    id: "graphic-design",
    name: {
      hy: "Գրաֆիկական դիզայն",
      ru: "Графический дизайн",
      en: "Graphic Design",
    },
    description: {
      hy: "Բրենդինգ, լոգոների պատրաստում և վիզուալ կոնցեպտների մշակում:",
      ru: "Брендинг, создание логотипов и разработка визуальных концепций.",
      en: "Branding, logo creation, and visual concept development.",
    },
    image: "/services/gdesign.jpg",
  },
  {
    id: "printing",
    name: {
      hy: "Տպագրություն",
      ru: "Полиграфия и печать",
      en: "Printing Services",
    },
    subServices: [
      {
        id: "3-1",
        name: {
          hy: "Data Matrix և Շտրիխ կոդեր",
          ru: "Data Matrix и штрихкоды",
          en: "Data Matrix & Barcodes",
        },
        description: {
          hy: "Ապրանքների մակնշման շտրիխ կոդերի և Data Matrix տպագրություն:",
          ru: "Печать штрихкодов и Data Matrix для маркировки товаров.",
          en: "Printing product labeling barcodes and Data Matrix codes.",
        },
        images: ["/services/dmatrix.jpeg", "/services/dmatrix1.PNG"],
      },
      {
        id: "3-2",
        name: {
          hy: "Հայաֆիկացման ինքնակպչուներ",
          ru: "Наклейки для арменизации",
          en: "Armenian Localization Stickers",
        },
        description: {
          hy: "Ապրանքների հայերեն մակնշման ինքնակպչուն պիտակներ:",
          ru: "Самоклеящиеся этикетки для маркировки товаров на армянском языке.",
          en: "Self-adhesive stickers for product labeling in Armenian.",
        },
      },
      {
        id: "3-3",
        name: {
          hy: "Բրենդային ինքնակպչուներ (Ստիկերներ) և օրակալներ",
          ru: "Фирменные стикеры и оракал",
          en: "Branded Stickers & Oracal Printing",
        },
        description: {
          hy: "Հատուկ ձևավորմամբ ստիկերների և օրակալների տպագրում:",
          ru: "Печать стикеров с индивидуальным дизайном и пленки Oracal.",
          en: "Printing custom-designed stickers and Oracal vinyl films.",
        },
        image: "/services/stickers.jpeg",
      },
      {
        id: "3-4",
        name: {
          hy: "Գունավոր Ա3+ տպագրություն",
          ru: "Цветная печать A3+",
          en: "Full-Color A3+ Printing",
        },
        description: {
          hy: "Բարձրորակ գունավոր տպագրություն A3+ ֆորմատով:",
          ru: "Высококачественная цветная печать формата A3+.",
          en: "High-quality full-color printing in A3+ format.",
        },
      },
      {
        id: "3-5",
        name: {
          hy: "Պատճենահանում, սկանավորում",
          ru: "Копирование и сканирование",
          en: "Photocopying & Scanning",
        },
        description: {
          hy: "Փաստաթղթերի արագ պատճենահանում և բարձր կետայնությամբ սկանավորում:",
          ru: "Быстрое копирование документов и сканирование высокого разрешения.",
          en: "Fast document photocopying and high-resolution scanning.",
        },
      },
      {
        id: "3-6",
        name: {
          hy: "DVD կրիչների վրա տպագրություն",
          ru: "Печать на DVD дисках",
          en: "DVD Surface Printing",
        },
        description: {
          hy: "Տպագրություն DVD սկավառակների մակերեսին:",
          ru: "Печать непосредственно на поверхности DVD-дисков.",
          en: "Direct surface printing on DVD media discs.",
        },
        image: "/services/dvd.jpeg",
      },
    ],
  },
  {
    id: "lamination",
    name: {
      hy: "Կոշտ և փափուկ լամինացիա",
      ru: "Жесткая и мягкая ламинация",
      en: "Hard & Soft Lamination",
    },
    description: {
      hy: "Տարբեր հաստության կոշտ և փափուկ փայլուն կամ մատովի լամինացում:",
      ru: "Глянцевая и матовая ламинация различной толщины (жесткая и мягкая).",
      en: "Glossy and matte lamination of varying thickness (hard and soft).",
    },
  },
  {
    id: "binding",
    name: {
      hy: "Կամարարական աշխատանք",
      ru: "Переплетные работы",
      en: "Bookbinding & Finishing",
    },
    subServices: [
      {
        id: "5-1",
        name: {
          hy: "Գրքեր",
          ru: "Книги",
          en: "Books",
        },
        description: {
          hy: "Գրքերի կազմում, վերականգնում և կազմարարություն:",
          ru: "Переплет, реставрация и брошюровка книг.",
          en: "Bookbinding, restoration, and finishing services.",
        },
      },
      {
        id: "5-2",
        name: {
          hy: "Ալբոմներ, ֆոտոալբոմներ, վինետկաներ",
          ru: "Альбомы, фотоальбомы и виньетки",
          en: "Albums, Photo Albums & Vignettes",
        },
        description: {
          hy: "Ֆոտոալբոմների և վինետկաների պրոֆեսիոնալ պատրաստում:",
          ru: "Профессиональное изготовление фотоальбомов и виньеток.",
          en: "Professional production of photo albums and school vignettes.",
        },
      },
      {
        id: "5-3",
        name: {
          hy: "Ռեֆերատների կազմում",
          ru: "Переплет рефератов",
          en: "Essay & Report Binding",
        },
        description: {
          hy: "Ուսանողական և դպրոցական ռեֆերատների կազմարարություն:",
          ru: "Переплет студенческих и школьных рефератов.",
          en: "Binding services for student and school reports/essays.",
        },
      },
      {
        id: "5-4",
        name: {
          hy: "Մասնագիտական աշխատանքների կազմում",
          ru: "Переплет дипломных работ",
          en: "Thesis & Dissertation Binding",
        },
        description: {
          hy: "Ավարտական աշխատանքների, դիպլոմների և ատենախոսությունների կազմում:",
          ru: "Переплет дипломных, выпускных и диссертационных работ.",
          en: "Hardcover binding for diplomas, graduation theses, and dissertations.",
        },
      },
    ],
  },
  {
    id: "badges",
    name: {
      hy: "Կրծքանշաններ, բեյջեր և բրիլոկներ",
      ru: "Значки, бейджи и брелоки",
      en: "Badges, Nametags & Keychains",
    },
    description: {
      hy: "Անհատական դիզայնով կրծքանշանների, բեյջերի և բանալու կախիչների պատրաստում:",
      ru: "Изготовление значков, бейджей и брелоков с индивидуальным дизайном.",
      en: "Custom production of badges, ID cards/nametags, and keychains.",
    },
    image: "/services/badges.jpg",
  },
  {
    id: "media",
    name: {
      hy: "Վիդեո և ֆոտո նկարահանումներ և մոնտաժ",
      ru: "Фото и видеосъемка, монтаж",
      en: "Photo & Video Production",
    },
    subServices: [
      {
        id: "7-1",
        name: {
          hy: "Ծննդյան միջոցառումներ",
          ru: "Дни рождения",
          en: "Birthday Events",
        },
        description: {
          hy: "Ծննդյան տոների պրոֆեսիոնալ նկարահանում և մոնտաժ:",
          ru: "Профессиональная съемка и монтаж дней рождения.",
          en: "Professional shooting and editing for birthday celebrations.",
        },
      },
      {
        id: "7-2",
        name: {
          hy: "Ավարտական միջոցառումներ",
          ru: "Выпускные мероприятия",
          en: "Graduation Events",
        },
        description: {
          hy: "Վերջին զանգի և ավարտական երեկոների նկարահանում:",
          ru: "Съемка Последнего звонка и выпускных вечеров.",
          en: "Photo and video coverage for graduation ceremonies and galas.",
        },
      },
      {
        id: "7-3",
        name: {
          hy: "Հանդեսներ",
          ru: "Детские утренники",
          en: "School & Kindergarten Shows",
        },
        description: {
          hy: "Մանկապարտեզային և դպրոցական հանդեսների նկարահանում:",
          ru: "Съемка детских праздников в детских садах и школах.",
          en: "Video coverage for school and kindergarten performances.",
        },
      },
      {
        id: "7-4",
        name: {
          hy: "Իվենթներ",
          ru: "Корпоративы и ивенты",
          en: "Corporate Events & Concerts",
        },
        description: {
          hy: "Կորպորատիվ միջոցառումների, համերգների և իվենթների նկարահանում:",
          ru: "Съемка корпоративных мероприятий, концертов и ивентов.",
          en: "Photo and video recording for corporate events, concerts, and galas.",
        },
      },
    ],
  },
  {
    id: "glass-film",
    name: {
      hy: "Ապակիների թաղանթապատում",
      ru: "Тонирование и оклейка стекол",
      en: "Glass & Window Film Application",
    },
    description: {
      hy: "Վիտրաժների, ցուցափեղկերի և ապակիների թաղանթապատում (տոնավորում, պաշտպանիչ թաղանթներ):",
      ru: "Оклейка витражей, витрин и стекол пленками (тонирование, защитные пленки).",
      en: "Window tinting, protective film coating, and decorative glass vinyl application.",
    },
  },
  {
    id: "web-dev",
    name: {
      hy: "Web ծրագրավորում",
      ru: "Веб-разработка",
      en: "Web Development",
    },
    description: {
      hy: "Կայքերի, էլեկտրոնային խանութների և վեբ համակարգերի մշակում:",
      ru: "Разработка веб-сайтов, интернет-магазинов и веб-систем.",
      en: "Development of custom websites, e-commerce stores, and web applications.",
    },
    image: "/services/web.jpeg",
  },
  {
    id: "courses",
    name: {
      hy: "Դասընթացներ",
      ru: "Обучающие курсы",
      en: "Educational Courses",
    },
    description: {
      hy: "Դիզայնի, ծրագրավորման և տպագրական գործի մասնագիտացված դասընթացներ:",
      ru: "Специализированные курсы по дизайну, программированию и печатный делам.",
      en: "Specialized training courses in graphic design, web development, and printing techniques.",
    },
  },
  {
    id: "other",
    name: {
      hy: "Այլ նմանատիպ ծառայություններ",
      ru: "Другие аналогичные услуги",
      en: "Other Related Services",
    },
    description: {
      hy: "Հատուկ պատվերների և հարակից այլ ծառայությունների իրականացում:",
      ru: "Выполнение индивидуальных заказов и других сопутствующих услуг.",
      en: "Fulfillment of custom orders and auxiliary services upon request.",
    },
  },
  {
    id: "ribbon-printing",
    name: {
      hy: "Ժապավենների վրա տպագրություն",
      ru: "Печать на лентах",
      en: "Ribbon Printing",
    },
    description: {
      hy: "10-100մմ լայնության Վինիլային, Նեյլոնային, Թղթե, Սիլիկոնե, Սատինե ժապավենների տպագրություն տարբեր գույներով:",
      ru: "Печать на виниловых, нейлоновых, бумажных, силиконовых и сатиновых лентах шириной 10-100 мм.",
      en: "Multi-color custom printing on vinyl, nylon, paper, silicone, and satin ribbons (10-100mm width).",
    },
    image: "/services/ribbon.jpg",
  },
];

// O(1) Top-level index table constructed once at module execution
const serviceLookupMap = new Map();

servicesData.forEach((service) => {
  if (Array.isArray(service.subServices) && service.subServices.length > 0) {
    service.subServices.forEach((sub) => {
      serviceLookupMap.set(sub.id, {
        ...sub,
        parentName: service.name,
        parentId: service.id,
      });
    });
  } else {
    serviceLookupMap.set(service.id, {
      ...service,
      parentId: service.id,
    });
  }
});

export default function VisualDesignPage() {
  const [activeId, setActiveId] = useState(servicesData[0]?.id || null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Consume Context
  const { lang } = useLanguage();

  const activeService = serviceLookupMap.get(activeId);

  // Normalize language key mapping used by the language context.
  const getLangText = (textObj) => {
    if (!textObj) return "";
    if (typeof textObj === "string") return textObj;
    const currentLang =
      {
        am: "hy",
        arm: "hy",
        armenian: "hy",
        eng: "en",
        english: "en",
        rus: "ru",
        russian: "ru",
      }[String(lang).toLowerCase()] || lang;
    return textObj[currentLang] || textObj.en || textObj.hy || "";
  };

  // Extract single image or array of images
  const activeImages = activeService?.images
    ? activeService.images
    : activeService?.image
      ? [activeService.image]
      : [];

  const handleCategoryClick = (service) => {
    const hasSub =
      Array.isArray(service.subServices) && service.subServices.length > 0;
    if (hasSub) {
      setExpandedCategory((prev) => (prev === service.id ? null : service.id));
    } else {
      setActiveId(service.id);
    }
  };

  const handleSubServiceClick = (subId, parentId) => {
    setActiveId(subId);
    setExpandedCategory(parentId);
  };

  return (
    <div className="full-page">
      <header className="page-header">


        <span className="header-badge">
          {getLangText(uiTranslations.headerBadge)}
        </span>
        <h1 className="title">{getLangText(uiTranslations.title)}</h1>
        <p className="subtitle">{getLangText(uiTranslations.subtitle)}</p>
      </header>

      <div className="main-layout">
        <aside className="sidebar" aria-label="Services Menu">
          {servicesData.map((service) => {
            const hasSub =
              Array.isArray(service.subServices) &&
              service.subServices.length > 0;
            const isExpanded = expandedCategory === service.id;
            const isDirectActive = !hasSub && activeId === service.id;
            const hasActiveChild =
              hasSub && activeService && activeService.parentId === service.id;

            return (
              <div key={service.id} className="category-group">
                <button
                  type="button"
                  className={`sidebar-btn ${isDirectActive ? "active" : ""} ${
                    hasActiveChild ? "parent-active" : ""
                  }`}
                  aria-expanded={hasSub ? isExpanded : undefined}
                  aria-controls={hasSub ? `sub-menu-${service.id}` : undefined}
                  onClick={() => handleCategoryClick(service)}
                >
                  <span className="btn-label">{getLangText(service.name)}</span>
                  {hasSub && (
                    <span
                      className={`arrow-icon ${isExpanded ? "expanded" : ""}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  )}
                </button>

                {hasSub && isExpanded && (
                  <div
                    id={`sub-menu-${service.id}`}
                    className="sub-menu"
                    role="region"
                  >
                    {service.subServices.map((sub) => {
                      const isSubActive = activeId === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          className={`sub-sidebar-btn ${
                            isSubActive ? "active" : ""
                          }`}
                          onClick={() =>
                            handleSubServiceClick(sub.id, service.id)
                          }
                        >
                          <span className="sub-btn-label">
                            {getLangText(sub.name)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        <main className="content-area">
          {activeService ? (
            <article className="content-card" key={activeService.id}>
              {activeService.parentName && (
                <div className="category-tag-wrapper">
                  <span className="category-tag">
                    {getLangText(activeService.parentName)}
                  </span>
                </div>
              )}
              <h2>{getLangText(activeService.name)}</h2>
              <p className="description">
                {getLangText(activeService.description)}
              </p>

              {activeImages.length > 0 && (
                <div className="image-gallery">
                  {activeImages.map((imgSrc, index) => (
                    <div className="image-container" key={`${imgSrc}-${index}`}>
                      <img
                        src={imgSrc}
                        alt={getLangText(activeService.name)}
                        className="service-image"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ) : (
            <div className="placeholder">
              <p>{getLangText(uiTranslations.placeholder)}</p>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        /* Global & Layout Container */
        .full-page {
          min-height: 100vh;
          max-width: 1240px;
          margin: 0 auto;
          padding: 48px 24px;
          box-sizing: border-box;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          color: #0f172a;
        }

        /* Language Switcher Styling */
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .lang-btn {
          background: transparent;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lang-btn:hover {
          color: #0f172a;
        }

        .lang-btn.active {
          background: #ffcc33;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Header Styling */
        .page-header {
          text-align: center;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 9999px;
          background-color: #3a3b3c;
          color: #ffcc33;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          margin-bottom: 12px;
          border: 1px solid #ffcc33;
        }

        .title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #e2e8f0;
          margin: 0 0 12px 0;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 1.0625rem;
          margin: 0;
          max-width: 580px;
          line-height: 1.5;
        }

        /* Main Layout Grid */
        .main-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 32px;
          align-items: start;
        }

        /* Sidebar & Menu Stack */
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #ffffff;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          max-height: calc(100vh - 180px);
          overflow-y: auto;
          box-sizing: border-box;
        }

        .sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .category-group {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
        }

        .sidebar-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          gap: 12px;
          padding: 12px 14px;
          background: transparent;
          color: #334155;
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9375rem;
          font-weight: 600;
          text-align: left;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-btn:hover {
          background: #ffcc33;
          color: #0f172a;
        }

        .sidebar-btn:focus-visible,
        .sub-sidebar-btn:focus-visible {
          outline: 2px solid #ffcc33;
          outline-offset: 1px;
        }

        .sidebar-btn.active {
          background: #ffcc33;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .sidebar-btn.parent-active {
          background: #ffcc33;
          color: #0f172a;
          border-color: #eab308;
        }

        .btn-label {
          flex: 1 1 0%;
          min-width: 0;
          overflow-wrap: break-word;
          word-break: break-word;
          line-height: 1.4;
        }

        .arrow-icon {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          color: #94a3b8;
        }

        .sidebar-btn:hover .arrow-icon {
          color: #475569;
        }

        .sidebar-btn.active .arrow-icon {
          color: #ffffff;
        }

        .sidebar-btn.parent-active .arrow-icon {
          color: #0f172a;
        }

        .arrow-icon.expanded {
          transform: rotate(180deg);
        }

        /* Sub-menu styling & containment */
        .sub-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 6px 0 6px 12px;
          margin-top: 2px;
          margin-left: 14px;
          border-left: 2px solid #e2e8f0;
          box-sizing: border-box;
          width: calc(100% - 14px);
        }

        .sub-sidebar-btn {
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px;
          background: transparent;
          color: #475569;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }

        .sub-btn-label {
          flex: 1 1 0%;
          min-width: 0;
          overflow-wrap: break-word;
          word-break: break-word;
          line-height: 1.4;
        }

        .sub-sidebar-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .sub-sidebar-btn.active {
          background: #ffcc33;
          color: #0f172a;
          font-weight: 600;
          border-color: #eab308;
        }

        /* Content Display Card */
        .content-area {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .content-card {
          animation: contentFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .category-tag-wrapper {
          margin-bottom: 16px;
        }

        .category-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #f1f5f9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .content-card h2 {
          color: #0f172a;
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0 0 16px 0;
          line-height: 1.3;
          letter-spacing: -0.015em;
        }

        .description {
          color: #334155;
          line-height: 1.7;
          font-size: 1.0625rem;
          margin: 0;
        }

        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 250px;
          color: #94a3b8;
          font-style: italic;
        }

        /* Flexible Image Gallery & Aspect-Ratio Preserving Container */
        .image-gallery {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .image-container {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
          min-height: 260px;
          max-height: 420px;
        }

        .service-image {
          max-width: 100%;
          max-height: 380px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          border-radius: 4px;
        }

        @keyframes contentFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 868px) {
          .main-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .sidebar {
            max-height: 360px;
          }

          .full-page {
            padding: 24px 16px;
          }

          .title {
            font-size: 1.75rem;
          }

          .content-area {
            padding: 28px;
          }
        }
      `}</style>
    </div>
  );
}
