import './spiner.css';

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
}
