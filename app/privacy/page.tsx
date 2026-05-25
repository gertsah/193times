import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — 193Times",
  description:
    "Политика обработки персональных данных студии 193Times в соответствии с ФЗ-152.",
  robots: { index: true, follow: true },
};

const SITE = "https://www.193times.ru";
const OPERATOR = "Студия 193Times";
const CONTACT_EMAIL = "193times@mail.ru";
const ADDRESS = "Российская Федерация, г. Новороссийск";
const UPDATED = "17 мая 2026";

export default function PrivacyPage() {
  return (
    <div className="theme-light bg-bg text-ink">
      <Header />
      <main className="relative bg-bg pb-24 pt-32 md:pt-40">
        <article className="edge mx-auto max-w-3xl">
          <p className="label">Документ · §99</p>
          <h1 className="display mt-5 text-4xl leading-[1.05] md:text-6xl">
            Политика обработки персональных данных
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Редакция от {UPDATED} · в соответствии с{" "}
            <span className="text-ink">ФЗ-152 «О персональных данных»</span>
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink/85">
            <section>
              <h2 className="policy-h2">1. Общие положения</h2>
              <p>
                Настоящая Политика разработана в соответствии с требованиями
                Федерального закона от 27.07.2006 № 152-ФЗ «О персональных
                данных» и определяет порядок обработки персональных данных
                и меры по обеспечению их безопасности, предпринимаемые
                оператором — <strong>{OPERATOR}</strong> (далее — «Оператор»).
              </p>
              <p>
                Оператор ставит своей важнейшей целью и условием осуществления
                своей деятельности соблюдение прав и свобод человека и
                гражданина при обработке его персональных данных, в том числе
                защиты прав на неприкосновенность частной жизни, личную и
                семейную тайну.
              </p>
              <p>
                Настоящая Политика применяется ко всей информации, которую
                Оператор может получить о посетителях сайта{" "}
                <a href={SITE} className="text-ember link-underline">
                  {SITE}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="policy-h2">2. Основные термины</h2>
              <ul className="policy-ul">
                <li>
                  <strong>Персональные данные</strong> — любая информация,
                  относящаяся прямо или косвенно к определённому физическому
                  лицу (субъекту персональных данных).
                </li>
                <li>
                  <strong>Обработка персональных данных</strong> — любое
                  действие с персональными данными: сбор, запись, хранение,
                  уточнение, использование, передача, удаление.
                </li>
                <li>
                  <strong>Оператор</strong> — {OPERATOR}, организующий и/или
                  осуществляющий обработку персональных данных.
                </li>
                <li>
                  <strong>Субъект</strong> — физическое лицо, отправляющее
                  данные через формы сайта или иные каналы связи.
                </li>
                <li>
                  <strong>Cookie</strong> — небольшой фрагмент данных,
                  хранимый браузером пользователя по запросу сайта.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="policy-h2">3. Какие данные собираются</h2>
              <p>Оператор может обрабатывать следующие персональные данные:</p>
              <ul className="policy-ul">
                <li>Имя (фамилия, имя, отчество — если указано);</li>
                <li>Адрес электронной почты;</li>
                <li>Контактный телефон (если указан);</li>
                <li>Содержание сообщения и приложенные материалы;</li>
                <li>
                  Технические данные: IP-адрес, тип браузера, операционная
                  система, страницы посещения, время визита — собираются
                  автоматически.
                </li>
              </ul>
              <p>
                Сайт <strong>не использует</strong> сторонние системы
                аналитики и трекеры (Яндекс.Метрика, Google Analytics и т.п.)
                на момент редакции данной Политики.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">4. Цели обработки</h2>
              <ul className="policy-ul">
                <li>
                  Ответ на обращения, отправленные через форму обратной связи
                  («Начать проект»);
                </li>
                <li>
                  Подготовка коммерческого предложения и обсуждение условий
                  сотрудничества;
                </li>
                <li>Заключение и исполнение договоров;</li>
                <li>
                  Информирование о новостях студии (только при явном согласии).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="policy-h2">5. Правовые основания</h2>
              <p>
                Обработка персональных данных осуществляется на основании:
              </p>
              <ul className="policy-ul">
                <li>
                  Согласия субъекта, выраженного при отправке формы на сайте
                  (отметка чекбокса «Согласие на обработку ПДн»);
                </li>
                <li>
                  Заключаемых с субъектом договоров — для исполнения
                  обязательств по ним;
                </li>
                <li>
                  Положений Федерального закона № 152-ФЗ и иных нормативных
                  актов РФ.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="policy-h2">6. Хранение и защита</h2>
              <p>
                Персональные данные хранятся в форме, позволяющей определить
                субъекта, не дольше, чем этого требуют цели обработки. Срок
                хранения — <strong>не более 3 (трёх) лет</strong> с момента
                последнего взаимодействия, если иной срок не установлен
                законом или договором.
              </p>
              <p>
                Хранение данных осуществляется на серверах, расположенных на
                территории Российской Федерации, что соответствует требованию
                ст. 18 ч. 5 ФЗ-152 о локализации.
              </p>
              <p>
                Оператор принимает технические и организационные меры для
                защиты персональных данных от неправомерного доступа,
                уничтожения, изменения или иных неправомерных действий:
                использование HTTPS-соединения, ограниченный круг лиц,
                имеющих доступ к данным, регулярный пересмотр процедур.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">7. Передача третьим лицам</h2>
              <p>
                Оператор <strong>не передаёт</strong> персональные данные
                третьим лицам, за исключением случаев, прямо предусмотренных
                законодательством РФ (например, по запросу уполномоченных
                государственных органов).
              </p>
              <p>
                Трансграничная передача данных <strong>не осуществляется</strong>.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">8. Файлы cookie</h2>
              <p>
                Сайт использует только технически необходимые cookie для
                корректной работы интерфейса (хранение настроек темы,
                состояния навигации). Маркетинговые и аналитические cookie
                <strong> не устанавливаются</strong>.
              </p>
              <p>
                Вы можете отключить cookie в настройках вашего браузера —
                базовый функционал сайта продолжит работать.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">9. Права субъекта</h2>
              <p>В соответствии со ст. 14 ФЗ-152 субъект имеет право:</p>
              <ul className="policy-ul">
                <li>Получать информацию об обработке своих данных;</li>
                <li>
                  Требовать уточнения, блокирования или уничтожения данных в
                  случае их неполноты, неточности или незаконного получения;
                </li>
                <li>Отозвать согласие на обработку в любой момент;</li>
                <li>
                  Обращаться в Роскомнадзор или в суд для защиты своих прав.
                </li>
              </ul>
              <p>
                Для реализации перечисленных прав направьте запрос на
                электронную почту{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-ember link-underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . Ответ предоставляется в течение 30 (тридцати) дней с
                момента получения запроса.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">10. Изменения Политики</h2>
              <p>
                Оператор вправе вносить изменения в настоящую Политику.
                Актуальная редакция всегда доступна по адресу{" "}
                <Link
                  href="/privacy/"
                  className="text-ember link-underline"
                >
                  {SITE}/privacy
                </Link>
                . Существенные изменения публикуются на сайте не менее чем
                за 7 дней до вступления в силу.
              </p>
            </section>

            <section>
              <h2 className="policy-h2">11. Контакты Оператора</h2>
              <div className="rounded-2xl border border-line bg-card p-6">
                <dl className="space-y-3 text-[15px]">
                  <Detail term="Оператор" value={OPERATOR} />
                  <Detail term="Адрес" value={ADDRESS} />
                  <Detail
                    term="Email для запросов по ПДн"
                    value={
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-ember link-underline"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    }
                  />
                  <Detail term="Сайт" value={SITE} />
                  <Detail term="Редакция от" value={UPDATED} />
                </dl>
              </div>
            </section>
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 hover:text-ember"
            >
              <span className="inline-block h-px w-8 bg-ink/40 transition-all group-hover:w-12 group-hover:bg-ember" />
              Вернуться на главную
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

function Detail({
  term,
  value,
}: {
  term: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
      <dt className="label md:w-48 md:shrink-0">{term}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
