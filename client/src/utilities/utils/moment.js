import moment from "moment";

const momentAdapter = (date, format) => ({
  formatDate: moment(date).format(format),
});

export default momentAdapter;
