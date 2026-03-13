import { motion } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiLayers,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import "./About.css";

const About = () => {
  const { t, language } = useLanguage();

  const copy =
    language === "en"
      ? {
          introTitle: "A Delivery-First Digital Partner",
          introText:
            "4Pixels builds high-performance Shopify stores, automation workflows, CRM systems, and AI media operations that turn strategy into measurable execution.",
          storyTitle: "Who We Are",
          storyText:
            "We are a multidisciplinary team focused on practical digital transformation. Every project is built around business impact, not just visual polish.",
          missionTitle: "Mission",
          missionText:
            "Enable ambitious teams to scale revenue and operations through connected systems, automation, and premium digital execution.",
          visionTitle: "Vision",
          visionText:
            "Become the trusted execution partner for brands that want serious growth across commerce, systems, and AI-driven media.",
          strengthsTitle: "What Makes Us Different",
          valuesTitle: "Core Values",
          executionTitle: "How We Execute",
          executionSubtitle:
            "A practical framework designed for speed, quality, and repeatable results.",
          stats: [
            { icon: <FiUsers />, value: "50+", label: "Active Clients" },
            { icon: <FiLayers />, value: "150+", label: "Projects Delivered" },
            { icon: <FiTarget />, value: "98%", label: "Success Rate" },
            { icon: <FiTrendingUp />, value: "5+", label: "Years Operating" },
          ],
          strengths: [
            "Shopify development from A to Z with conversion focus.",
            "Automation workflows connected to CRM and sales operations.",
            "Systems and reporting setups for real business tracking.",
            "AI media production for brand visuals and promotional video.",
          ],
          values: [
            {
              icon: <FiAward />,
              title: "Execution Quality",
              description:
                "We ship clean, scalable, and business-ready solutions.",
            },
            {
              icon: <FiUsers />,
              title: "Partnership Mindset",
              description:
                "We work as an extension of your team, not as a vendor.",
            },
            {
              icon: <FiTarget />,
              title: "Measurable Outcomes",
              description:
                "Every decision is tied to growth, efficiency, or clarity.",
            },
            {
              icon: <FiTrendingUp />,
              title: "Continuous Optimization",
              description:
                "After launch, we keep tuning and improving performance.",
            },
          ],
          executionSteps: [
            {
              step: "01",
              title: "Business Discovery",
              description:
                "Understand goals, constraints, and current workflow gaps.",
            },
            {
              step: "02",
              title: "System Blueprint",
              description:
                "Map store, automation, and data architecture into one model.",
            },
            {
              step: "03",
              title: "Build & Launch",
              description:
                "Implement, test, optimize, and hand over with clear tracking.",
            },
          ],
        }
      : {
          introTitle: "شريك رقمي يركز على التنفيذ الحقيقي",
          introText:
            "4Pixels تبني متاجر Shopify احترافية، وتدفقات أتمتة، وأنظمة CRM، وتشغيل ميديا بالذكاء الاصطناعي لنتائج قابلة للقياس.",
          storyTitle: "من نحن",
          storyText:
            "نحن فريق متعدد الخبرات يركز على التحول الرقمي العملي. كل مشروع عندنا مبني على أثر تجاري واضح وليس شكل فقط.",
          missionTitle: "مهمتنا",
          missionText:
            "تمكين الفرق الطموحة من توسيع الإيرادات والعمليات عبر منظومة مترابطة من الأنظمة والأتمتة والتنفيذ الاحترافي.",
          visionTitle: "رؤيتنا",
          visionText:
            "أن نكون شريك التنفيذ الموثوق للبراندات التي تريد نموًا قويًا في التجارة والأنظمة والميديا المدعومة بالذكاء الاصطناعي.",
          strengthsTitle: "لماذا نحن مختلفون",
          valuesTitle: "قيمنا الأساسية",
          executionTitle: "منهج التنفيذ",
          executionSubtitle:
            "إطار عملي مصمم للسرعة والجودة ونتائج يمكن تكرارها بثبات.",
          stats: [
            { icon: <FiUsers />, value: "50+", label: "عميل نشط" },
            { icon: <FiLayers />, value: "150+", label: "مشروع مُنجز" },
            { icon: <FiTarget />, value: "98%", label: "معدل نجاح" },
            { icon: <FiTrendingUp />, value: "5+", label: "سنوات خبرة" },
          ],
          strengths: [
            "تنفيذ Shopify كامل من البداية للنهاية مع تركيز على التحويل.",
            "أتمتة متصلة بـ CRM وعمليات المبيعات.",
            "بناء أنظمة تشغيل ولوحات متابعة لقياس الأداء الفعلي.",
            "إنتاج صور وفيديو للبراند بالذكاء الاصطناعي.",
          ],
          values: [
            {
              icon: <FiAward />,
              title: "جودة التنفيذ",
              description: "نقدّم حلول نظيفة، قابلة للتوسع، وجاهزة للتشغيل.",
            },
            {
              icon: <FiUsers />,
              title: "شراكة حقيقية",
              description: "نشتغل كامتداد لفريقك وليس مجرد مزود خدمة.",
            },
            {
              icon: <FiTarget />,
              title: "نتائج قابلة للقياس",
              description: "كل قرار مرتبط بالنمو أو الكفاءة أو وضوح التشغيل.",
            },
            {
              icon: <FiTrendingUp />,
              title: "تحسين مستمر",
              description: "بعد الإطلاق نواصل التطوير ورفع الأداء.",
            },
          ],
          executionSteps: [
            {
              step: "01",
              title: "فهم العمل",
              description:
                "تحليل الأهداف والتحديات التشغيلية ونقاط التعطل الحالية.",
            },
            {
              step: "02",
              title: "تصميم المنظومة",
              description: "ربط المتجر والأتمتة والبيانات في نموذج تشغيل واحد.",
            },
            {
              step: "03",
              title: "تنفيذ وإطلاق",
              description: "بناء واختبار وتحسين ثم تسليم المشروع مع تتبع واضح.",
            },
          ],
        };

  const leadershipTitle = language === "en" ? "Leadership" : "القيادة";
  const leadershipSubtitle =
    language === "en"
      ? "Meet the founder behind our strategy, execution quality, and long-term partnerships."
      : "تعرف على المؤسس المسؤول عن الاستراتيجية وجودة التنفيذ وبناء الشراكات.";
  const leadershipNote =
    language === "en"
      ? "You can replace member photos anytime from About.jsx."
      : "يمكنك تغيير صور الفريق في أي وقت من ملف About.jsx.";

  const leadershipMembers =
    language === "en"
      ? [
          {
            name: "Your Name",
            role: "Founder & CEO",
            image: "",
            bio: "Leads business strategy, growth direction, and delivery standards across all client projects.",
            highlights: [
              "Shopify Strategy",
              "Business Systems",
              "Growth Planning",
            ],
          },
        ]
      : [
          {
            name: "اسمك هنا",
            role: "المؤسس والمدير التنفيذي",
            image: "",
            bio: "يقود الاستراتيجية العامة واتجاه النمو ومعايير التنفيذ في جميع المشاريع.",
            highlights: ["استراتيجية Shopify", "أنظمة الأعمال", "تخطيط النمو"],
          },
        ];

  const getInitials = (name) =>
    String(name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="about-page section">
      <div className="container">
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">{t("about")}</h1>
          <h2>{copy.introTitle}</h2>
          <p>{copy.introText}</p>
        </motion.div>

        <motion.section
          className="about-leadership"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="about-leadership-head">
            <h2>{leadershipTitle}</h2>
            <p>{leadershipSubtitle}</p>
          </div>

          <div className="about-leadership-grid">
            {leadershipMembers.map((member) => (
              <article
                key={`${member.name}-${member.role}`}
                className="leader-card"
              >
                <div className="leader-avatar">
                  {member.image ? (
                    <img src={member.image} alt={member.name} loading="lazy" />
                  ) : (
                    <span>{getInitials(member.name)}</span>
                  )}
                </div>

                <div className="leader-content">
                  <h3>{member.name}</h3>
                  <p className="leader-role">{member.role}</p>
                  <p className="leader-bio">{member.bio}</p>
                  <div className="leader-tags">
                    {member.highlights.map((item) => (
                      <span key={`${member.name}-${item}`}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="about-leadership-note">{leadershipNote}</p>
        </motion.section>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {copy.stats.map((stat, index) => (
            <motion.article
              key={`${stat.label}-${index}`}
              className="about-stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.08 }}
            >
              <div className="stat-icon-large">{stat.icon}</div>
              <div className="stat-number-large">{stat.value}</div>
              <div className="stat-label-large">{stat.label}</div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="about-story-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <article className="about-story-card">
            <h3>{copy.storyTitle}</h3>
            <p>{copy.storyText}</p>
          </article>
          <article className="about-story-card">
            <h3>{copy.missionTitle}</h3>
            <p>{copy.missionText}</p>
          </article>
          <article className="about-story-card">
            <h3>{copy.visionTitle}</h3>
            <p>{copy.visionText}</p>
          </article>
        </motion.div>

        <motion.section
          className="about-strengths"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3>{copy.strengthsTitle}</h3>
          <ul>
            {copy.strengths.map((item) => (
              <li key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="values-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="values-title">{copy.valuesTitle}</h2>
          <div className="values-grid">
            {copy.values.map((value) => (
              <article key={value.title} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="execution-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>{copy.executionTitle}</h2>
          <p>{copy.executionSubtitle}</p>

          <div className="execution-grid">
            {copy.executionSteps.map((step) => (
              <article key={step.step} className="execution-card">
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
