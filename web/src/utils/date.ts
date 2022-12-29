import moment from 'moment';
export const dateFormat = (date: string) => {
console.log(date);
  return moment(date).format('yyyy-mm-dd')
};
