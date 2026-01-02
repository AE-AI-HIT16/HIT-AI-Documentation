import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import styles from './styles.module.css';

// Configure your products/documentation sections
// Each product corresponds to a different section with its own sidebar
import { products } from '../../data/products';

// Simple icon component for displaying emoji or text icons
const IconComponent = ({ icon }) => {
  // If it's a string (emoji), display directly
  if (typeof icon === 'string') {
    return <span style={{ fontSize: '1.5rem' }}>{icon}</span>;
  }
  // If it's a React component, render it
  const Icon = icon;
  return <Icon />;
};

export default function ProductSwitcher() {
  const location = useLocation();

  // Find selected product based on current path
  const selectedProduct = products.find(p => {
    if (p.baseUrl === '/') {
      // For root path, check if not under other product paths
      const otherBaseUrls = products
        .filter(prod => prod.baseUrl !== '/')
        .map(prod => prod.baseUrl);
      return location.pathname === '/' ||
        !otherBaseUrls.some(baseUrl => location.pathname.startsWith(baseUrl));
    }
    return location.pathname.startsWith(p.baseUrl);
  }) || products[0];

  if (!selectedProduct || selectedProduct.hidden) {
    return null;
  }

  return (
    <Menu>
      <MenuButton className={styles.menuButton}>
        <div className={styles.iconContainer}>
          <IconComponent icon={selectedProduct.icon} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>{selectedProduct.name}</div>
          <div className={styles.productDescription}>{selectedProduct.description}</div>
        </div>
        <ChevronDownIcon className={styles.chevron} />
      </MenuButton>

      <MenuItems className={styles.menuItems} anchor="bottom">
        <div className={styles.menuTitle}>Sections</div>
        {products.filter(product => !product.hidden).map((product) => (
          <MenuItem
            key={product.id}
            className={styles.menuItem}
            as={product.href ? 'a' : Link}
            target={product.href ? '_blank' : undefined}
            to={product.href ? undefined : product.path}
            href={product.href}
          >
            <>
              <div className={styles.menuItemIcon}>
                <IconComponent icon={product.icon} />
              </div>
              <div className={styles.menuItemContent}>
                <div className={styles.menuItemName}>{product.name}</div>
                <div className={styles.menuItemDescription}>{product.description}</div>
              </div>
            </>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
