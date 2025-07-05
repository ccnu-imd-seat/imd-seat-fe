type Item = {
  status: string;
  date: string | number | Date;
  [key: string]: any;
};

type GroupedResult = {
  reserveList: Item[];
  violationList: Item[];
};

export function groupAndSortByStatusAndDate(items: Item[]): GroupedResult {
  const violated: Item[] = [];
  const others: Item[] = [];

  for (const item of items) {
    if (item.status === 'violated') {
      violated.push(item);
    } else {
      others.push(item);
    }
  }

  const sortByDateDesc = (a: Item, b: Item) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  violated.sort(sortByDateDesc);
  others.sort(sortByDateDesc);

  return { violationList: violated, reserveList: others };
}


