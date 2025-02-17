import { Link } from '@tanstack/react-router';
import { ChevronRightIcon, GlobeIcon, PackageIcon, ReceiptIcon, TagsIcon, TicketIcon, UserIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar';

const navItems = [
  {
    title: 'User Management',
    url: '#',
    icon: UserIcon,
    items: [
      {
        title: 'Users',
        url: '/admin/users',
      },
    ],
  },
  {
    title: 'Categories Management',
    url: '#',
    icon: TagsIcon,
    items: [
      {
        title: 'Categories',
        url: '/admin/categories',
      },
      {
        title: 'Sub Categories',
        url: '/admin/sub-categories',
      },
    ],
  },
  {
    title: 'Products Management',
    url: '#',
    icon: PackageIcon,
    items: [
      {
        title: 'Products',
        url: '/admin/products',
      },
    ],
  },
  {
    title: 'Orders Management',
    url: '#',
    icon: ReceiptIcon,
    items: [
      {
        title: 'Orders',
        url: '/admin/orders',
      },
    ],
  },
  {
    title: 'Coupons Management',
    url: '#',
    icon: TicketIcon,
    items: [
      {
        title: 'Coupons',
        url: '/admin/coupons',
      },
    ],
  },
  {
    title: 'Website Management',
    url: '#',
    icon: GlobeIcon,
    items: [
      {
        title: 'Pages',
        url: '/admin/pages',
      },
      {
        title: 'Settings',
        url: '/admin/settings',
      },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map(item => (
          <Collapsible key={item.title} asChild className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link to={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
