export default function Input({ name, labelText, type }) {
  return (
    <div className="control">
      <label htmlFor={name}>{labelText}</label>
      <input type={type} id={name} name={name} required />
    </div>
  );
}
