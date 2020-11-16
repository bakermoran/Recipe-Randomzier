import React from "react";
import Routes from "../../routes/Index";
import { Container } from 'react-bootstrap';
import Header from "./Header";

export default props => <>
<Header></Header>
<Container>
    {Routes}
</Container></>;
