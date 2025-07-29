export default function Button({ btnText, styling, clickFn, ...props }) {
  return (
    <button className={styling} onClick={clickFn} {...props} >
      {btnText}
    </button>
  );
}
