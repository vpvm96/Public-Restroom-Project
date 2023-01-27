export const formatDate = (time: Date) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const date = createdAt.getDate();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();

  return `${year}년 ${month}월 ${date}일 ${hour}:${min}`;
};
