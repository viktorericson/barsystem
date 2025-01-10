import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface NavListProps {
  navLinks: { title: string; filter: string }[];
  applyFilter: (category: string) => void;
}

export const NavListDrawer: React.FC<NavListProps> = (props) => {
  const { navLinks, applyFilter } = props;

  const { t } = useTranslation("common");
  // State to track the selected filter
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const handleClick = (filter: string) => {
    setSelectedFilter(filter);
    applyFilter(filter);
  };

  return (
    <div>
      {navLinks.map((item) => (
        <Button
          key={item.title}
          onClick={() => handleClick(item.filter)}
          size="large"
          sx={{
            backgroundColor:
              selectedFilter === item.filter ? "primary.main" : "grey.300",
            color: selectedFilter === item.filter ? "white" : "black",
            "&:hover": {
              backgroundColor:
                selectedFilter === item.filter ? "primary.dark" : "grey.400",
            },
            marginRight: 1,
            fontWeight: "600",
          }}
        >
          <Typography
            component="p"
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: 16, margin: 0 }}
          >
            {t("filterbtn." + item.title.toLowerCase())}
          </Typography>
        </Button>
      ))}
    </div>
  );
};
