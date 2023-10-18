import Link from 'next/link'
import getItem from './getItem'

const siderItems = [
    getItem('Main', 'grp', null, [
        getItem(<Link href="/admin/dashboard">Dashboard</Link>, '/admin/dashboard'),
        // getItem(<Link href="/admin/files">Files</Link>, '/admin/files'),
        getItem(<Link href="/admin/products">My Products</Link>, '/admin/products'),
        getItem(<Link href="/admin/chats">Chats</Link>, '/admin/chats'),
        getItem(<Link href="/admin/collected-items">Collected Items</Link>, '/admin/collected-items'),
        getItem(<Link href="/admin/templates">Templates</Link>, '/admin/templates'),
    ], 'group'),
    getItem('Users', 'grp', null, [
        getItem(<Link href="/admin/setting">Setting</Link>, '/admin/setting'),
        getItem(<Link href="/logout">Logout</Link>, '/logout')
    ], 'group'),
]

export default siderItems