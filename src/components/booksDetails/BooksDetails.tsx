interface BookSeriesDetailsProps {
  label: string;
  value?: number | string;
}

export default function BooksDetails({ label, value }: BookSeriesDetailsProps) {
  if (!value) return null;
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}
