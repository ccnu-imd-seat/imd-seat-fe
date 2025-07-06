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

  // 修改 others 的排序逻辑
  const sortOthersWithBookedFirst = (a: Item, b: Item) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // 如果日期相同，将 booked 状态排在前面
    if (dateA === dateB) {
      if (a.status === 'booked' && b.status !== 'booked') {
        return -1; // a 排在前面
      }
      if (b.status === 'booked' && a.status !== 'booked') {
        return 1; // b 排在前面
      }
      return 0; // 状态相同或都不是 booked，保持原有顺序
    }

    // 日期不同，按日期降序排列
    return dateB - dateA;
  };

  violated.sort(sortByDateDesc);
  others.sort(sortOthersWithBookedFirst);

  return { violationList: violated, reserveList: others };
}
