import {
  useHits,
  UseHitsProps,
} from 'react-instantsearch';

export function CustomHits(props: UseHitsProps) {
  const { items, sendEvent } = useHits();

  return (
    <ol>
      {items.map((hit) => (
        <li
          key={hit.objectID}
        >
          <div style={{ wordBreak: 'break-all' }}>
            {JSON.stringify(hit.country).slice(0, 100)}
          </div>
        </li>
      ))}
    </ol>
  );
}