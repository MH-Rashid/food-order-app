import '../styles/meals.css';

export default function Meals({ children }) {
  return (
    <section>
      <ul id="meals">{children}</ul>
    </section>
  );
}
