function SnackList() {
  const snacks = [
    { name: 'Pretzels', rank: 5 },
    { name: 'Popcorn', rank: 4 },
    { name: 'Trail Mix', rank: 3 },
    { name: 'Chocolate Chip Cookies', rank: 2 },
    { name: 'Cheese Crackers', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>
          #{snack.rank} — {snack.name}
        </li>
      ))}
    </ol>
  );
}

export default SnackList;
