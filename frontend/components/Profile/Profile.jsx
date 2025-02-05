import "./Profile.css";
import GradeIcon from "@mui/icons-material/Grade";
import * as React from "react";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Profile({ initial }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {initial}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Name"
        subheader="Feb 8,2025"
      />
      <CardMedia
        component="img"
        height="194"
        image="/src/assets/roadsafety.jpeg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          In today's world road and transport has become an integral partof
          every human being. Every body is a road user in one shape or the
          other. The present transport system has minimized the distances but it
          has on the other hand increased the life risk. Every year road crashes
          result in loss of lakhs of lives and serious injuries to crores of
          people.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <GradeIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            In India itself about eighty thousand people are killed in road
            crashes every year which is thirteen percent of the total fatality
            all over the world. Man behind the wheel plays an important role in
            most of the crashes. In most of the cases crashes occurs either due
            to carelessness or due to lack of road safety awareness of the road
            user. Hence, road safety education is as essential as any other
            basic skills of survival.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Our aim is to provide road safety information for road users to
            encourage safer road user behaviour among current and prospective
            road users and reduce the number of people killed and injured on our
            roads every year.t
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Our aim is to provide road safety information for road users to
            encourage safer road user behaviour among current and prospective
            road users and reduce the number of people killed and injured on our
            roads every year.
          </Typography>
          <Typography>
            Our aim is to provide road safety information for road users to
            encourage safer road user behaviour among current and prospective
            road users and reduce the number of people killed and injured on our
            roads every year.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
