import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Careers', href: '/careers' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <div className={styles.logo}>
            <h2>CareerHoop</h2>
          </div>
          
          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={styles.navLink}>
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className={styles.userActions}>
            <button className="btn btn-outline">
              <User size={16} />
              Login
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={styles.mobileNav}>
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;