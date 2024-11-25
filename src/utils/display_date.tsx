import { format } from 'date-fns';

export default function displayDate(rawDate: string | Date) {

    const displayDate = format(rawDate instanceof Date ? rawDate : new Date(rawDate), 'MMMM dd, yyyy hh:mm a');

    return <div>{displayDate}</div>;
}