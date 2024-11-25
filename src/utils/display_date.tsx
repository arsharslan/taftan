import { format } from 'date-fns';

export default function displayDate(rawDate: string) {

    const displayDate = format(new Date(rawDate), 'MMMM dd, yyyy hh:mm a');

    return <div>{displayDate}</div>;
}