import { motion } from 'framer-motion';
import {
  FiAward,
  FiCheckCircle,
  FiLayers,
  FiTarget,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t, language } = useLanguage();

  const copy =
    language === 'en'
      ? {
          eyebrow: 'About 4 Pixels',
          title: 'A delivery-focused studio for companies that need quality and structure.',
          intro:
            '4 Pixels builds premium digital experiences backed by serious execution. We connect UX, Shopify, automation, and operational systems into one clear delivery model.',
          stats: [
            { icon: <FiUsers />, value: '50+', label: 'Client relationships' },
            { icon: <FiLayers />, value: '150+', label: 'Execution outcomes' },
            { icon: <FiTarget />, value: '98%', label: 'Delivery focus' },
            { icon: <FiTrendingUp />, value: '5+', label: 'Years of practice' }
          ],
          storyCards: [
            {
              title: 'What We Solve',
              description:
                'We help brands and teams move from disconnected efforts to one cohesive digital operating model.'
            },
            {
              title: 'How We Think',
              description:
                'Every interface decision is tied to usability, speed, conversion, and smoother operations behind the scenes.'
            },
            {
              title: 'How We Deliver',
              description:
                'We scope clearly, build carefully, and hand over systems that remain useful after launch.'
            }
          ],
          valuesEyebrow: 'Operating Principles',
          valuesTitle: 'The standards that shape our work.',
          valuesSubtitle:
            'Strong UI is only one layer. Reliable delivery needs clarity, ownership, and measurable thinking.',
          values: [
            {
              icon: <FiAward />,
              title: 'Execution Quality',
              description: 'We deliver work that is visually sharp, technically sound, and ready for real use.'
            },
            {
              icon: <FiUsers />,
              title: 'Partnership Mode',
              description: 'We work as an extension of the client team with direct communication and shared priorities.'
            },
            {
              icon: <FiTarget />,
              title: 'Business Relevance',
              description: 'Features, layouts, and automation are selected for business value, not decoration.'
            },
            {
              icon: <FiTrendingUp />,
              title: 'Continuous Improvement',
              description: 'After launch, we keep refining speed, reporting, and operational flow where it matters.'
            }
          ],
          principlesTitle: 'What clients can expect from our process',
          principlesText:
            'The best company websites and systems feel intentional because every layer has a reason to exist.',
          principles: [
            'Clear scoping before production starts.',
            'Design language that supports trust and conversion.',
            'Operational systems that reduce friction for internal teams.',
            'A launch process that includes review, polish, and handoff clarity.'
          ],
          processTitle: 'Our execution rhythm',
          processSubtitle:
            'A predictable process keeps creative quality and technical delivery moving in the same direction.',
          process: [
            {
              step: '01',
              title: 'Discovery',
              description: 'We audit goals, current workflow, bottlenecks, and decision priorities.'
            },
            {
              step: '02',
              title: 'Blueprint',
              description: 'We define UX direction, system architecture, and the exact production scope.'
            },
            {
              step: '03',
              title: 'Build',
              description: 'Design, development, automation, and data setup move together as one track.'
            },
            {
              step: '04',
              title: 'Refine',
              description: 'We test, polish, and improve the operational details before and after go-live.'
            }
          ],
          finalTitle: 'The goal is not to look premium only. The goal is to operate premium too.',
          finalText:
            'That is the difference between a visually good website and a company asset that supports growth.'
        }
      : {
          eyebrow: 'عن 4 Pixels',
          title: 'استوديو تنفيذ رقمي للشركات التي تحتاج جودة عالية وهيكلًا واضحًا.',
          intro:
            '4 Pixels تبني تجارب رقمية premium مدعومة بتنفيذ جاد. نربط بين UX وShopify والأتمتة وأنظمة التشغيل داخل نموذج تنفيذ واحد وواضح.',
          stats: [
            { icon: <FiUsers />, value: '50+', label: 'علاقات مع عملاء' },
            { icon: <FiLayers />, value: '150+', label: 'نتائج تنفيذ' },
            { icon: <FiTarget />, value: '98%', label: 'تركيز على التسليم' },
            { icon: <FiTrendingUp />, value: '5+', label: 'سنوات ممارسة' }
          ],
          storyCards: [
            {
              title: 'ما الذي نحلّه',
              description:
                'نساعد البراندات والفرق على الانتقال من جهود متفرقة إلى نموذج تشغيل رقمي مترابط وواضح.'
            },
            {
              title: 'كيف نفكر',
              description:
                'كل قرار في الواجهة عندنا مرتبط بسهولة الاستخدام والسرعة والتحويل وسلاسة التشغيل خلف الكواليس.'
            },
            {
              title: 'كيف ننفذ',
              description:
                'نحدد النطاق بوضوح، ونبني بعناية، ونسلم أنظمة تظل مفيدة بعد الإطلاق.'
            }
          ],
          valuesEyebrow: 'مبادئ العمل',
          valuesTitle: 'المعايير التي تحكم شغلنا.',
          valuesSubtitle:
            'جودة الواجهة مجرد طبقة واحدة. التنفيذ الموثوق يحتاج وضوحًا وملكية وقرارات قابلة للقياس.',
          values: [
            {
              icon: <FiAward />,
              title: 'جودة التنفيذ',
              description: 'نسلم أعمالًا قوية بصريًا وسليمة تقنيًا وجاهزة للاستخدام الحقيقي.'
            },
            {
              icon: <FiUsers />,
              title: 'أسلوب شراكة',
              description: 'نشتغل كامتداد مباشر لفريق العميل مع تواصل واضح وأولويات مشتركة.'
            },
            {
              icon: <FiTarget />,
              title: 'صلة بالعمل التجاري',
              description: 'نختار الخصائص والواجهات والأتمتة بناءً على القيمة التجارية لا لمجرد الإبهار.'
            },
            {
              icon: <FiTrendingUp />,
              title: 'تحسين مستمر',
              description: 'بعد الإطلاق نواصل رفع السرعة والتقارير وجودة التدفق التشغيلي حيث يلزم.'
            }
          ],
          principlesTitle: 'ما الذي يتوقعه العميل من طريقتنا',
          principlesText:
            'أفضل مواقع الشركات وأنظمتها تبدو مقصودة لأن كل طبقة فيها موجودة لسبب فعلي.',
          principles: [
            'تحديد نطاق واضح قبل بدء الإنتاج.',
            'لغة تصميم تدعم الثقة والتحويل.',
            'أنظمة تشغيل تقلل الاحتكاك داخل الفريق.',
            'إطلاق يتضمن مراجعة وصقلًا وتسليمًا واضحًا.'
          ],
          processTitle: 'إيقاع التنفيذ لدينا',
          processSubtitle:
            'وجود مسار واضح يجعل الجودة الإبداعية والتسليم التقني يتحركان في اتجاه واحد.',
          process: [
            {
              step: '01',
              title: 'الفهم',
              description: 'نحلل الأهداف والتدفق الحالي ونقاط التعطل وأولويات القرار.'
            },
            {
              step: '02',
              title: 'الخطة',
              description: 'نحدد اتجاه UX وهيكل الأنظمة ونطاق الإنتاج الفعلي.'
            },
            {
              step: '03',
              title: 'البناء',
              description: 'التصميم والتطوير والأتمتة والبيانات تتحرك معًا داخل مسار واحد.'
            },
            {
              step: '04',
              title: 'التحسين',
              description: 'نختبر ونصقل ونرفع التفاصيل التشغيلية قبل وبعد الإطلاق.'
            }
          ],
          finalTitle: 'الهدف ليس أن يبدو الموقع premium فقط، بل أن تعمل الشركة بهذا المستوى أيضًا.',
          finalText:
            'وهذا هو الفرق بين موقع جميل بصريًا وأصل رقمي يدعم النمو فعليًا.'
        };

  return (
    <div className="about-page section">
      <div className="container">
        <section className="about-hero">
          <div className="section-copy about-hero-copy">
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{t('about')}</h1>
            <h2>{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>

          <div className="about-stats">
            {copy.stats.map((stat, index) => (
              <motion.article
                key={`${stat.label}-${index}`}
                className="about-stat-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="about-stat-icon">{stat.icon}</div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about-story-grid">
          {copy.storyCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="about-story-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="about-values">
          <div className="section-copy">
            <span className="page-eyebrow">{copy.valuesEyebrow}</span>
            <h2>{copy.valuesTitle}</h2>
            <p>{copy.valuesSubtitle}</p>
          </div>

          <div className="about-values-grid">
            {copy.values.map((value, index) => (
              <motion.article
                key={value.title}
                className="about-value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="about-value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about-approach">
          <motion.article
            className="about-principles-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2>{copy.principlesTitle}</h2>
            <p>{copy.principlesText}</p>
            <ul>
              {copy.principles.map((item) => (
                <li key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <div className="about-process-panel">
            <div className="section-copy">
              <h2>{copy.processTitle}</h2>
              <p>{copy.processSubtitle}</p>
            </div>

            <div className="about-process-grid">
              {copy.process.map((step, index) => (
                <motion.article
                  key={step.step}
                  className="about-process-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-final-card">
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalText}</p>
        </section>
      </div>
    </div>
  );
};

export default About;
