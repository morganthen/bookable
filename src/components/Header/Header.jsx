import classes from "./Header.module.scss";

export const Header = ({ children }) => {
  return (
    <div className={classes.header}>
      <h1 className={classes.header__logo}>BOOKABLE</h1>
      <span>{children}</span>
    </div>
  );
};
