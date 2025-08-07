export default function filterList({
  list,
  value,
  searchFields,
}: {
  list: any[];
  value: string;
  searchFields: string[];
}) {
  return list.filter((item) => {
    return searchFields.some((key: any) => {
      return item[key]?.toLowerCase().includes(value?.toLowerCase());
    });
  });
}
