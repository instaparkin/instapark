import { IoNotificationsOutline } from 'react-icons/io5';

export const NotificationIcon = ({ hasNotifications }: { hasNotifications: boolean }): JSX.Element => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="rounded-full border p-2 flex items-center justify-center">
                <IoNotificationsOutline className="h-5 w-5" />
            </div>
            {hasNotifications && (
                <span className="absolute top-1 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
        </div>
    );
};
