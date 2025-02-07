import { useParams } from 'react-router';

export default function CardDetails() {
  const { cardId } = useParams();

  // Get a specific query parameter

  // Set a query parameter
  //   setSearchParams({ myParam: 'myValue' });

  // Remove a query parameter
  //   setSearchParams((params) => {
  //     params.delete('myParam');
  //     return params;
  //   });

  return <div>outlet details, query param {cardId}</div>;
}
