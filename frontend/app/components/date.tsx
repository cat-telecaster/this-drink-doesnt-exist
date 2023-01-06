import { parseISO, format } from 'date-fns';

interface DateTimeProps {
    dateTimeString: string;
}

export function ShowDate({ dateTimeString }: DateTimeProps) {
    const date = parseISO(dateTimeString)
    return <time dateTime={dateTimeString}>{format(date, "yyyy-MM-dd")}</time>
}

export function ShowDateTime({ dateTimeString }: DateTimeProps) {
    const date = parseISO(dateTimeString)
    return <time dateTime={dateTimeString}>{format(date, "yyyy-MM-dd HH:mm:ss")}</time>
}
