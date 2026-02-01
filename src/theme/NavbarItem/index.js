import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import NavbarUser from '@site/src/components/Auth/NavbarUser';

export default function NavbarItemWrapper(props) {
    if (props.type === 'custom-user') {
        return <NavbarUser {...props} />;
    }
    return <NavbarItem {...props} />;
}
