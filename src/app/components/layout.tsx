"use client"
import React, { useState } from 'react';
import styles from "./styles/layout.module.css"
import { usePathname } from 'next/navigation';
import { CgWebsite } from "react-icons/cg";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiMenuAlt2, HiOutlineLogout } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';

type ParamType = {
    children: React.ReactNode
}

const Layout: React.FC<ParamType> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    const routes = [
        { name: 'Website', path: '/', icon: CgWebsite },
        { name: 'Project', path: '/schedule', icon: AiOutlineFundProjectionScreen },
    ];

    const handleCloseOrOpen = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className="min-h-screen bg-white">
            <div className={styles.mainLayout}>
                {/* Sidebar */}

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsOpen(!isOpen)}
                >{
                        isOpen ?
                            <RxHamburgerMenu size={24} /> : <IoCloseCircleOutline size={24} />
                    }
                </button>

                <div className={`${styles.sider} ${isOpen ? styles.siderClose : styles.siderOpen}`}>
                    <div className={styles.siderTop}>
                        <h2>LOGO</h2>
                    </div>

                    <div className={styles.ProfileContainer}>
                        <div className={styles.ProfileIcon}>
                            <RxAvatar size={35} />
                        </div>
                        <div className={styles.profileContent}>
                            <h3>Profile Name</h3>
                            <p>Designation</p>
                        </div>
                    </div>

                    <div className={styles.siderItems}>
                        {routes.map((data, index) => {
                            const Icon = data.icon;
                            const isActive = pathname === data.path;
                            console.log(pathname, data.path, "jfkadlsjfkla");
                            return (
                                <Link href={data.path} key={index} onClick={handleCloseOrOpen}>
                                    <div className={`${styles.siderItem} ${isActive ? styles.active : ''}`}
                                    >
                                        <h3><Icon size={20} />{data.name}</h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    <div className={styles.siderBottom}>
                        <div className={styles.siderItem}>
                            <Link href="/">
                                <h3><HiOutlineLogout size={20} />Logout</h3>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>

                    <div className={styles.header}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Search"
                                className={styles.searchInput}
                            />
                            <BiSearch
                                className={styles.searchIcon}
                                size={20}
                            />
                        </div>
                        <div className={styles.headerLeft}>
                            <div className={styles.headerLeftItems}>
                                <Link href="/">
                                    <CiMail size={35} />
                                </Link>
                                <Link href="/">
                                    <RxAvatar size={35} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={styles.pagesContainer}>
                        {children}
                    </div>
                </div>

            </div>



        </div>
    );
};

export default Layout;