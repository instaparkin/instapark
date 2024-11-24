import React from 'react';
import { useDispatch, useSelector, setCurrentRole, RootState } from '@instapark/state';
import { Button } from './button';
import { Role } from '@instapark/types';

export function SwitchRoleButton() {

    const dispatch = useDispatch();

    const { currentRole, roles } = useSelector((state: RootState) => state.user);

    const getNextRole = (current: Role, roles: Role[]): Role => {
        const currentIndex = roles.indexOf(current);
        return roles[(currentIndex + 1) % roles.length] as Role;
    };

    const handleRoleChange = () => {
        const nextRole = getNextRole(currentRole, roles);
        dispatch(setCurrentRole(nextRole));
    };

    return (
        <Button
            className='hidded md:block w-full md:w-fit'
            onClick={handleRoleChange}
            variant={"default"}>
            Switch to {getNextRole(currentRole, roles)}
        </Button>
    );
}
