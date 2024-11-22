import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaUser, FaEdit, FaClipboardList, FaStore } from "react-icons/fa";

const UserMenu = () => {
  const [auth] = useAuth();

  const menuItems = [
    {
      label: "Profile",
      to: `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`,
      icon: <FaUser />
    },
    {
      label: "Edit Profile",
      to: "/dashboard/user/profile",
      icon: <FaEdit />
    },
    {
      label: "Orders",
      to: "/dashboard/user/orders",
      icon: <FaClipboardList />
    },
    {
      label: "Sell",
      to: "/dashboard/user/sell",
      icon: <FaStore />
    }
  ];

  const styles = {
    container: {
      maxWidth: "300px",
      margin: "auto",
      padding: "16px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "16px",
      textAlign: "center"
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      fontSize: "1.1rem",
      color: "#555",
      textDecoration: "none",
      borderRadius: "4px",
      transition: "background-color 0.3s, color 0.3s"
    },
    listItemHover: {
      backgroundColor: "#e9ecef",
      color: "#007bff"
    },
    activeItem: {
      backgroundColor: "#007bff",
      color: "white"
    },
    icon: {
      marginRight: "10px",
      fontSize: "1.2rem"
    }
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Dashboard</h4>
      <div>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            style={({ isActive }) =>
              isActive
                ? { ...styles.listItem, ...styles.activeItem }
                : styles.listItem
            }
            onMouseEnter={(e) =>
              Object.assign(e.target.style, styles.listItemHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.target.style, styles.listItem)
            }
          >
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
