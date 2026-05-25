export const offerPaper = {
  border: "1px solid lightGray ",
  width: "100%",
  height: "100%",
  transition: "0.3s",
  "&:hover": {
    boxShadow: 6,
    transform: "translateY(-4px)",
    cursor: "pointer",
  },
};

export const listGrid = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  paddingLeft: "5%",
  paddingRight: "5%",
  paddingTop: "3%",
  width: "100%",
};

export const itemBox = {
  borderRadius: 1,
  width: "100%",
  paddingTop: "2%",
  paddingBottom: "2%",
};

export const itemStack = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
};

export const titleGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#184E77",
};

export const infoGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#1A759F",
};
export const adminBanGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "text.secondary",
  p: 0,
  "&:hover": {
    cursor: "pointer",
    color: "red",
  },
};
export const banIcon = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 56,
  height: 56,
  minWidth: 56,
  minHeight: 56,
  color: "text.secondary",
  "& .outline": { display: "block", fontSize: "2rem", lineHeight: 1 },
  "& .filled": { display: "none", fontSize: "2rem", lineHeight: 1 },
  "&:hover": {
    cursor: "pointer",

    color: "red",
    "& .outline": { display: "none" },
    "& .filled": { display: "block" },
  },
};
export const okIcon = {
  ...banIcon,
  "&:hover": {
    cursor: "pointer",
    color: "green",
    "& .outline": { display: "none" },
    "& .filled": { display: "block" },
  },
};
export const adminOkGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "text.secondary",
  p: 0,
  "&:hover": {
    cursor: "pointer",
    color: "green",
  },
};
export const adminGrid = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  color: "text.secondary",
};

export const priceGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#52B69A",
};

export const icon = {
  paddingRight: "1%",
};
export const biggerIcon = {
  paddingRight: "1%",
  fontSize: "2rem",
};
