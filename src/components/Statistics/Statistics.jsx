import css from "./Statistics.module.css";

const statisticsList = [
  { title: "Experienced tutors", value: 32000 },
  { title: "5-star tutor reviews", value: 300000 },
  { title: "Subjects taught", value: 120 },
  { title: "Tutor nationalities", value: 200 },
];

export default function Statistics() {
  return (
    <section className={css.statistics}>
      <ul className={css.statisticsList}>
        {statisticsList.map((statisticsItem) => (
          <li className={css.statisticItem} key={statisticsItem.title}>
            <h2>{statisticsItem.value.toLocaleString("en-US")} +</h2>
            <p>{statisticsItem.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
