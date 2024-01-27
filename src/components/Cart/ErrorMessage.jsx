import Button from "../../UI/Button";

export default function ErrorMessage({ title, message, onConfirm }) {
  return (
    <div className="error-message">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div className="modal-actions">
          <Button
            clickFn={onConfirm}
            styling="error-confirmation"
            btnText="Okay"
          />
        </div>
      )}
    </div>
  );
}
